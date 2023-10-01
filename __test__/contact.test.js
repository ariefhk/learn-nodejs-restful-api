import { web } from "../src/application/web.js";
import supertest from "supertest";
import {
    createTestContact,
    createTestUser,
    getTestContact,
    removeAllTestContacts,
    removeTestUser,
} from "./test-util.js";

describe("POST /api/contacts", () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it("should can create new contact", async () => {
        const result = await supertest(web)
            .post("/api/contacts")
            .set("Authorization", "test")
            .send({
                first_name: "test",
                last_name: "test",
                email: "test@gmail.com",
                phone: "09887782121",
            });

        // console.log(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.first_name).toBe("test");
        expect(result.body.data.last_name).toBe("test");
        expect(result.body.data.email).toBe("test@gmail.com");
        expect(result.body.data.phone).toBe("09887782121");
    });

    it("should reject if request is not valid", async () => {
        const result = await supertest(web)
            .post("/api/contacts")
            .set("Authorization", "test")
            .send({
                first_name: "",
                last_name: "test",
                email: "test",
                phone: "0809000000043534534543534534543535345435435",
            });

        // console.log(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe("GET /api/contacts/:contactId", () => {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    });

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    });

    it("should can get contact", async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .get(`/api/contacts/${testContact.id}`)
            .set("Authorization", "test");

        console.log(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe(testContact.first_name);
        expect(result.body.data.last_name).toBe(testContact.last_name);
        expect(result.body.data.email).toBe(testContact.email);
        expect(result.body.data.phone).toBe(testContact.phone);
    });

    // it("should reject if request is not valid", async () => {
    //     const result = await supertest(web)
    //         .post("/api/contacts")
    //         .set("Authorization", "test")
    //         .send({
    //             first_name: "",
    //             last_name: "test",
    //             email: "test",
    //             phone: "0809000000043534534543534534543535345435435",
    //         });

    //     // console.log(result.body);

    //     expect(result.status).toBe(400);
    //     expect(result.body.errors).toBeDefined();
    // });
});
