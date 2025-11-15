import mongoose, {Document, Schema} from "mongoose";

interface IMahasiswa extends Document{
    NIM: string;
}

const mahasiswaSchema = new Schema({
    NIM: {
        type: String,
        required: true,
        unique: true
    }
});

const Mahasiswa = mongoose.model<IMahasiswa>('Mahasiswa', mahasiswaSchema);
export default Mahasiswa;