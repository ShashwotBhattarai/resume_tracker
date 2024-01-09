import { CandidateInfo } from "../database/models/cadidateInfo.models";
import { findCurrentuserId } from "../services/findCurrentUserId.service";
import { findSavedS3key } from "../services/findSavedS3key.service";
const mockingoose = require("mockingoose");
jest.mock("../services/findCurrentUserId.service");

describe("findSavedKey", () => {
	test("key is found", async () => {
		const findCurrentuserId = jest.fn().mockImplementation(() => "agvfe6");

		mockingoose(CandidateInfo).toReturn({ aws_file_key: "gf6487gf" }, "findOne");

		const finalResult = await findSavedS3key("7ggfjafhyjfsf");

		expect(finalResult.status).toBe(200);
		expect(finalResult.message).toBe("old file key found");
	});

	test("key is not found", async () => {
		const findCurrentuserId = jest.fn().mockImplementation(() => "agvfe6");

		mockingoose(CandidateInfo).toReturn({ aws_file_key: null }, "findOne");

		const finalResult = await findSavedS3key("7ggfjafhyjfsf");

		expect(finalResult.status).toBe(204);
		expect(finalResult.message).toBe("old file key not found");
	});

	test("user is not found", async () => {
		const findCurrentuserId = jest.fn().mockImplementation(() => "agvfe6");

		mockingoose(CandidateInfo).toReturn(null, "findOne");

		try {
			const finalResult = await findSavedS3key("7ggfjafhyjfsf");
		} catch (error) {
			expect(error).toEqual(new Error("error in findSavedS3key"));
		}
	});

	test("key is not found", async () => {
		const findCurrentuserId = jest.fn().mockImplementation(() => "agvfe6");

		mockingoose(CandidateInfo).toReturn(new Error("db error"), "findOne");

		try {
			const finalResult = await findSavedS3key("7ggfjafhyjfsf");
		} catch (error) {
			expect(error).toEqual(new Error("error in findSavedS3key"));
		}
	});
});
