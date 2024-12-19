jest.mock("mongoose", () => {
    const actualMongoose = jest.requireActual("mongoose");
    return {
        ...actualMongoose, // Retain the original implementation
        connect: jest.fn().mockResolvedValue(),
        connection: {
            close: jest.fn().mockResolvedValue(),
        },
    };
});

// Your existing test cases below
import request from "supertest";
import app from "../index";
import User from "../model/userModel";
import bcrypt from "bcryptjs";

jest.mock("../model/userModel");

describe("Login API Tests", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return 400 if email is not found", async () => {
        User.findOne.mockResolvedValue(null); // Mock User.findOne to return null

        const response = await request(app)
            .post("/sms/auth/login")
            .send({ email: "test@example.com", password: "password123" });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Email not found");
    });

    it("should return 400 if password does not match", async () => {
        const mockUser = { email: "test@example.com", password: "hashedPassword" };
        User.findOne.mockResolvedValue(mockUser); // Mock User.findOne

        bcrypt.compare = jest.fn().mockResolvedValue(false); // Mock bcrypt.compare to return false

        const response = await request(app)
            .post("/sms/auth/login")
            .send({ email: "test@example.com", password: "wrongPassword" });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid password");
    });

    it("should return 200 and token if login is successful", async () => {
        const mockUser = { email: "test@example.com", password: "hashedPassword" };
        User.findOne.mockResolvedValue(mockUser); // Mock User.findOne

        bcrypt.compare = jest.fn().mockResolvedValue(true); // Mock bcrypt.compare to return true

        const mockToken = "mock-jwt-token";
        jest.mock("../utils/generateToken", () => jest.fn(() => mockToken));

        const response = await request(app)
            .post("/sms/auth/login")
            .send({ email: "test@example.com", password: "password123" });

        expect(response.status).toBe(200);
        expect(response.body.token).toBe(mockToken);
    });

    it("should return 500 if an unexpected error occurs", async () => {
        User.findOne.mockRejectedValue(new Error("Database error")); // Mock User.findOne to throw an error

        const response = await request(app)
            .post("/sms/auth/login")
            .send({ email: "test@example.com", password: "password123" });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe("Something went wrong");
    });
});
