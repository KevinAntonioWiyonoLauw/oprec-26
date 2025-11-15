import mongoose, {Document} from "mongoose"

export interface IPenugasan extends Document{
    link: string,
    comment: string,
    disubmitOleh: mongoose.Types.ObjectId,
    disubmitDi: mongoose.Types.ObjectId
}
