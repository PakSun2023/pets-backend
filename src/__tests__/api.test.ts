import request from "supertest";
import jwt from "jsonwebtoken";
import { app } from "../index";
import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

let petId = "";
const user = {
    _id: "6469fd62da6c5c0086b521f1",
    email: "staff01@staff.com",
    password: "$2b$10$2AVra/En4rvKoYDXsADwBOoPv/X2ZOrlJ/Dcbqu.TtYY0Y52vSCom",
    role: "staff"
}
const jwtToken = jwt.sign(user, JWT_SECRET!, {
    expiresIn: "3days",
});

describe("GET /api/v1/pets", () => {
    it("should return all pets", async () => {
        const res = await request(app).get("/api/v1/pets");
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toEqual(true);
    });
});

describe("POST /api/v1/pet", () => {
    it("should create a pet", async () => {
        const res = await request(app).post("/api/v1/pet").send({
            name: "cat name",
            age: 5,
            color: "white",
            description: "testing add cat",
        }).set("Authorization", `Bearer ${jwtToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.pet.name).toBe("cat name");

        petId = res.body.pet._id;
    });
});

describe("POST /api/v1/pet", () => {
    it("should return unAuthentication", async () => {
        const res = await request(app).post("/api/v1/pet").send({
            name: "cat name",
            age: 5,
            color: "white",
            description: "testing add cat",
        });
        expect(res.statusCode).toBe(401);
    });
});

describe("PUT /api/v1/pet/:petId", () => {
    it("should create a pet", async () => {
        const res = await request(app).put(
            `/api/v1/pet/${petId}`
        ).send({
            name: "edited cat name",
        }).set("Authorization", `Bearer ${jwtToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.pet.name).toBe("edited cat name");
    });
});

describe("GET /api/v1/pet/:petId", () => {
    it("should return a pet", async () => {
        const res = await request(app).get(
            `/api/v1/pet/${petId}`
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.pet.name).toBe("edited cat name");
    });
});

describe("DELETE /api/v1/pet/:petId", () => {
    it("should delete a pet", async () => {
        const res = await request(app).delete(
            `/api/v1/pet/${petId}`
        ).set("Authorization", `Bearer ${jwtToken}`);
        expect(res.statusCode).toBe(200);
    });
});

const NewUser = {
    username: "user01",
    email: "user01@user.com",
    password: "12341234",
    role: "user"
}

describe("POST /api/v1/auth/register", () => {
    it("should register an user", async () => {
        const res = await request(app).post("/api/v1/auth/register").send(NewUser);
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toEqual(true);
    });
});

describe("POST /api/v1/auth/register", () => {
    it("should return error message: exist user", async () => {
        const res = await request(app).post("/api/v1/auth/register").send(NewUser);
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toEqual("User exist!");
    });
});

describe("POST /api/v1/auth/login", () => {
    it("should return user with jwt token", async () => {
        const res = await request(app).post("/api/v1/auth/login").send({
            email: NewUser.email,
            password: NewUser.password
        });
        expect(res.statusCode).toBe(200);
    });
});