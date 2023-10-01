import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";

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