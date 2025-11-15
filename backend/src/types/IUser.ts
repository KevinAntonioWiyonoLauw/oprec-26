import mongoose, {Document} from "mongoose"
import { IPenugasan } from "./IPenugasan"
export interface IUser extends Document{
    username: string,
    email: string,
    NIM: string,
    password: string,
    divisiPilihan?: DivisiPilihan[],
    divisiPilihanOti?: mongoose.Types.ObjectId[],
    divisiPilihanHima?: mongoose.Types.ObjectId[],
    resetToken?: string,
    resetTokenExpiration?: string,
    tanggalPilihanHima?: TanggalPilihan,
    tanggalPilihanOti?: TanggalPilihan,
    prioritasOti?: mongoose.Types.ObjectId,
    prioritasHima?: mongoose.Types.ObjectId,
    tugas?: IPenugasan[],
    diterimaDi?: mongoose.Types.ObjectId,
    isAdmin: boolean,
    accessToken?: string,
    refreshToken?: string,
    enrolledSlugHima?: string,
    enrolledSlugOti?: string,
    comparePassword(candidatePassword: string): Promise<boolean>
}

export interface DivisiPilihan {
    divisiId: mongoose.Types.ObjectId,
    urutanPrioritas: number
}

export interface TanggalPilihan{
    tanggalId: mongoose.Types.ObjectId,
    jam?: Date,
}