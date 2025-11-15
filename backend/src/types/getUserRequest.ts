import { TokenPayload } from "./tokens";
import { Request } from "express";

export interface IGetRequestWithUser extends Request{
    user?: TokenPayload
}