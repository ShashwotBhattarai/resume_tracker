import logger from "../configs/logger.config";
import { CandidateInfo } from "../models/candidateInfo.model";
import { findCurrentuserId } from "./findCurrentUserId.service";

export async function saveUserDetailsToDatabase(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any,
  acesstoken: string,
) {
  try {
    const current_user_id = await findCurrentuserId(acesstoken);
    await CandidateInfo.findOneAndUpdate(
      { user_id: current_user_id },
      {
        fullname: body.fullname,
        email: body.email,
        phone_number: body.phone_number,
      },
      { upsert: true, new: true },
    );
    logger.info("Candidate details saved to database successfully");
    return { status: 200 };
  } catch (error) {
    logger.error("Error in saveUserDetailsToDatabase", error);
    throw new Error("error in saveUserDetailsToDatabase");
  }
}
