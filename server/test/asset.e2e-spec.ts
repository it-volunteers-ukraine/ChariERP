import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { AppModule } from '@/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@/schemas/user.schema';
import { Roles, UserStatus } from '@/schemas/enums';
import { CreateAssetDto } from '@/fixed-asset/dto/create-asset.dto';
import { VALIDATION_MESSAGES } from '@/constants/validation-messages';
import { Asset } from '@/schemas/asset.schema';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/constants/pagination.constants';
import type { MulterFile } from '@/pipes/interfaces/file-validator.interface';
import { FileStorageService } from '@/file-storage/file-storage.service';
import { FILE_VALIDATION } from '@/constants/file-storage.constants';

const createTestUser = (role: Roles) => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phone: `+${faker.string.numeric(12)}`,
  email: faker.internet.email(),
  password: faker.internet.password({ length: 12 }),
  role,
  status: UserStatus.ACTIVE,
  organizationId: faker.database.mongodbObjectId(),
});

const createValidAssetPayload = (): CreateAssetDto => ({
  name: faker.commerce.product(),
  location: faker.location.buildingNumber(),
  storageFloor: faker.string.numeric(),
});

const createValidAsset = (organizationId: string, createdBy: string) => ({
  organizationId,
  name: `${faker.commerce.product()} ${faker.string.numeric(5)}`,
  location: faker.location.buildingNumber(),
  storageFloor: faker.string.numeric(),
  createdBy,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const imagesKeys = [faker.image.url()];

describe('AssetController (e2e)', () => {
  let app: INestApplication;
  let userModel: Model<User>;
  let assetModel: Model<Asset>;
  let managerToken: string;

  beforeAll(async () => {
    const mockFileStorageService = {
      uploadFiles: jest.fn().mockResolvedValue(imagesKeys),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(FileStorageService)
      .useValue(mockFileStorageService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    userModel = moduleFixture.get<Model<User>>(getModelToken(User.name));
    assetModel = moduleFixture.get<Model<Asset>>(getModelToken(Asset.name));

    const testUser = createTestUser(Roles.MANAGER);
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    await userModel.create({ ...testUser, password: hashedPassword });

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: testUser.email, password: testUser.password })
      .expect(HttpStatus.OK);

    managerToken = loginResponse.body.access_token;
  });

  afterEach(async () => {
    jest.clearAllMocks();

    await assetModel.deleteMany({});
    await userModel.deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/assets (POST)', () => {
    describe('201 CREATED', () => {
      it(`should create fixed asset successfully for user with role '${Roles.MANAGER}'`, async () => {
        const payload = createValidAssetPayload();

        const mockImage: MulterFile = {
          fieldname: 'images',
          originalname: faker.system.commonFileName('jpg'),
          encoding: '7bit',
          mimetype: 'image/jpeg',
          buffer: Buffer.from(faker.string.alphanumeric()),
          size: faker.number.int(),
        };

        const res = await request(app.getHttpServer())
          .post('/assets')
          .set('Authorization', `Bearer ${managerToken}`)
          .field('name', payload.name)
          .attach(mockImage.fieldname, mockImage.buffer, {
            filename: mockImage.originalname,
            contentType: mockImage.mimetype,
          })
          .expect(HttpStatus.CREATED);

        expect(res.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            name: payload.name,
            images: imagesKeys,
            organizationId: expect.any(String),
            createdBy: expect.any(String),
          }),
        );
      });
    });

    describe('400 BAD REQUEST', () => {
      it('should return 400 if name is missing', async () => {
        const payload = { location: faker.location.buildingNumber() };

        const res = await request(app.getHttpServer())
          .post('/assets')
          .set('Authorization', `Bearer ${managerToken}`)
          .type('form')
          .field('location', payload.location)
          .expect(HttpStatus.BAD_REQUEST);

        expect(res.body).toHaveProperty('statusCode', HttpStatus.BAD_REQUEST);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toContain(VALIDATION_MESSAGES.REQUIRED);
      });

      it(`should return 400 if image type is invalid.
        Allowed types: ${FILE_VALIDATION.ALLOWED_TYPES.join(', ')} (OptionalFileValidationPipe)`, async () => {
        const payload = createValidAssetPayload();

        const invalidImage: MulterFile = {
          fieldname: 'images',
          originalname: faker.system.commonFileName('jpg'),
          encoding: '7bit',
          mimetype: 'application/pdf',
          buffer: Buffer.from(faker.string.alphanumeric()),
          size: faker.number.int(),
        };

        const res = await request(app.getHttpServer())
          .post('/assets')
          .set('Authorization', `Bearer ${managerToken}`)
          .field('name', payload.name)
          .attach(invalidImage.fieldname, invalidImage.buffer, {
            filename: invalidImage.originalname,
            contentType: invalidImage.mimetype,
          })
          .expect(HttpStatus.BAD_REQUEST);

        expect(res.body).toHaveProperty('statusCode', HttpStatus.BAD_REQUEST);
        expect(res.body).toHaveProperty('message', 'Invalid file type');
      });
    });

    describe('401 UNAUTHORIZED', () => {
      it('should return 401 if no token provided', async () => {
        const payload = createValidAssetPayload();

        const res = await request(app.getHttpServer())
          .post('/assets')
          .type('form')
          .field('name', payload.name)
          .expect(HttpStatus.UNAUTHORIZED);

        expect(res.body).toHaveProperty('statusCode', HttpStatus.UNAUTHORIZED);
        expect(res.body).toHaveProperty('message', 'Unauthorized');
      });
    });

    describe('403 FORBIDDEN', () => {
      it(`should return 403 if user role is not '${Roles.MANAGER}'`, async () => {
        const payload = createValidAssetPayload();

        const testUser = createTestUser(Roles.USER);
        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        await userModel.create({ ...testUser, password: hashedPassword });

        const loginResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send({ email: testUser.email, password: testUser.password })
          .expect(HttpStatus.OK);

        const userToken = loginResponse.body.access_token;

        const res = await request(app.getHttpServer())
          .post('/assets')
          .set('Authorization', `Bearer ${userToken}`)
          .type('form')
          .field('name', payload.name)
          .expect(HttpStatus.FORBIDDEN);

        expect(res.body).toHaveProperty('statusCode', HttpStatus.FORBIDDEN);
        expect(res.body).toHaveProperty('message', 'User role does not have access to this resource');
      });
    });
  });

  describe('/assets (GET)', () => {
    describe('200 OK', () => {
      const roleTestCases = [
        {
          description: `should return paginated fixed assets for authorized user with role '${Roles.USER}'`,
          role: Roles.USER,
        },
        {
          description: `should return paginated fixed assets for authorized user with role '${Roles.MANAGER}'`,
          role: Roles.MANAGER,
        },
      ];

      test.each(roleTestCases)('$description', async ({ role }) => {
        const testUser = createTestUser(role);
        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        const dbUser = await userModel.create({ ...testUser, password: hashedPassword });

        const loginResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send({ email: testUser.email, password: testUser.password })
          .expect(HttpStatus.OK);

        const userToken = loginResponse.body.access_token;

        const assets = Array.from({ length: 3 }, () =>
          createValidAsset(dbUser.organizationId.toString(), dbUser._id.toString()),
        );

        await assetModel.insertMany(assets);

        const res = await request(app.getHttpServer())
          .get('/assets')
          .set('Authorization', `Bearer ${userToken}`)
          .query({ page: DEFAULT_PAGE, limit: DEFAULT_LIMIT })
          .expect(HttpStatus.OK);

        expect(res.body).toHaveProperty('assets');
        expect(res.body.assets).toBeInstanceOf(Array);
        expect(res.body.assets.length).toBeGreaterThan(0);
        expect(res.body).toEqual(
          expect.objectContaining({
            totalDocs: expect.any(Number),
            perPage: DEFAULT_LIMIT,
            currentPage: DEFAULT_PAGE,
            totalPages: expect.any(Number),
          }),
        );
      });

      it(`should return only fixed assets with images when optional filter 'hasImage=true'`, async () => {
        const testUser = createTestUser(Roles.USER);
        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        const dbUser = await userModel.create({ ...testUser, password: hashedPassword });

        const loginResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send({ email: testUser.email, password: testUser.password })
          .expect(HttpStatus.OK);

        const userToken = loginResponse.body.access_token;

        const assetWithImage = await assetModel.create({
          ...createValidAsset(dbUser.organizationId.toString(), dbUser._id.toString()),
          images: [faker.image.url()],
        });

        await assetModel.create({
          ...createValidAsset(dbUser.organizationId.toString(), dbUser._id.toString()),
        });

        const res = await request(app.getHttpServer())
          .get('/assets')
          .set('Authorization', `Bearer ${userToken}`)
          .query({ hasImage: 'true' })
          .expect(HttpStatus.OK);

        expect(res.body.assets.length).toBe(1);
        expect(res.body.assets[0]._id).toBe(assetWithImage._id.toString());
        expect(res.body.assets[0].images).toBeDefined();
        expect(res.body.assets[0].images.length).toBeGreaterThan(0);
      });
    });

    describe('401 UNAUTHORIZED', () => {
      it('should return 401 if no token provided', async () => {
        const res = await request(app.getHttpServer())
          .get('/assets')
          .query({ page: DEFAULT_PAGE, limit: DEFAULT_LIMIT })
          .expect(HttpStatus.UNAUTHORIZED);

        expect(res.body).toHaveProperty('statusCode', HttpStatus.UNAUTHORIZED);
        expect(res.body).toHaveProperty('message', 'Unauthorized');
      });
    });

    describe('404 NOT FOUND', () => {
      it('should return 404 if no fixed assets found in organization', async () => {
        const testUser = createTestUser(Roles.USER);
        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        await userModel.create({ ...testUser, password: hashedPassword });

        const loginResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send({ email: testUser.email, password: testUser.password })
          .expect(HttpStatus.OK);

        const userToken = loginResponse.body.access_token;

        const res = await request(app.getHttpServer())
          .get('/assets')
          .set('Authorization', `Bearer ${userToken}`)
          .query({ page: DEFAULT_PAGE, limit: DEFAULT_LIMIT })
          .expect(HttpStatus.NOT_FOUND);

        expect(res.body).toHaveProperty('statusCode', HttpStatus.NOT_FOUND);
        expect(res.body).toHaveProperty('message', 'No fixed assets found in organization');
      });
    });
  });

  describe('/assets/:id (PATCH)', () => {
    describe('200 OK', () => {
      it(`should update fixed asset successfully for user with role '${Roles.MANAGER}'`, async () => {
        const testUser = createTestUser(Roles.MANAGER);
        const dbUser = await userModel.create({
          ...testUser,
          password: await bcrypt.hash(testUser.password, 10),
        });

        const loginResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send({ email: testUser.email, password: testUser.password })
          .expect(HttpStatus.OK);

        const userToken = loginResponse.body.access_token;

        const createdAsset = await assetModel.create(
          createValidAsset(dbUser.organizationId.toString(), dbUser._id.toString()),
        );

        const updateAssetDto = { name: 'Updated asset name' };

        const mockImage: MulterFile = {
          fieldname: 'images',
          originalname: faker.system.commonFileName('jpg'),
          encoding: '7bit',
          mimetype: 'image/jpeg',
          buffer: Buffer.from(faker.string.alphanumeric()),
          size: faker.number.int(),
        };

        const res = await request(app.getHttpServer())
          .patch(`/assets/${createdAsset._id}`)
          .set('Authorization', `Bearer ${userToken}`)
          .field('name', updateAssetDto.name)
          .attach(mockImage.fieldname, mockImage.buffer, {
            filename: mockImage.originalname,
            contentType: mockImage.mimetype,
          })
          .expect(HttpStatus.OK);

        expect(res.body).toEqual(
          expect.objectContaining({
            _id: createdAsset._id.toString(),
            name: updateAssetDto.name,
            images: imagesKeys,
            organizationId: dbUser.organizationId.toString(),
            createdBy: dbUser._id.toString(),
          }),
        );
      });
    });

    describe('400 BAD REQUEST', () => {
      it('should return 400 if id is invalid (ObjectIdValidationPipe)', async () => {
        const invalidId = 'Invalid id';
        const updateAssetDto = { name: faker.commerce.product() };

        const res = await request(app.getHttpServer())
          .patch(`/assets/${invalidId}`)
          .set('Authorization', `Bearer ${managerToken}`)
          .type('form')
          .field('name', updateAssetDto.name)
          .expect(HttpStatus.BAD_REQUEST);

        expect(res.body).toHaveProperty('statusCode', HttpStatus.BAD_REQUEST);
        expect(res.body.message).toBe('Invalid ID format');
      });

      const maxSizeMB = Math.round(FILE_VALIDATION.MAX_SIZE / 1024 / 1024);

      it(`should return 400 if uploaded image exceeds ${maxSizeMB} MB limit (OptionalFileValidationPipe)`, async () => {
        const testUser = createTestUser(Roles.MANAGER);
        const dbUser = await userModel.create({
          ...testUser,
          password: await bcrypt.hash(testUser.password, 10),
        });

        const loginResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send({ email: testUser.email, password: testUser.password })
          .expect(HttpStatus.OK);

        const userToken = loginResponse.body.access_token;

        const createdAsset = await assetModel.create(
          createValidAsset(dbUser.organizationId.toString(), dbUser._id.toString()),
        );

        const updateAssetDto = { name: faker.commerce.product() };

        const invalidImage: MulterFile = {
          fieldname: 'images',
          originalname: faker.system.commonFileName('jpg'),
          encoding: '7bit',
          mimetype: 'image/jpeg',
          buffer: Buffer.alloc(FILE_VALIDATION.MAX_SIZE + 1),
          size: FILE_VALIDATION.MAX_SIZE + 1,
        };

        const res = await request(app.getHttpServer())
          .patch(`/assets/${createdAsset._id}`)
          .set('Authorization', `Bearer ${userToken}`)
          .field('name', updateAssetDto.name)
          .attach(invalidImage.fieldname, invalidImage.buffer, {
            filename: invalidImage.originalname,
            contentType: invalidImage.mimetype,
          })
          .expect(HttpStatus.BAD_REQUEST);

        expect(res.body).toHaveProperty('statusCode', HttpStatus.BAD_REQUEST);
        expect(res.body.message).toBe(
          `File '${invalidImage.originalname}' exceeds the maximum allowed size of ${maxSizeMB} MB`,
        );
      });
    });

    describe('401 UNAUTHORIZED', () => {
      it('should return 401 if no token provided', async () => {
        const assetId = faker.database.mongodbObjectId();
        const updateAssetDto = { name: faker.commerce.product() };

        const res = await request(app.getHttpServer())
          .patch(`/assets/${assetId}`)
          .type('form')
          .field('name', updateAssetDto.name)
          .expect(HttpStatus.UNAUTHORIZED);

        expect(res.body).toHaveProperty('statusCode', HttpStatus.UNAUTHORIZED);
        expect(res.body).toHaveProperty('message', 'Unauthorized');
      });
    });

    describe('403 FORBIDDEN', () => {
      it(`should return 403 if user role is not '${Roles.MANAGER}'`, async () => {
        const testUser = createTestUser(Roles.USER);
        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        await userModel.create({ ...testUser, password: hashedPassword });

        const loginResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send({ email: testUser.email, password: testUser.password })
          .expect(HttpStatus.OK);

        const userToken = loginResponse.body.access_token;

        const assetId = faker.database.mongodbObjectId();
        const updateAssetDto = { name: faker.commerce.product() };

        const res = await request(app.getHttpServer())
          .patch(`/assets/${assetId}`)
          .set('Authorization', `Bearer ${userToken}`)
          .type('form')
          .field('name', updateAssetDto.name)
          .expect(HttpStatus.FORBIDDEN);

        expect(res.body).toHaveProperty('statusCode', HttpStatus.FORBIDDEN);
        expect(res.body).toHaveProperty('message', 'User role does not have access to this resource');
      });
    });

    describe('404 NOT FOUND', () => {
      it('should return 404 if fixed asset not found', async () => {
        const assetId = faker.database.mongodbObjectId();
        const updateAssetDto = { name: faker.commerce.product() };

        const res = await request(app.getHttpServer())
          .patch(`/assets/${assetId}`)
          .set('Authorization', `Bearer ${managerToken}`)
          .type('form')
          .field('name', updateAssetDto.name)
          .expect(HttpStatus.NOT_FOUND);

        expect(res.body).toHaveProperty('statusCode', HttpStatus.NOT_FOUND);
        expect(res.body).toHaveProperty('message', 'Fixed asset not found');
      });
    });
  });

  describe('/assets/:id (DELETE)', () => {
    describe('204 NO CONTENT', () => {
      it(`should delete fixed asset successfully for user with role '${Roles.MANAGER}'`, async () => {
        const organizationId = faker.database.mongodbObjectId();
        const createdBy = faker.database.mongodbObjectId();

        const createdAsset = await assetModel.create(createValidAsset(organizationId, createdBy));

        await request(app.getHttpServer())
          .delete(`/assets/${createdAsset._id}`)
          .set('Authorization', `Bearer ${managerToken}`)
          .expect(HttpStatus.NO_CONTENT);

        const check = await assetModel.findById(createdAsset._id);
        expect(check).toBeNull();
      });
    });

    describe('400 BAD REQUEST', () => {
      it('should return 400 if id is invalid (ObjectIdValidationPipe)', async () => {
        const invalidId = 'Invalid id';

        const res = await request(app.getHttpServer())
          .delete(`/assets/${invalidId}`)
          .set('Authorization', `Bearer ${managerToken}`)
          .expect(HttpStatus.BAD_REQUEST);

        expect(res.body).toHaveProperty('statusCode', HttpStatus.BAD_REQUEST);
        expect(res.body.message).toBe('Invalid ID format');
      });
    });

    describe('401 UNAUTHORIZED', () => {
      it('should return 401 if no token provided', async () => {
        const assetId = faker.database.mongodbObjectId();

        const res = await request(app.getHttpServer()).delete(`/assets/${assetId}`).expect(HttpStatus.UNAUTHORIZED);

        expect(res.body).toHaveProperty('statusCode', HttpStatus.UNAUTHORIZED);
        expect(res.body).toHaveProperty('message', 'Unauthorized');
      });
    });

    describe('403 FORBIDDEN', () => {
      it(`should return 403 if user role is not '${Roles.MANAGER}'`, async () => {
        const testUser = createTestUser(Roles.USER);
        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        await userModel.create({ ...testUser, password: hashedPassword });

        const loginResponse = await request(app.getHttpServer())
          .post('/auth/login')
          .send({ email: testUser.email, password: testUser.password })
          .expect(HttpStatus.OK);

        const userToken = loginResponse.body.access_token;

        const assetId = faker.database.mongodbObjectId();

        const res = await request(app.getHttpServer())
          .delete(`/assets/${assetId}`)
          .set('Authorization', `Bearer ${userToken}`)
          .expect(HttpStatus.FORBIDDEN);

        expect(res.body).toHaveProperty('statusCode', HttpStatus.FORBIDDEN);
        expect(res.body).toHaveProperty('message', 'User role does not have access to this resource');
      });
    });

    describe('404 NOT FOUND', () => {
      it('should return 404 if fixed asset not found', async () => {
        const assetId = faker.database.mongodbObjectId();

        const res = await request(app.getHttpServer())
          .delete(`/assets/${assetId}`)
          .set('Authorization', `Bearer ${managerToken}`)
          .expect(HttpStatus.NOT_FOUND);

        expect(res.body).toHaveProperty('statusCode', HttpStatus.NOT_FOUND);
        expect(res.body).toHaveProperty('message', 'Fixed asset not found');
      });
    });
  });
});
