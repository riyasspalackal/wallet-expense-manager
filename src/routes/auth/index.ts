import { Router } from "express";

import { signUp, logIn } from "../../modules/user";
import { validateRequest } from "../../middleware/validate";
import { signupSchema, loginSchema } from "./authShema";

const authRouter = Router();

authRouter.post("/signup", validateRequest(signupSchema), signUp);

authRouter.post("/login", validateRequest(loginSchema), logIn);

export default authRouter;
