// mongo-init/01-seed.js

const dbName = process.env.MONGO_INITDB_DATABASE || "mydatabase";
const appDb = db.getSiblingDB(dbName);

// Get user credentials from environment variables with fallbacks
const appUser = process.env.MONGO_APP_USER || "chaierp_user";
const appPassword = process.env.MONGO_APP_PASSWORD || "A123456!y";

print(`Creating user '${appUser}' for database '${dbName}'`);

appDb.createUser({
    user: appUser,
    pwd: appPassword,
    roles: [{ role: "readWrite", db: dbName }],
});

print("Creating collections...");
appDb.createCollection("organizations");
appDb.createCollection("users");
appDb.createCollection("assets");
appDb.createCollection("tasks");
appDb.createCollection("boards");
appDb.createCollection("boardColumns");
appDb.createCollection("usersboards");

appDb.users.createIndex({ email: 1 }, { unique: true });
appDb.assets.createIndex({ name: 1 }, { unique: true });

print("Seeding demo data...");

// === Organization ===
const organizationId = new ObjectId();
appDb.organizations.insertOne({
    _id: organizationId,
    name: "Demo Organization",
    request: "approved",
    organizationData: {
        edrpou: "12345678",
        certificate: "AB123456",
        organizationName: "Demo Organization LLC",
        dateOfRegistration: new Date("2020-01-01"),
    },
    contactData: {
        phone: "+380501234567",
        email: "info@demo.org",
        position: "Manager",
        lastName: "Demo",
        firstName: "Organization",
        middleName: "",
    },
    mediaData: {
        site: "https://demo.org",
        social: ["https://facebook.com/demoorg"],
    },
    created_at: new Date(),
    updated_at: new Date(),
});

// === Demo User ===
const bcryptHash =
    "$2a$12$MxFJ0uB1ogv4fWOJHVFlH.uK0ncppmPQ0jfXr7Y/YpdUx5CwiVaAy"; // "Passw0rd!"
const userId = new ObjectId();

appDb.users.insertOne({
    _id: userId,
    firstName: "Alice",
    lastName: "User",
    phone: "+10000000000",
    email: "alice.user@example.com",
    password: bcryptHash,
    role: "user",
    status: "active",
    organizationId: organizationId,
    dateOfBirth: new Date("1990-01-01"),
    address: "123 Main St",
    position: "Manager",
    dateOfEntry: new Date(),
    lastLogin: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
});

// === Board, BoardColumn, Task ===
const boardId = new ObjectId();
const boardColumnId = new ObjectId();
const taskId = new ObjectId();

appDb.boards.insertOne({
    _id: boardId,
    title: "Test Board",
    order: 1,
    organizationId: organizationId,
    boardColumns: [boardColumnId],
    created_at: new Date(),
    updated_at: new Date(),
});

appDb.boardColumns.insertOne({
    _id: boardColumnId,
    title: "To Do",
    order: 1,
    board_id: boardId,
    task_ids: [taskId],
    created_at: new Date(),
    updated_at: new Date(),
});

appDb.tasks.insertOne({
    _id: taskId,
    title: "Перша задача",
    description: "Тестова задача для перевірки seed",
    priority: "medium",
    startDate: new Date(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    attachments: [],
    comments: [],
    assignees: [userId],
    activeColumn: boardColumnId,
    created_at: new Date(),
    updated_at: new Date(),
});

// === UsersBoards (зв'язка користувача з дошкою) ===
const usersBoardsId = new ObjectId();
appDb.usersboards.insertOne({
    _id: usersBoardsId,
    user_id: userId,
    board_id: boardId,
    organization_id: organizationId,
});

// === Demo Asset ===
const assetId = new ObjectId();
appDb.assets.insertOne({
    _id: assetId,
    name: "Label Printer LP-500",
    location: "Warehouse A",
    category: "Equipment",
    value: 450.0,
    currency: "USD",
    createdBy: userId,
    organizationId: organizationId,
    createdAt: new Date(),
    updatedAt: new Date(),
});

// === Collection validation ===
print("Setting up collection validation...");

appDb.runCommand({
    collMod: "users",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "firstName",
                "lastName",
                "phone",
                "email",
                "password",
                "role",
                "status",
                "organizationId",
            ],
            properties: {
                email: { bsonType: "string" },
                phone: { bsonType: "string" },
                role: { enum: ["admin", "manager", "user"] },
                status: { enum: ["active", "blocked"] },
                organizationId: { bsonType: "objectId" },
            },
        },
    },
});

print("✅ Database initialization completed successfully!");
print("Demo user credentials:");
print("  Email: alice.user@example.com");
print("  Password: Passw0rd!");
