/** @jest-environment node */
import { Admin, Organizations, Users, userService } from '@/lib';
import { testMongoConfig } from '@/lib/in-memory.mongo.config';
import { IAdmin, IOrganizations, IUsers, RequestOrganizationStatus, Roles, UserStatus } from '@/types';
import * as s3BucketClient from '@/services/s3-bucket/index';
import mongoose, { ObjectId } from 'mongoose';
import { faker } from '@faker-js/faker';

jest.mock('../../services/s3-bucket/index');
jest.mock('../image/image.service', () => {
  // Mocked class
  return {
    ImageService: jest.fn().mockImplementation(() => {
      return {
        getImage: jest.fn().mockResolvedValue({
          success: true,
          image: 'data:jpeg;base64,encoded-image-content',
          imageName: 'some-image-file.jpeg',
        }),
        uploadAvatar: jest.fn().mockResolvedValue('some-avatar-file-url.jpeg'),
      };
    }),
  };
});

beforeAll(async () => {
  await testMongoConfig.setUp();
});

afterEach(async () => {
  await testMongoConfig.dropCollections();
  jest.clearAllMocks();
});

afterAll(async () => {
  await testMongoConfig.dropDatabase();
});

const email = faker.internet.email();
const phone = faker.phone.number();
const password = 'ptn-pnh!';
const hashedPwd = '$2b$10$LXF5xFkQCR43B1Yz.Z5QXuYL/mT/EFaKqoFH0ci/NkjIDkOtYmwJa';

async function createOrganization(): Promise<IOrganizations> {
  const organization = await new Organizations({
    request: RequestOrganizationStatus.PENDING,
    organizationData: { organizationName: faker.company.name(), edrpou: '12345678', dateOfRegistration: new Date() },
    contactData: {
      position: faker.person.jobTitle(),
      lastName: faker.person.lastName(),
      firstName: faker.person.firstName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
    },
  }).save();

  expect(await Organizations.countDocuments()).toEqual(1);

  return organization;
}

async function createUser(organizationId: ObjectId, status: UserStatus = UserStatus.ACTIVE): Promise<IUsers> {
  const user = await new Users({
    avatarUrl: faker.image.avatar(),
    lastName: faker.person.lastName(),
    firstName: faker.person.firstName(),
    phone: faker.phone.number(),
    email,
    password: hashedPwd,
    status,
    organizationId: organizationId,
  }).save();

  expect(await Users.countDocuments()).toEqual(1);

  return user;
}

async function createAdmin(): Promise<IAdmin> {
  const admin = await new Admin({ email: email, password: hashedPwd, role: Roles.ADMIN }).save();

  expect(await Admin.countDocuments()).toEqual(1);

  return admin;
}

function populateFormWithUserData() {
  const formData = new FormData();
  const data = {
    phone,
    password,
    email: email,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };

  return { formData, data };
}

async function createValidUserDataForUpdate() {
  const { formData, data } = populateFormWithUserData();

  formData.append('avatarUrl', new File([faker.image.avatar()], 'avatar.jpeg'));
  formData.append('data', JSON.stringify(data));

  return formData;
}

describe('User Service:', () => {
  describe('Create Admin operation', () => {
    it('should NOT create admin when exist', async () => {
      // given
      await createAdmin();

      // when
      const createAdminResult = await userService.createAdmin(email, password);

      // then
      expect(createAdminResult.success).toBeFalsy();
      expect(createAdminResult.message).toEqual('Admin already exists');
    });

    it('should create admin user when non-exist and to hash the password ', async () => {
      // given
      expect(await Admin.countDocuments()).toEqual(0);

      // when
      const createAdminResult = await userService.createAdmin(email, password);

      // then
      expect(createAdminResult.success).toBeTruthy();
      const actual = await Admin.findOne();

      expect(actual).toBeDefined();

      const actualPwd = actual.password;

      expect(actualPwd).toContain('$');
      expect(actualPwd).toHaveLength(60);
    });
  });

  describe('Login users operation', () => {
    it('should login admin when email and password valid', async () => {
      // given
      const admin = await createAdmin();

      // when
      const loginResult = await userService.login(email, password);

      // then
      expect(loginResult.success).toBeTruthy();
      expect(loginResult.user).toContain(admin.id);
    });

    it('should login user when credentials valid and update last login time', async () => {
      // given
      const organization = await createOrganization();
      const user = await createUser(organization.id);

      expect(user.lastLogin).toBeUndefined();

      // when
      const loginResult = await userService.login(email, password);

      // then
      expect(loginResult.success).toBeTruthy();
      expect(loginResult.user).toContain(user.id);
      expect(loginResult.user).toContain(organization.id);
      expect(loginResult.user).toContain('lastLogin');
    });

    it('should NOT login user when it has BLOCKED status', async () => {
      // given
      const organization = await createOrganization();

      await createUser(organization.id, UserStatus.BLOCKED);

      // when
      const loginUserResult = await userService.login(email, hashedPwd);

      // then
      expect(loginUserResult.success).toBeFalsy();
      expect(loginUserResult.message).toEqual('blockedAccount');
    });

    it('should NOT login user with incorrect password', async () => {
      // given
      const organization = await createOrganization();

      await createUser(organization.id);

      // when
      const loginUserResult = await userService.login(email, 'incorrect-pswd');

      // then
      expect(loginUserResult.success).toBeFalsy();
      expect(loginUserResult.message).toEqual('userIncorrect');
    });

    it('should NOT login user when it is not exist', async () => {
      // given-when
      const loginUserResult = await userService.login(email, hashedPwd);

      // then
      expect(loginUserResult.success).toBeFalsy();
      expect(loginUserResult.message).toEqual('userNotFound');
    });
  });

  describe('Get all users by organization ID', () => {
    it('should return paged users when organization exists', async () => {
      // given
      const organization = await createOrganization();
      const user = await createUser(organization.id);

      // when
      const allOrgUsers = await userService.getAllByOrganizationId({ id: organization.id, page: 1 });

      // then
      expect(allOrgUsers.success).toBeTruthy();
      expect(allOrgUsers.users).toContain(user.id);
    });
  });

  describe('Get user by ID operation', () => {
    it(`should get user when exists`, async () => {
      // given
      const organization = await createOrganization();
      const existingUser = await createUser(organization.id);

      // when
      const getUserResult = await userService.getUserById(existingUser.id);

      // then
      expect(getUserResult.success).toBeTruthy();
      expect(getUserResult.user).toContain(existingUser.id);
    });

    it(`should get admin when exists`, async () => {
      // given
      const existingAdmin = await createAdmin();

      // when
      const getUserResult = await userService.getUserById(existingAdmin.id);

      // then
      expect(getUserResult.success).toBeTruthy();
      expect(getUserResult.user).toContain(existingAdmin.id);
    });

    it(`should NOT get any user when NOT exist`, async () => {
      // given
      const randomUserId = new mongoose.Types.ObjectId().toHexString();

      // when
      const getUserResult = await userService.getUserById(randomUserId);

      // then
      expect(getUserResult.success).toBeFalsy();
      expect(getUserResult.message).toEqual('User not found');
    });
  });

  describe('Get Organization Member by ID operation', () => {
    it('should return user when both organization and user exist', async () => {
      // given
      const organization = await createOrganization();
      const existingUser = await createUser(organization.id);

      // when
      const getByOrgAndUserIdResult = await userService.getOrganizationMemberById(existingUser.id, organization.id);

      // then
      expect(getByOrgAndUserIdResult.success).toBeTruthy();
      expect(getByOrgAndUserIdResult.user).toContain(existingUser.id);
      expect(getByOrgAndUserIdResult.user).toContain(organization.id);
      expect(getByOrgAndUserIdResult.imageName).toEqual('some-image-file.jpeg');
    });

    it('should NOT return user when Organization NOT exist', async () => {
      // given
      const randomOrgId = new mongoose.Types.ObjectId();
      const existingUser = await createUser(randomOrgId as never);

      // when
      const getByOrgAndUserIdResult = await userService.getOrganizationMemberById(
        existingUser.id,
        randomOrgId.toHexString(),
      );

      // then
      expect(getByOrgAndUserIdResult.success).toBeFalsy();
      expect(getByOrgAndUserIdResult.message).toEqual('Organization was not found');
    });

    it('should NOT return user when NOT exist', async () => {
      // given
      const organization = await createOrganization();
      const randomUserId = new mongoose.Types.ObjectId();

      // when
      const getByOrgAndUserIdResult = await userService.getOrganizationMemberById(
        randomUserId.toHexString(),
        organization.id,
      );

      // then
      expect(getByOrgAndUserIdResult.success).toBeFalsy();
      expect(getByOrgAndUserIdResult.message).toEqual('User not found');
    });
  });

  describe('Create user by organisation ID', () => {
    it('should create a user if the organisation exist', async () => {
      // given
      const s3BucketMock = jest.spyOn(s3BucketClient, 'uploadFileToBucket').mockResolvedValue('some-response-url');

      const organization = await createOrganization();

      const { formData, data } = populateFormWithUserData();

      formData.append('avatarUrl', faker.image.avatar());
      formData.append('organizationId', `${organization.id}`);
      formData.append('data', JSON.stringify(data));

      // when
      const createUserResult = await userService.createUserByCompanyId(formData);

      // then
      expect(createUserResult.success).toBeTruthy();
      expect(createUserResult.message).toEqual('User created');
      expect(s3BucketMock).toHaveBeenCalled();
    });

    it('should NOT create a user if formData contains validation errors', async () => {
      // given
      const formData = new FormData();

      formData.append('data', JSON.stringify({}));
      const expectedErrorMessage = 'Email %s,Password %s,Name %s,Last name %s,Phone %s'.replaceAll('%s', 'is required');

      // when
      const createUserResult = await userService.createUserByCompanyId(formData);

      // then
      expect(createUserResult.success).toBeFalsy();
      expect(createUserResult.message).toMatch(expectedErrorMessage);
    });

    it('should NOT create a user when already exists', async () => {
      // given
      const organization = await createOrganization();
      const existingUser = await createUser(organization.id);

      const { formData, data } = populateFormWithUserData();

      data.email = existingUser.email;
      formData.append('data', JSON.stringify(data));

      // when
      const createUserResult = await userService.createUserByCompanyId(formData);

      // then
      expect(createUserResult.success).toBeFalsy();
      expect(createUserResult.message).toEqual('Email already exists');
    });

    it('should NOT create a user when the organization NOT exist', async () => {
      // given
      const { formData, data } = populateFormWithUserData();

      formData.append('organizationId', new mongoose.Types.ObjectId().toHexString());
      formData.append('data', JSON.stringify(data));

      // when
      const createUserResult = await userService.createUserByCompanyId(formData);

      // then
      expect(createUserResult.success).toBeFalsy();
      expect(createUserResult.message).toEqual("Organization doesn't exist");
    });

    it('should NOT create a user when an avatar image upload FALSE response received', async () => {
      // given
      const s3BucketMock = jest.spyOn(s3BucketClient, 'uploadFileToBucket').mockResolvedValue(false);

      const organization = await createOrganization();
      const { formData, data } = populateFormWithUserData();

      formData.append('avatarUrl', faker.image.avatar());
      formData.append('organizationId', organization.id);
      formData.append('data', JSON.stringify(data));

      // when
      const createUserResult = await userService.createUserByCompanyId(formData);

      // then
      expect(createUserResult.success).toBeFalsy();
      expect(createUserResult.message).toEqual('Image error update');
      expect(s3BucketMock).toHaveBeenCalled();
    });
  });

  describe('Update member by ID', () => {
    it('should update user and avatar when exists', async () => {
      // given
      const s3BucketMock = jest.spyOn(s3BucketClient, 'deleteFileFromBucket').mockResolvedValue(true);

      const organization = await createOrganization();
      const user = await createUser(organization.id);
      const formData = await createValidUserDataForUpdate();

      formData.append('id', user.id);

      // when
      const updateMemberResult = await userService.updateMemberById(formData);

      // then
      expect(updateMemberResult.success).toBeTruthy();
      expect(updateMemberResult.message).toEqual('User updated');
      expect(updateMemberResult.user).toBeDefined();
      expect(updateMemberResult.user).toContain('some-avatar-file-url.jpeg');
      expect(s3BucketMock).toHaveBeenCalled();
    });

    it('should NOT update user when NOT exist', async () => {
      // given
      const { formData, data } = populateFormWithUserData();

      formData.append('id', new mongoose.Types.ObjectId().toHexString());
      formData.append('data', JSON.stringify(data));

      // when
      const updateMemberResult = await userService.updateMemberById(formData);

      // then
      expect(updateMemberResult.success).toBeFalsy();
      expect(updateMemberResult.message).toEqual('User not found');
    });

    it('should NOT update user when formData contains validation errors', async () => {
      // given
      const organization = await createOrganization();
      const user = await createUser(organization.id);
      const formData = new FormData();

      formData.append('id', user.id);
      formData.append('data', JSON.stringify({}));
      const expectedErrorMessage = 'Email %s,Name %s,Last name %s,Phone %s'.replaceAll('%s', 'is required');

      // when
      const updateMemberResult = await userService.updateMemberById(formData);

      // then
      expect(updateMemberResult.success).toBeFalsy();
      expect(updateMemberResult.message).toMatch(expectedErrorMessage);
    });

    it('should NOT update existing user email when conflict', async () => {
      // given
      const organization = await createOrganization();
      const user = await createUser(organization.id);
      const clone = user.$clone();

      clone._id = new mongoose.Types.ObjectId() as never;
      clone.isNew = true;
      clone.email = faker.internet.email();
      const userForUpdate = await clone.save();
      const { formData, data } = populateFormWithUserData();

      data.email = email;
      formData.append('id', userForUpdate.id);
      formData.append('data', JSON.stringify(data));

      // when
      const updateMemberResult = await userService.updateMemberById(formData);

      // then
      expect(updateMemberResult.success).toBeFalsy();
      expect(updateMemberResult.message).toEqual('Email already exists');
    });

    it('should NOT update user when existing avatar update unsuccessful', async () => {
      // given
      const s3BucketMock = jest.spyOn(s3BucketClient, 'deleteFileFromBucket').mockResolvedValue(false);
      const organization = await createOrganization();
      const user = await createUser(organization.id);
      const formData = await createValidUserDataForUpdate();

      formData.append('id', user.id);

      // when
      const updateMemberResult = await userService.updateMemberById(formData);

      // then
      expect(updateMemberResult.success).toBeFalsy();
      expect(updateMemberResult.message).toEqual('Image error update');
      expect(s3BucketMock).toHaveBeenCalled();
    });
  });

  describe('Update user avatar operation test', () => {
    it('should remove previous avatar when existed and upload new one instead', async () => {
      // given
      const s3BucketMock = jest.spyOn(s3BucketClient, 'deleteFileFromBucket').mockResolvedValue(true);

      const existingAvatar = faker.image.avatar();
      const newAvatarToSet = faker.image.avatar() as unknown as File;
      const organizationId = new mongoose.Types.ObjectId() as unknown as ObjectId;

      // when
      const uploadAvatarResult = await userService.updateUserAvatar(existingAvatar, newAvatarToSet, organizationId);

      // then
      expect(uploadAvatarResult).toEqual('some-avatar-file-url.jpeg');
      expect(s3BucketMock).toHaveBeenCalled();
    });

    // TODO: uncomment after fixing the issue with the avatar upload
    it.skip('should just remove previous avatar when there is NO new one', async () => {
      // given
      const s3BucketMock = jest.spyOn(s3BucketClient, 'deleteFileFromBucket').mockResolvedValue(true);

      const existingAvatar = faker.image.avatar();
      const organizationId = new mongoose.Types.ObjectId() as unknown as ObjectId;

      // when
      const uploadAvatarResult = await userService.updateUserAvatar(existingAvatar, undefined, organizationId);

      // then
      expect(uploadAvatarResult).toBeFalsy();
      expect(s3BucketMock).toHaveBeenCalled();
    });

    it('should upload new avatar when the user previously did not have one', async () => {
      // given
      const s3BucketMock = jest.spyOn(s3BucketClient, 'deleteFileFromBucket');
      const newAvatarToSet = faker.image.avatar() as unknown as File;
      const organizationId = new mongoose.Types.ObjectId() as unknown as ObjectId;

      // when
      const uploadAvatarResult = await userService.updateUserAvatar(undefined, newAvatarToSet, organizationId);

      // then
      expect(uploadAvatarResult).toEqual('some-avatar-file-url.jpeg');
      expect(s3BucketMock).not.toHaveBeenCalled();
    });

    // TODO: uncomment after fixing the issue with the avatar upload
    it.skip('should NOT upload avatar when absent and NOT remove previous when did not have one', async () => {
      // given
      const s3BucketMock = jest.spyOn(s3BucketClient, 'deleteFileFromBucket');
      const organizationId = new mongoose.Types.ObjectId() as unknown as ObjectId;

      // when
      const uploadAvatarResult = await userService.updateUserAvatar(undefined, undefined, organizationId);

      // then
      expect(uploadAvatarResult).toBeFalsy();
      expect(s3BucketMock).not.toHaveBeenCalled();
    });
  });
});
