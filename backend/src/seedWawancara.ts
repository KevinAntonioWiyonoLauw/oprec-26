import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Wawancara from './models/wawancaraModels';

dotenv.config();

const seedWawancara = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`, {serverSelectionTimeoutMS: 20000});
    console.log("Connected to MongoDB");

    // Divisi slots structure with quota 2 per division
    const divisiSlotsOti = {
      'backend': { current: 0, max: 2 },
      'frontend': { current: 0, max: 2 },
      'uiux': { current: 0, max: 2 },
      'dsai': { current: 0, max: 2 },
      'mobapps': { current: 0, max: 2 },
      'gamedev': { current: 0, max: 2 },
      'compro': { current: 0, max: 2 },
      'cybersec': { current: 0, max: 2 },
    };

    const divisiSlotsHimakom = {
      'hr': { current: 0, max: 2 },
      'media': { current: 0, max: 2 },
      'pr': { current: 0, max: 2 },
      'sekbend': { current: 0, max: 2 },
      'skilldev': { current: 0, max: 2 },
      'snf': { current: 0, max: 2 },
      'ipc': { current: 0, max: 2 },
    };

    const wawancaraData = [];

    // HIMAKOM: Minggu 23 Nov + Senin 24 Nov (2 hari, 8 batch per hari)
    const siangTimes = [
      { h: 10, m: 15 },  // Batch 1
      { h: 10, m: 50 },  // Batch 2
      { h: 11, m: 25 },  // Batch 3
      { h: 13, m: 10 },  // Batch 4 (after istirahat)
      { h: 13, m: 45 },  // Batch 5
      { h: 14, m: 20 },  // Batch 6
      { h: 14, m: 55 },  // Batch 7
      { h: 15, m: 30 },  // Batch 8
    ];

    for (let day = 23; day <= 24; day++) {
      const sesiSiang = siangTimes.map(time => ({
        jam: new Date(2025, 10, day, time.h, time.m), // November = month 10 (0-indexed)
        dipilihOleh: [],
        slotTotal: { current: 0, max: 6 }, // Total 6 per batch
        slotDivisi: JSON.parse(JSON.stringify(divisiSlotsHimakom)),
      }));

      wawancaraData.push({
        tanggal: new Date(2025, 10, day),
        himakom: true,
        sesi: sesiSiang,
      });
    }

    // OMAHTI: Selasa 25 - Jumat 28 Nov (4 hari, 4 batch per malam)
    const malamTimes = [
      { h: 18, m: 20 },  // Batch 1
      { h: 18, m: 55 },  // Batch 2
      { h: 19, m: 25 },  // Batch 3
      { h: 20, m: 0 },   // Batch 4
    ];

    for (let day = 25; day <= 28; day++) {
      const sesiMalam = malamTimes.map(time => ({
        jam: new Date(2025, 10, day, time.h, time.m),
        dipilihOleh: [],
        slotTotal: { current: 0, max: 6 },
        slotDivisi: JSON.parse(JSON.stringify(divisiSlotsOti)),
      }));

      wawancaraData.push({
        tanggal: new Date(2025, 10, day),
        himakom: false,
        sesi: sesiMalam,
      });
    }

    // Insert wawancara data
    console.log('Inserting wawancara data...');
    console.log(`Total tanggal: ${wawancaraData.length}`);
    
    let totalSesi = 0;
    for (const wawancara of wawancaraData) {
      const wawancaraBaru = new Wawancara(wawancara);
      await wawancaraBaru.save();
      totalSesi += wawancara.sesi.length;
      console.log(`  ✓ ${wawancara.tanggal.toLocaleDateString('id-ID')} - ${wawancara.sesi.length} sesi (${wawancara.himakom ? 'HIMAKOM' : 'OmahTI'})`);
    }
    
    console.log(`\n✅ Wawancara data successfully seeded!`);
    console.log(`   Total: ${wawancaraData.length} hari, ${totalSesi} sesi`);

    await mongoose.disconnect();
    console.log('✅ Seeding completed successfully!');
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
};

seedWawancara();
