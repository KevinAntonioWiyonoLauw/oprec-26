import mongoose, { Schema } from "mongoose";
import { IWawancara } from "../types/IWawancara";

const divisiSlotSchema = new Schema(
  {
    sisaSlot: { type: Number, required: true },
    lokasi: { type: String, required: true },
  },
  { _id: false }
);

const slotDivisiPerSesiSchema = new Schema(
  {
    backend: divisiSlotSchema,
    frontend: divisiSlotSchema,
    uiux: divisiSlotSchema,
    dsai: divisiSlotSchema,
    cp: divisiSlotSchema,
    mobapps: divisiSlotSchema,
    gamedev: divisiSlotSchema,
    cysec: divisiSlotSchema,
    hr: divisiSlotSchema,
    treasurer: divisiSlotSchema,
    secretary: divisiSlotSchema,
    ipc: divisiSlotSchema,
    skilldev: divisiSlotSchema,
    snf: divisiSlotSchema,
    pr: divisiSlotSchema,
    media: divisiSlotSchema,
  },
  { _id: false }
);

const sesiSchema = new Schema(
  {
    jam: { type: Date, required: true },
    dipilihOleh: [{ type: Schema.Types.ObjectId, ref: "User" }],
    slotTotal: {
      current: { type: Number, required: true, default: 0 },
      max: { type: Number, required: true, default: 6 },
    },
    slotDivisi: {
      type: slotDivisiPerSesiSchema,
      required: true,
    },
  },
  { _id: false }
);

const wawancaraSchema = new Schema<IWawancara>(
  {
    tanggal: { type: Date, required: true },
    himakom: { type: Boolean, required: true },
    sesi: [sesiSchema],
  },
  { timestamps: true }
);

const Wawancara = mongoose.model<IWawancara>("Wawancara", wawancaraSchema);

export default Wawancara;