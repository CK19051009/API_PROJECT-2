import { Request, Response } from "express";
export const index = (req: Request, res: Response): any => {
  return res.json({
    status: "success",
  });
};
