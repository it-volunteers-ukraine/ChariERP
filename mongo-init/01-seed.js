// mongo-init/01-seed.js

const dbName = process.env.MONGO_INITDB_DATABASE || "mydatabase";
const appDb = db.getSiblingDB(dbName);

// Get user credentials from environment variables with fallbacks
const appUser = process.env.MONGO_APP_USER || "chaierp_user";
const appPassword = process.env.MONGO_APP_PASSWORD || "A123456!y";

console.log(`Creating user '${appUser}' for database '${dbName}'`);

// Create a specific user for ChariERP database directly in ChariERP db
appDb.createUser({
    user: appUser,
    pwd: appPassword,
    roles: [
        {
            role: "readWrite",
            db: dbName,
        },
    ],
});

console.log("Creating collections...");

// Create collections explicitly (optional but clear)
appDb.createCollection("organizations");
appDb.createCollection("users");
appDb.createCollection("assets");
appDb.createCollection("tasks");

// Helpful indexes to mirror Mongoose constraints
appDb.users.createIndex({ email: 1 }, { unique: true });
appDb.assets.createIndex({ name: 1 }, { unique: true });

console.log("Seeding demo data...");

// Seed base Organization
const organizationId = new ObjectId();
appDb.organizations.insertOne({
    _id: organizationId,
    name: "Demo Organization",
    created_at: new Date(),
    updated_at: new Date(),
});

// Precomputed bcrypt hash for "Passw0rd!"
const bcryptHash =
    "$2a$12$MxFJ0uB1ogv4fWOJHVFlH.uK0ncppmPQ0jfXr7Y/YpdUx5CwiVaAy";

// Insert a demo user (hardcoded for consistency in demo environment)
const userId = new ObjectId();
appDb.users.insertOne({
    _id: userId,
    firstName: "Alice",
    lastName: "User",
    phone: "+10000000000",
    email: "alice.user@example.com",
    password: bcryptHash, // Password: "Passw0rd!"
    role: "user",
    status: "active",
    organizationId: organizationId,
    // optional fields
    dateOfBirth: new Date("1990-01-01"),
    address: "123 Main St",
    position: "Manager",
    dateOfEntry: new Date(),
    lastLogin: new Date(),
});

// Створимо board
const boardId = ObjectId("68efe9e9fcc25ddcc17ba30e");
appDb.boards.insertOne({
    _id: boardId,
    title: "test board2",
    order: 2,
    boardColumns: [boardColumnId],
    created_at: new Date("2025-10-15T18:37:29.269Z"),
    __v: 0,
});
// Створимо boardColumn
const boardColumnId = ObjectId("68efea06fcc25ddcc17ba32a");
appDb.boardColumns.insertOne({
    _id: boardColumnId,
    title: "test column2.0",
    board_id: ObjectId("68efe9e9fcc25ddcc17ba30e"), // тут треба існуючий board._id
    task_ids: [ObjectId("68efea08fcc25ddcc17ba331")],
    created_at: new Date("2025-10-15T18:37:58.554Z"),
    __v: 0,
});

// Створимо task
const taskId2 = ObjectId("68efea08fcc25ddcc17ba331");
appDb.tasks.insertOne({
    _id: taskId2,
    title: "Новая задача2\n",
    priority: "",
    attachment: [],
    comments: [],
    description: "",
    users: [ObjectId("68640b9b8f8f056e832b1dd4")], // підставити userId або інший існуючий user._id
    boardColumn_id: boardColumnId,
    created_at: new Date("2025-10-15T18:38:00.454Z"),
    updated_at: new Date("2025-10-15T18:38:19.155Z"),
    __v: 0,
});

// Insert a demo asset
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

// Insert a demo task
const taskId = new ObjectId();
appDb.tasks.insertOne({
    _id: taskId,
    title: "Prepare inventory report",
    description: "Generate and review monthly inventory KPIs.",
    priority: "high",
    startDate: new Date(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    attachments: [],
    comments: [],
    assignees: [userId],
});

console.log("Setting up collection validation...");

// Collection validation
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

console.log("Database initialization completed successfully!");
console.log("Demo user credentials:");
console.log("  Email: alice.user@example.com");
console.log("  Password: Passw0rd!");
