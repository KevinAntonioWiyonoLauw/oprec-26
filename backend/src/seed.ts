import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Divisi from './models/divisiModels';
<<<<<<< HEAD
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

=======

dotenv.config();

const seedDivisi = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`, {serverSelectionTimeoutMS: 20000});
    console.log("Connected to MongoDB");

    // ==================== OMAH TI DIVISIONS ====================
>>>>>>> db05a9e543f52e1ede94fe1e41e4f16862f70655
    const divisiData = [
      // OmahTI Divisions
      {
        judul: 'Backend',
        judulPanjang: 'Backend Development',
        logoDivisi: 'BACKEND.png',
        slot: 10,
        slug: 'backend',
<<<<<<< HEAD
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
=======
        proker: [
          {
            url: '/assets/proker/be.webp',
            filename: 'be.webp',
            deskripsiProker: 'Pelatihan divisi Backend'
          }
        ],
        deskripsi: 'Divisi Backend bertanggung jawab mengembangkan logika server, API, dan database. Mempelajari Node.js, Express, MongoDB, PostgreSQL, dan membangun sistem yang scalable dan secure.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Buat RESTful API dengan fitur authentication (register/login), CRUD operations, dan middleware validation. Implementasikan error handling yang proper.',
          toolsPenugasan: 'Node.js, Express.js, MongoDB/PostgreSQL, Postman',
          linkPenugasan: 'https://drive.google.com/drive/folders/1PseOqiZ289uhwKGy6OKQKmoOIRxJCApZ?ths=true',
          deadline: new Date(2025, 10, 21, 12, 0),
>>>>>>> db05a9e543f52e1ede94fe1e41e4f16862f70655
        },
      },
      {
        judul: 'Frontend',
        judulPanjang: 'Frontend Development',
        logoDivisi: 'FRONTEND.png',
        slot: 8,
        slug: 'frontend',
<<<<<<< HEAD
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
=======
        proker: [
          {
            url: '/assets/proker/fe.webp',
            filename: 'fe.webp',
            deskripsiProker: 'Pelatihan divisi Frontend'
          }
        ],
        deskripsi: 'Divisi Frontend fokus pada pengembangan UI yang menarik dan responsif. Mempelajari React, Next.js, Vue.js, Tailwind CSS untuk membangun aplikasi web modern.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Buat web application responsive dengan minimal 3 halaman, state management, dan integrasi API. Implementasikan smooth navigation dan UX yang baik.',
          toolsPenugasan: 'React.js/Next.js/Vue.js, Tailwind CSS, JavaScript/TypeScript',
          linkPenugasan: 'https://drive.google.com/drive/folders/1D5v3b4GIAi-jWrj6F1ZBRgLUVyEqzL_D?ths=true',
          deadline: new Date(2025, 10, 21, 12, 0),
>>>>>>> db05a9e543f52e1ede94fe1e41e4f16862f70655
        },
      },
      {
        judul: 'UI/UX',
        judulPanjang: 'User Interface & User Experience Design',
        logoDivisi: 'UX.png',
        slot: 5,
        slug: 'uiux',
<<<<<<< HEAD
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
=======
        proker: [
          {
            url: '/assets/proker/uiux.webp',
            filename: 'uiux.webp',
            deskripsiProker: 'Pelatihan divisi UI/UX'
          }
        ],
        deskripsi: 'Divisi UI/UX merancang pengalaman pengguna yang optimal dan interface yang menarik. Mempelajari design thinking, wireframing, prototyping dengan Figma dan Adobe XD.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Rancang UI/UX untuk mobile app atau website lengkap dengan user flow, wireframe, dan high-fidelity prototype. Perhatikan usability dan visual hierarchy.',
          toolsPenugasan: 'Figma, Adobe XD, Prototyping Tools',
          linkPenugasan: 'https://drive.google.com/drive/folders/1XH4Sd370Vns9kTrXScfVYyuaRN27TliW?ths=true',
          deadline: new Date(2025, 10, 21, 12, 0),
>>>>>>> db05a9e543f52e1ede94fe1e41e4f16862f70655
        },
      },
      {
        judul: 'Data Science & AI',
        judulPanjang: 'Data Science and Artificial Intelligence',
        logoDivisi: 'DSAI.png',
        slot: 6,
        slug: 'dsai',
<<<<<<< HEAD
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
=======
        proker: [
          {
            url: '/assets/proker/dsai.webp',
            filename: 'dsai.webp',
            deskripsiProker: 'Pelatihan divisi Data Science & AI'
          }
        ],
        deskripsi: 'Divisi Data Science & AI fokus pada pengolahan data, analisis, dan machine learning. Mempelajari Python, pandas, scikit-learn, TensorFlow untuk menyelesaikan permasalahan dengan pendekatan data-driven.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Buat project data analysis atau ML model. Harus mencakup data preprocessing, EDA, modeling, dan evaluation dengan visualisasi yang informatif.',
          toolsPenugasan: 'Python, Jupyter Notebook, pandas, numpy, scikit-learn, matplotlib',
          linkPenugasan: 'https://drive.google.com/drive/folders/1iGngRXcxFzXDZryETsoEIiHHSIJWChJZ?ths=true',
          deadline: new Date(2025, 10, 21, 12, 0),
>>>>>>> db05a9e543f52e1ede94fe1e41e4f16862f70655
        },
      },
      {
        judul: 'Competitive Programming',
        judulPanjang: 'Competitive Programming',
        logoDivisi: 'CP.png',
        slot: 7,
<<<<<<< HEAD
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
=======
        slug: 'compro',
        proker: [
          {
            url: '/assets/proker/cp.webp',
            filename: 'cp.webp',
            deskripsiProker: 'Pelatihan divisi Competitive Programming'
          }
        ],
        deskripsi: 'Divisi Competitive Programming fokus pada problem solving dan algoritma. Persiapan untuk kompetisi seperti ICPC, INC, Gemastik dengan pembelajaran algoritma advanced.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Selesaikan problem solving yang mencakup algoritma seperti sorting, dynamic programming, graph theory. Solusi harus efisien dalam time dan space complexity.',
          toolsPenugasan: 'C++, Python, Java, Online Judge (Codeforces, LeetCode)',
          linkPenugasan: 'https://drive.google.com/drive/folders/1XH4Sd370Vns9kTrXScfVYyuaRN27TliW?ths=true',
          deadline: new Date(2025, 10, 21, 12, 0),
>>>>>>> db05a9e543f52e1ede94fe1e41e4f16862f70655
        },
      },
      {
        judul: 'Mobile Apps',
        judulPanjang: 'Mobile Application Development',
        logoDivisi: 'MOBAPPS.png',
        slot: 6,
        slug: 'mobapps',
<<<<<<< HEAD
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
=======
        proker: [
          {
            url: '/assets/proker/mobapps0.webp',
            filename: 'mobapps0.webp',
            deskripsiProker: 'Pelatihan divisi Mobile Apps'
          },
          {
            url: '/assets/proker/mobapps1.webp',
            filename: 'mobapps1.webp',
            deskripsiProker: 'Pelatihan divisi Mobile Apps'
          },
          {
            url: '/assets/proker/mobapps2.webp',
            filename: 'mobapps2.webp',
            deskripsiProker: 'Pelatihan divisi Mobile Apps'
          },
          {
            url: '/assets/proker/mobapps3.webp',
            filename: 'mobapps3.webp',
            deskripsiProker: 'Pelatihan divisi Mobile Apps'
          }
        ],
        deskripsi: 'Divisi Mobile Apps mengembangkan aplikasi mobile untuk Android dan iOS. Mempelajari Flutter, React Native, Kotlin/Swift untuk membangun aplikasi yang performant.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Buat mobile app dengan minimal 3 screens, navigation, state management, dan API integration. Aplikasi harus responsive dan mengikuti design guidelines platform.',
          toolsPenugasan: 'Flutter, React Native, Kotlin, Swift, Android Studio',
          linkPenugasan: 'https://drive.google.com/drive/folders/1O_3GDFEI5eJ7G-C-j-kDeH4If-4W3SaW?ths=true',
          deadline: new Date(2025, 10, 21, 12, 0),
>>>>>>> db05a9e543f52e1ede94fe1e41e4f16862f70655
        },
      },
      {
        judul: 'Game Development',
        judulPanjang: 'Game Development',
        logoDivisi: 'GAMEDEV.png',
        slot: 4,
        slug: 'gamedev',
<<<<<<< HEAD
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
=======
        proker: [
          {
            url: '/assets/proker/gamedev.webp',
            filename: 'gamedev.webp',
            deskripsiProker: 'Pelatihan divisi Game Development'
          }
        ],
        deskripsi: 'Divisi Game Development membuat game untuk PC, Mobile, dan Web. Mempelajari Unity/Unreal Engine, C#/C++, game design principles, dan optimization.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Buat game prototype (2D/3D) dengan gameplay mechanics yang clear, controls responsive, dan visual/audio yang mendukung. Minimal 1 level yang playable.',
          toolsPenugasan: 'Unity, Unreal Engine, C#, C++, Blender (optional)',
          linkPenugasan: 'https://drive.google.com/drive/folders/1Qlvqc5uIOu3tNXFxG_QyvCxk78GNSF9r?ths=true',
          deadline: new Date(2025, 10, 21, 12, 0),
>>>>>>> db05a9e543f52e1ede94fe1e41e4f16862f70655
        },
      },
      {
        judul: 'Cysec',
        judulPanjang: 'Cyber Security',
<<<<<<< HEAD
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
=======
        logoDivisi: 'CYSEC.png',
        slot: 4,
        slug: 'cybersec',
        proker: [
          {
            url: '/assets/proker/cysec.webp',
            filename: 'cysec.webp',
            deskripsiProker: 'Pelatihan divisi Cyber Security'
          }
        ],
        deskripsi: 'Divisi Cyber Security fokus pada keamanan sistem, penetration testing, dan forensics. Mempelajari ethical hacking, security tools (Kali Linux, Metasploit), dan cryptography.',
        dipilihOleh: [],
        himakom: false,
        penugasan: {
          deskripsiPenugasan: 'Selesaikan CTF challenges (web exploitation, cryptography, forensics) atau buat security analysis report dari sebuah sistem dengan recommendations.',
          toolsPenugasan: 'Kali Linux, Metasploit, Wireshark, Burp Suite, Python',
          linkPenugasan: 'https://drive.google.com/drive/folders/18L0nkSok6hV-V4zSU71w9uRSIS8yH7_L?ths=true',
          deadline: new Date(2025, 10, 21, 12, 0),
        },
      },
      
      // ==================== HIMAKOM DIVISIONS ====================
      {
        judul: 'Treasurer',
        judulPanjang: 'Bendahara',
        logoDivisi: 'treasurer.png',
        slot: 3,
        slug: 'treasurer',
        proker: [
          {
            url: '/assets/proker/sekbend.webp',
            filename: 'sekbend.webp',
            deskripsiProker: 'Sekbend di openhouse'
          }
        ],
        deskripsi: 'Divisi Treasurer mengelola keuangan HIMAKOM secara menyeluruh. Membuat laporan keuangan, mengelola cash flow, budgeting, dan tracking keuangan organisasi dengan transparan.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Buat sistem pencatatan keuangan atau laporan keuangan untuk event lengkap dengan pemasukan, pengeluaran, dan analisis budget yang detail dan realistis.',
          toolsPenugasan: 'Microsoft Excel, Google Sheets, Notion',
          linkPenugasan: 'https://drive.google.com/drive/folders/1HqUCb7OqFfcmWUKrgnApkYE-bSN2yxHA?usp=drive_link',
          deadline: new Date(2025, 10, 21, 12, 0),
>>>>>>> db05a9e543f52e1ede94fe1e41e4f16862f70655
        },
      },
      {
        judul: 'Secretary',
<<<<<<< HEAD
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
=======
        judulPanjang: 'Sekretaris',
        logoDivisi: 'secretary.png',
        slot: 3,
        slug: 'secretary',
        proker: [
          {
            url: '/assets/proker/sekbend.webp',
            filename: 'sekbend.webp',
            deskripsiProker: 'Sekbend di openhouse'
          }
        ],
        deskripsi: 'Divisi Secretary mengelola administrasi dan dokumentasi HIMAKOM. Membuat notulensi rapat, mengelola arsip, dan mengatur surat-menyurat organisasi dengan sistematis.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Buat sistem dokumentasi atau notulensi rapat yang terstruktur. Atau buat proposal/surat resmi dengan format yang proper dan bahasa yang formal.',
          toolsPenugasan: 'Microsoft Word, Google Docs, Notion, Canva',
          linkPenugasan: 'https://drive.google.com/drive/folders/1GCtX9LP50JaVH6JfKx8xauYHSy9MJHKD?usp=drive_link',
          deadline: new Date(2025, 10, 21, 12, 0),
>>>>>>> db05a9e543f52e1ede94fe1e41e4f16862f70655
        },
      },
      {
        judul: 'HR',
<<<<<<< HEAD
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
=======
        judulPanjang: 'Human Resources',
        logoDivisi: 'hr.png',
        slot: 4,
        slug: 'hr',
        proker: [
          {
            url: '/assets/proker/hr.webp',
            filename: 'hr.webp',
            deskripsiProker: 'Pertemuan divisi Human Resources'
          }
        ],
        deskripsi: 'Divisi HR fokus pada pengembangan SDM HIMAKOM. Mengelola recruitment, training, team building, dan program pengembangan kompetensi anggota organisasi.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Buat proposal program training/workshop atau rancang sistem evaluation untuk SDM. Atau buat rundown acara team building yang engaging dan educational.',
          toolsPenugasan: 'Microsoft Office, Google Workspace, Canva, Notion',
          linkPenugasan: 'https://drive.google.com/drive/folders/1B-Ro944FNcbDnqolVY_MHKpbo3RyySq-?ths=true',
          deadline: new Date(2025, 10, 21, 12, 0),
>>>>>>> db05a9e543f52e1ede94fe1e41e4f16862f70655
        },
      },
      {
        judul: 'IPC',
<<<<<<< HEAD
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
=======
        judulPanjang: 'Internal Public Control',
        logoDivisi: 'ipc.png',
        slot: 3,
        slug: 'ipc',
        proker: [
          {
            url: '/assets/proker/ipc.webp',
            filename: 'ipc.webp',
            deskripsiProker: 'Pertemuan divisi Internal Public Control'
          }
        ],
        deskripsi: 'Divisi IPC mengawasi dan mengevaluasi kinerja internal HIMAKOM. Melakukan monitoring, audit internal, dan memberikan rekomendasi perbaikan untuk organisasi.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Buat sistem monitoring/evaluasi kinerja divisi atau proposal audit internal. Atau analisis permasalahan organisasi dengan solusi yang konstruktif.',
          toolsPenugasan: 'Microsoft Office, Google Forms, Data Analysis Tools',
          linkPenugasan: 'https://drive.google.com/drive/folders/1Lj1NMWCev0xf7iUzS7_Xd3JRXajmENzc?ths=true',
          deadline: new Date(2025, 10, 21, 12, 0),
>>>>>>> db05a9e543f52e1ede94fe1e41e4f16862f70655
        },
      },
      {
        judul: 'S&F',
        judulPanjang: 'Sponsorship & Fundraising',
<<<<<<< HEAD
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
=======
        logoDivisi: 's&f.png',
        slot: 4,
        slug: 'snf',
        proker: [
          {
            url: '/assets/proker/snf.webp',
            filename: 'snf.webp',
            deskripsiProker: 'Pertemuan divisi Sponsorship & Fundraising'
          }
        ],
        deskripsi: 'Divisi S&F mencari sponsor dan menggalang dana untuk kegiatan HIMAKOM. Membuat proposal sponsorship, negosiasi dengan partner, dan mengelola kemitraan strategis.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Buat proposal sponsorship yang menarik untuk sebuah event atau strategi fundraising yang kreatif. Harus mencakup benefits package dan target sponsor yang clear.',
          toolsPenugasan: 'Microsoft Office, Canva, Presentation Skills',
          linkPenugasan: 'https://drive.google.com/drive/folders/19TEN1JMwYhKOJpvNbQGVjT5BtGgOSc4x?ths=true',
          deadline: new Date(2025, 10, 21, 12, 0),
>>>>>>> db05a9e543f52e1ede94fe1e41e4f16862f70655
        },
      },
      {
        judul: 'Skilldev',
        judulPanjang: 'Skill Development',
<<<<<<< HEAD
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
=======
        logoDivisi: 'skillDev.png',
        slot: 4,
        slug: 'skilldev',
        proker: [
          {
            url: '/assets/proker/skilldev.webp',
            filename: 'skilldev.webp',
            deskripsiProker: 'Pertemuan divisi Skill Development'
          }
        ],
        deskripsi: 'Divisi Skilldev fokus pada pengembangan kompetensi mahasiswa Ilkom. Mengadakan workshop, bootcamp, dan program pelatihan di berbagai bidang teknologi dan soft skills.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Buat proposal workshop/bootcamp lengkap dengan materi, timeline, dan target peserta. Atau rancang curriculum training program yang komprehensif dan applicable.',
          toolsPenugasan: 'Microsoft Office, Canva, Learning Management Systems',
          linkPenugasan: 'https://drive.google.com/drive/folders/1_cWIbTFnhb-0TBLyGehmJBHanHaGzlm8?ths=true',
          deadline: new Date(2025, 10, 21, 12, 0),
>>>>>>> db05a9e543f52e1ede94fe1e41e4f16862f70655
        },
      },
      {
        judul: 'Media',
<<<<<<< HEAD
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
=======
        judulPanjang: 'Media & Creative',
        logoDivisi: 'media.png',
        slot: 5,
        slug: 'media',
        proker: [],
        deskripsi: 'Divisi Media mengelola konten visual, photography, videography, dan desain grafis HIMAKOM. Membuat konten engaging untuk social media dan dokumentasi event.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Buat konten visual untuk social media campaign atau design poster/banner untuk event. Atau buat video documentation/promotional dengan editing yang menarik.',
          toolsPenugasan: 'Adobe Photoshop, Illustrator, Premiere Pro, Canva, CapCut',
          linkPenugasan: 'https://drive.google.com/drive/folders/1WBnWOBrpM0HUd7wXpse6DIWlUbVzMyaR?ths=true',
          deadline: new Date(2025, 10, 21, 12, 0),
>>>>>>> db05a9e543f52e1ede94fe1e41e4f16862f70655
        },
      },
      {
        judul: 'PR',
        judulPanjang: 'Public Relations',
<<<<<<< HEAD
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
=======
        logoDivisi: 'pr.png',
        slot: 4,
        slug: 'pr',
        proker: [
          {
            url: '/assets/proker/pr.webp',
            filename: 'pr.webp',
            deskripsiProker: 'Pertemuan divisi Public Relations'
          }
        ],
        deskripsi: 'Divisi PR mengelola hubungan dengan pihak eksternal dan komunikasi publik HIMAKOM. Membuat press release, mengelola media relations, dan membangun brand image organisasi.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Buat press release atau media kit untuk event. Atau rancang strategi komunikasi eksternal untuk meningkatkan brand awareness HIMAKOM yang efektif.',
          toolsPenugasan: 'Microsoft Office, Canva, Social Media Management Tools',
          linkPenugasan: 'https://drive.google.com/drive/folders/1ydgJ_EevD8EzhC_O-aGaU_5pBS89WK8m?ths=true',
          deadline: new Date(2025, 10, 21, 12, 0),
>>>>>>> db05a9e543f52e1ede94fe1e41e4f16862f70655
        },
      },
    ];

<<<<<<< HEAD
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
=======
    // Insert divisi data
    console.log('Inserting divisi data...');
    for(const divisi of divisiData){
>>>>>>> db05a9e543f52e1ede94fe1e41e4f16862f70655
      const divisiBaru = new Divisi(divisi);
      await divisiBaru.save();
    }
    console.log('✅ Divisi data successfully seeded!');
<<<<<<< HEAD

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
=======
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('✅ Seeding completed successfully!');
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
>>>>>>> db05a9e543f52e1ede94fe1e41e4f16862f70655
  }
};

seedDivisi();