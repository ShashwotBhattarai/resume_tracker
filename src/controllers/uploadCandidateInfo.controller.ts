import { Request, Response } from "express";
import { uploadCandidateInfoService } from "../services/uploadCandidateInfo.service";
import logger from "../configs/logger.config";
export const uploadCandidateInfoController = (req: Request, res: Response) => {
  (async () => {
    try {
      console.log(req.headers.newkey);
      if (
        req.headers.authorization !== null &&
        req.headers.authorization !== undefined
      ) {
        const currentToken = req.headers.authorization;
        const newKey = req.headers.newkey
          ? (req.headers.newkey as string)
          : null;

        console.log(newKey);
        const { status, message } = await uploadCandidateInfoService(
          currentToken,
          req.body,
          newKey,
        );
        logger.info("Candidate info uploaded successfully");

        res.status(status).json({ message: message });
      } else {
        logger.error("Authorization header missing");
        res.status(400).json({ error: "Authorization header missing" });
      }
    } catch {
      logger.error("Unknown error in upload candidate info controller");
      res.status(500).json({ error: "Internal server error" });
    }
  })();
};
