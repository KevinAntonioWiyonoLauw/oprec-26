import mongoose from "mongoose";
export interface TokenPayload{
    userId: mongoose.Types.ObjectId,
    username: string,
    NIM: string,
    isAdmin: boolean,
    enrolledSlugHima?: string,
    enrolledSlugOti?: string
}

export interface AuthTokens {
    accessToken: string,
    refreshToken: string
}