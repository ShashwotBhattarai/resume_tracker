import { CandidateInfo } from "../database/models/cadidateInfo.models";
import { findCurrentuserId } from "../services/findCurrentUserId.service";
import { updateAwsKeyInDatabase } from "../services/updateAwsKeyInDatabase.service";

const mockingoose = require("mockingoose");
jest.mock("../services/findCurrentUserId.service");

describe("Update aws key in database", () => {
	test("updated", async () => {
		const findCurrentuserId = jest.fn().mockImplementation(() => "agvfe6");
		const newKeyMock = "fsfsfsf435";
		const accessTokenMock =
			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmZlNTRkMmMtMjFjNy00OWViLTk5MjQtZjE2NmM5ZWU3NWE0IiwidXNlcm5hbWUiOiJzdXJ5YSIsInJvbGUiOiJjYW5kaWRhdGUiLCJpYXQiOjE3MDMxNTIwNzYsImV4cCI6MTcwMzIzODQ3Nn0.wJRv5u4ILchkcc2Q8vM6l1bw58cj53c-jNane_JpzWI";
		mockingoose(CandidateInfo).toReturn(
			{
				user_id: "sfhb45",
				fullname: "fulname mock",
				email: "mai@email.com",
				phone_number: "846856544368",
				local_file_name: "filename",
				file_size_in_bytes: 625251,
				aws_file_key: "fashg366",
			},
			"findOneAndUpdate"
		);

		const finalResult = await updateAwsKeyInDatabase(accessTokenMock, newKeyMock);
		const response = {
			user_id: "sfhb45",
			fullname: "fulname mock",
			email: "mai@email.com",
			phone_number: "846856544368",
			local_file_name: "filename",
			file_size_in_bytes: 625251,
			aws_file_key: "fashg366",
		};
		expect(finalResult.status).toBe(200);
	});

	test("database error", async () => {
		const findCurrentuserId = jest.fn().mockImplementation(() => "agvfe6");
		const newKeyMock = "fsfsfsf435";
		const accessTokenMock =
			"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmZlNTRkMmMtMjFjNy00OWViLTk5MjQtZjE2NmM5ZWU3NWE0IiwidXNlcm5hbWUiOiJzdXJ5YSIsInJvbGUiOiJjYW5kaWRhdGUiLCJpYXQiOjE3MDMxNTIwNzYsImV4cCI6MTcwMzIzODQ3Nn0.wJRv5u4ILchkcc2Q8vM6l1bw58cj53c-jNane_JpzWI";
		mockingoose(CandidateInfo).toReturn(
			new Error("database error in updateAwsKeyInDatabase"),
			"findOneAndUpdate"
		);

		try {
			await updateAwsKeyInDatabase(accessTokenMock, newKeyMock);
		} catch (error) {
			expect(error).toEqual(new Error("error in updateAwsKeyInDatabase"));
		}
	});
});
