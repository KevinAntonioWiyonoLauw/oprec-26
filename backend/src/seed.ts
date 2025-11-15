import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Divisi from './models/divisiModels';
import Wawancara from './models/wawancaraModels';

dotenv.config();

// Helper: Convert WIB time to UTC Date
// dateStr: "2025-11-21", timeStr: "12:00"
function wibToUTC(dateStr: string, timeStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);
  
  // Buat Date UTC dengan mengurangi 7 jam dari waktu WIB
  const utcDate = new Date(Date.UTC(year, month - 1, day, hour - 7, minute, 0));
  
  return utcDate;
}

const seedDivisi = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`, { serverSelectionTimeoutMS: 20000 });
    console.log("Connected to MongoDB");

    // Clear existing data
    await Divisi.deleteMany({});
    await Wawancara.deleteMany({});
    console.log("Cleared existing data");

    // Deadline: 21 November 2025, 12:00 WIB
    const deadlineWIB = wibToUTC("2025-11-21", "12:00");

    const divisiData = [
      // OmahTI Divisions
      {
        judul: 'Backend',
        judulPanjang: 'Backend Development',
        logoDivisi: 'backend_logo.png',
        slot: 10,
        slug: 'backend',
        proker: [{
          url: 'https://example.com/backend_proker',
          filename: 'backend_proker.pdf',
          deskripsiProker: 'Backend division project description',
        }],
        deskripsi: 'Responsible for server-side logic and database management.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Complete a backend task.',
          toolsPenugasan: 'Node.js, Express',
          linkPenugasan: 'https://example.com/backend_task',
          deadline: deadlineWIB,
        },
      },
      {
        judul: 'Frontend',
        judulPanjang: 'Frontend Development',
        logoDivisi: 'frontend_logo.png',
        slot: 8,
        slug: 'frontend',
        proker: [{
          url: 'https://example.com/frontend_proker',
          filename: 'frontend_proker.pdf',
          deskripsiProker: 'Frontend division project description',
        }],
        deskripsi: 'Focuses on the visual elements and user experience.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Build a frontend interface.',
          toolsPenugasan: 'React, Vue.js',
          linkPenugasan: 'https://example.com/frontend_task',
          deadline: deadlineWIB,
        },
      },
      {
        judul: 'UI/UX',
        judulPanjang: 'UI/UX Design',
        logoDivisi: 'uiux_logo.png',
        slot: 5,
        slug: 'uiux',
        proker: [{
          url: 'https://example.com/uiux_proker',
          filename: 'uiux_proker.pdf',
          deskripsiProker: 'UI/UX division project description',
        }],
        deskripsi: 'Designs user interfaces and improves user experience.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Design a user-friendly interface.',
          toolsPenugasan: 'Figma, Adobe XD',
          linkPenugasan: 'https://example.com/uiux_task',
          deadline: deadlineWIB,
        },
      },
      {
        judul: 'Data Science & AI',
        judulPanjang: 'Data Science and Artificial Intelligence',
        logoDivisi: 'dsai_logo.png',
        slot: 6,
        slug: 'dsai',
        proker: [{
          url: 'https://example.com/dsai_proker',
          filename: 'dsai_proker.pdf',
          deskripsiProker: 'Data Science division project description',
        }],
        deskripsi: 'Analyzes data and builds AI models.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Create a data analysis project.',
          toolsPenugasan: 'Python, TensorFlow',
          linkPenugasan: 'https://example.com/dsai_task',
          deadline: deadlineWIB,
        },
      },
      {
        judul: 'Competitive Programming',
        judulPanjang: 'Competitive Programming',
        logoDivisi: 'cp_logo.png',
        slot: 7,
        slug: 'cp',
        proker: [{
          url: 'https://example.com/cp_proker',
          filename: 'cp_proker.pdf',
          deskripsiProker: 'Competitive Programming division project description',
        }],
        deskripsi: 'Solves algorithmic challenges and competes in programming competitions.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Solve a programming challenge.',
          toolsPenugasan: 'C++, Java',
          linkPenugasan: 'https://example.com/cp_task',
          deadline: deadlineWIB,
        },
      },
      {
        judul: 'Mobile Apps',
        judulPanjang: 'Mobile Application Development',
        logoDivisi: 'mobapps_logo.png',
        slot: 6,
        slug: 'mobapps',
        proker: [{
          url: 'https://example.com/mobapps_proker',
          filename: 'mobapps_proker.pdf',
          deskripsiProker: 'Mobile Apps division project description',
        }],
        deskripsi: 'Develops mobile applications for Android and iOS.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Create a mobile app.',
          toolsPenugasan: 'Flutter, React Native',
          linkPenugasan: 'https://example.com/mobapps_task',
          deadline: deadlineWIB,
        },
      },
      {
        judul: 'Game Development',
        judulPanjang: 'Game Development',
        logoDivisi: 'gamedev_logo.png',
        slot: 4,
        slug: 'gamedev',
        proker: [{
          url: 'https://example.com/gamedev_proker',
          filename: 'gamedev_proker.pdf',
          deskripsiProker: 'Game Development division project description',
        }],
        deskripsi: 'Develops games for multiple platforms.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Create a game prototype.',
          toolsPenugasan: 'Unity, Unreal Engine',
          linkPenugasan: 'https://example.com/gamedev_task',
          deadline: deadlineWIB,
        },
      },
      {
        judul: 'Cysec',
        judulPanjang: 'Cyber Security',
        logoDivisi: 'cysec_logo.png',
        slot: 4,
        slug: 'cysec',
        proker: [{
          url: 'https://example.com/cysec_proker',
          filename: 'cysec_proker.pdf',
          deskripsiProker: 'Cyber Security division project description',
        }],
        deskripsi: 'Secures systems and networks.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Complete a security task.',
          toolsPenugasan: 'Kali Linux, Wireshark',
          linkPenugasan: 'https://example.com/cysec_task',
          deadline: deadlineWIB,
        },
      },
      // HIMAKOM Divisions
      {
        judul: 'Treasurer',
        judulPanjang: 'Basically Bendahara',
        logoDivisi: 'treasurer_logo.png',
        slot: 10,
        slug: 'treasurer',
        proker: [{
          url: 'https://example.com/treasurer_proker',
          filename: 'treasurer_proker.pdf',
          deskripsiProker: 'Treasurer division project description',
        }],
        deskripsi: 'Manages finances.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Complete a treasurer task.',
          toolsPenugasan: 'Excel',
          linkPenugasan: 'https://example.com/treasurer_task',
          deadline: deadlineWIB,
        },
      },
      {
        judul: 'Secretary',
        judulPanjang: 'Penulis',
        logoDivisi: 'secretary_logo.png',
        slot: 8,
        slug: 'secretary',
        proker: [{
          url: 'https://example.com/secretary_proker',
          filename: 'secretary_proker.pdf',
          deskripsiProker: 'Secretary division project description',
        }],
        deskripsi: 'Handles documentation.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Complete a secretary task.',
          toolsPenugasan: 'Word, Notion',
          linkPenugasan: 'https://example.com/secretary_task',
          deadline: deadlineWIB,
        },
      },
      {
        judul: 'HR',
        judulPanjang: 'Human Resources PSDM',
        logoDivisi: 'hr_logo.png',
        slot: 5,
        slug: 'hr',
        proker: [{
          url: 'https://example.com/hr_proker',
          filename: 'hr_proker.pdf',
          deskripsiProker: 'HR division project description',
        }],
        deskripsi: 'Manages human resources.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Complete an HR task.',
          toolsPenugasan: 'Google Forms',
          linkPenugasan: 'https://example.com/hr_task',
          deadline: deadlineWIB,
        },
      },
      {
        judul: 'IPC',
        judulPanjang: 'Internal Control',
        logoDivisi: 'ipc_logo.png',
        slot: 6,
        slug: 'ipc',
        proker: [{
          url: 'https://example.com/ipc_proker',
          filename: 'ipc_proker.pdf',
          deskripsiProker: 'IPC division project description',
        }],
        deskripsi: 'Internal control and audit.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Complete an IPC task.',
          toolsPenugasan: 'Audit tools',
          linkPenugasan: 'https://example.com/ipc_task',
          deadline: deadlineWIB,
        },
      },
      {
        judul: 'S&F',
        judulPanjang: 'Sponsorship & Fundraising',
        logoDivisi: 'snf_logo.png',
        slot: 7,
        slug: 'snf',
        proker: [{
          url: 'https://example.com/snf_proker',
          filename: 'snf_proker.pdf',
          deskripsiProker: 'S&F division project description',
        }],
        deskripsi: 'Handles sponsorships.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Complete an S&F task.',
          toolsPenugasan: 'Proposal writing',
          linkPenugasan: 'https://example.com/snf_task',
          deadline: deadlineWIB,
        },
      },
      {
        judul: 'Skilldev',
        judulPanjang: 'Skill Development',
        logoDivisi: 'skilldev_logo.png',
        slot: 6,
        slug: 'skilldev',
        proker: [{
          url: 'https://example.com/skilldev_proker',
          filename: 'skilldev_proker.pdf',
          deskripsiProker: 'Skilldev division project description',
        }],
        deskripsi: 'Develops member skills.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Complete a skilldev task.',
          toolsPenugasan: 'Training materials',
          linkPenugasan: 'https://example.com/skilldev_task',
          deadline: deadlineWIB,
        },
      },
      {
        judul: 'Media',
        judulPanjang: 'Media & Publication',
        logoDivisi: 'media_logo.png',
        slot: 4,
        slug: 'media',
        proker: [{
          url: 'https://example.com/media_proker',
          filename: 'media_proker.pdf',
          deskripsiProker: 'Media division project description',
        }],
        deskripsi: 'Handles media and publications.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Complete a media task.',
          toolsPenugasan: 'Photoshop, Canva',
          linkPenugasan: 'https://example.com/media_task',
          deadline: deadlineWIB,
        },
      },
      {
        judul: 'PR',
        judulPanjang: 'Public Relations',
        logoDivisi: 'pr_logo.png',
        slot: 4,
        slug: 'pr',
        proker: [{
          url: 'https://example.com/pr_proker',
          filename: 'pr_proker.pdf',
          deskripsiProker: 'PR division project description',
        }],
        deskripsi: 'Public relations.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Complete a PR task.',
          toolsPenugasan: 'Social media',
          linkPenugasan: 'https://example.com/pr_task',
          deadline: deadlineWIB,
        },
      },
    ];

    // ===== WAWANCARA DATA =====
    const wawancaraData = [];

    const divisiSlotsHima = {
      treasurer: { sisaSlot: 10, lokasi: 'IUP Room' },
      hr: { sisaSlot: 10, lokasi: 'IUP Room' },
      ipc: { sisaSlot: 10, lokasi: 'IUP Room' },
      pr: { sisaSlot: 10, lokasi: 'IUP Room' },
      skilldev: { sisaSlot: 10, lokasi: 'IUP Room' },
      snf: { sisaSlot: 10, lokasi: 'IUP Room' },
      secretary: { sisaSlot: 10, lokasi: 'IUP Room' },
      media: { sisaSlot: 10, lokasi: 'IUP Room' },
    };

    const divisiSlotsOti = {
      frontend: { sisaSlot: 10, lokasi: 'IUP Room' },
      backend: { sisaSlot: 10, lokasi: 'IUP Room' },
      cysec: { sisaSlot: 10, lokasi: 'IUP Room' },
      uiux: { sisaSlot: 10, lokasi: 'IUP Room' },
      cp: { sisaSlot: 10, lokasi: 'IUP Room' },
      mobapps: { sisaSlot: 10, lokasi: 'IUP Room' },
      gamedev: { sisaSlot: 10, lokasi: 'IUP Room' },
      dsai: { sisaSlot: 10, lokasi: 'IUP Room' },
    };

    // HIMAKOM Interview: 23-24 November 2025 (Minggu - Senin)
    // Jadwal: 10:15, 10:50, 11:25, 13:10, 13:45, 14:20, 14:55, 15:30 WIB
    const himakomTimes = [
      "10:15", "10:50", "11:25", "13:10", "13:45", "14:20", "14:55", "15:30"
    ];

    for (let day = 23; day <= 24; day++) {
      const sesi = himakomTimes.map((time) => ({
        jam: wibToUTC(`2025-11-${day}`, time),
        dipilihOleh: [],
        slotDivisi: JSON.parse(JSON.stringify(divisiSlotsHima)),
      }));

      wawancaraData.push({
        tanggal: wibToUTC(`2025-11-${day}`, "00:00"),
        himakom: true,
        sesi,
      });
    }

    // OTI Interview: 25-28 November 2025 (Selasa - Jumat)
    // Jadwal: 18:20, 18:55, 19:25, 20:00 WIB
    const otiTimes = ["18:20", "18:55", "19:25", "20:00"];

    for (let day = 25; day <= 28; day++) {
      const sesi = otiTimes.map((time) => ({
        jam: wibToUTC(`2025-11-${day}`, time),
        dipilihOleh: [],
        slotDivisi: JSON.parse(JSON.stringify(divisiSlotsOti)),
      }));

      wawancaraData.push({
        tanggal: wibToUTC(`2025-11-${day}`, "00:00"),
        himakom: false,
        sesi,
      });
    }

    console.log("Sample wawancara data:", JSON.stringify(wawancaraData[0], null, 2));

    // Insert divisi data
    for (const divisi of divisiData) {
      const divisiBaru = new Divisi(divisi);
      await divisiBaru.save();
    }
    console.log('✅ Divisi data successfully seeded!');

    // Insert wawancara data
    for (const wawancara of wawancaraData) {
      const wawancaraBaru = new Wawancara(wawancara);
      await wawancaraBaru.save();
    }
    console.log('✅ Wawancara data successfully seeded!');

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error('❌ Error seeding data:', err);
  }
};

seedDivisi();