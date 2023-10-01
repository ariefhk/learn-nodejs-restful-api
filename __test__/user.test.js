import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import { createTestUser, removeTestUser } from "./test-util.js";

describe("POST /api/users", () => {
    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: "arief",
            },
        });
    });

    it("should can register  new user", async () => {
        const result = await supertest(web).post("/api/users").send({
            username: "arief",
            password: "rahasia",
            name: "Arief Rachman Hakim",
        });

        // console.log(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("arief");
        expect(result.body.data.name).toBe("Arief Rachman Hakim");
        expect(result.body.data.password).toBeUndefined();
    });

    it("should reject if request is invalid", async () => {
        const result = await supertest(web).post("/api/users").send({
            username: "",
            password: "",
            name: "",
        });

        // console.log(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if username already registered", async () => {
        let result = await supertest(web).post("/api/users").send({
            username: "arief",
            password: "rahasia",
            name: "Arief Rachman Hakim",
        });

        //second register
        result = await supertest(web).post("/api/users").send({
            username: "arief",
            password: "rahasia",
            name: "Arief Rachman Hakim",
        });

        // console.log(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe("POST /api/users/login", () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("should can login", async () => {
        const result = await supertest(web).post("/api/users/login").send({
            username: "test",
            password: "rahasia",
        });

        // console.log(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });

    it("should reject login if request is invalid", async () => {
        const result = await supertest(web).post("/api/users/login").send({
            username: "",
            password: "",
        });

        // console.log(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject login if password is wrong", async () => {
        const result = await supertest(web).post("/api/users/login").send({
            username: "test",
            password: "salah",
        });

        // console.log(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject login if username is wrong", async () => {
        const result = await supertest(web).post("/api/users/login").send({
            username: "salah",
            password: "salah",
        });

        // console.log(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe("GET /api/users/current", () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("should can get current user", async () => {
        const result = await supertest(web)
            .get("/api/users/current")
            .set("Authorization", "test");

        // console.log(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
    });

    it("should reject login if token is invalid", async () => {
        const result = await supertest(web)
            .get("/api/users/current")
            .set("Authorization", "salah");

        console.log(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});
