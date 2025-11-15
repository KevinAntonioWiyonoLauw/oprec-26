import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Divisi from './models/divisiModels';

dotenv.config();

const seedDivisi = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`, {serverSelectionTimeoutMS: 20000});
    console.log("Connected to MongoDB");

    // ==================== OMAH TI DIVISIONS ====================
    const divisiData = [
      {
        judul: 'Backend',
        judulPanjang: 'Backend Development',
        logoDivisi: 'BACKEND.png',
        slot: 10,
        slug: 'backend',
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
        },
      },
      {
        judul: 'Frontend',
        judulPanjang: 'Frontend Development',
        logoDivisi: 'FRONTEND.png',
        slot: 8,
        slug: 'frontend',
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
        },
      },
      {
        judul: 'UI/UX',
        judulPanjang: 'User Interface & User Experience Design',
        logoDivisi: 'UX.png',
        slot: 5,
        slug: 'uiux',
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
        },
      },
      {
        judul: 'Data Science & AI',
        judulPanjang: 'Data Science and Artificial Intelligence',
        logoDivisi: 'DSAI.png',
        slot: 6,
        slug: 'dsai',
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
        },
      },
      {
        judul: 'Competitive Programming',
        judulPanjang: 'Competitive Programming',
        logoDivisi: 'CP.png',
        slot: 7,
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
        },
      },
      {
        judul: 'Mobile Apps',
        judulPanjang: 'Mobile Application Development',
        logoDivisi: 'MOBAPPS.png',
        slot: 6,
        slug: 'mobapps',
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
        },
      },
      {
        judul: 'Game Development',
        judulPanjang: 'Game Development',
        logoDivisi: 'GAMEDEV.png',
        slot: 4,
        slug: 'gamedev',
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
        },
      },
      {
        judul: 'Cysec',
        judulPanjang: 'Cyber Security',
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
            url: '/assets/proker/ETT.webp',
            filename: 'ETT.webp',
            deskripsiProker: 'Evaluasi Akhir Tahun'
          },
          {
            url: '/assets/proker/Firstgathering sekbend.webp',
            filename: 'Firstgathering sekbend.webp',
            deskripsiProker: 'First gathering sekbend'
          },
          {
            url: '/assets/proker/pra-sidang bkm sekbend.webp',
            filename: 'pra-sidang bkm sekbend.webp',
            deskripsiProker: 'Pra-sidang BKM sekbend'
          },
          {
            url: '/assets/proker/sekbend openhouse.webp',
            filename: 'sekbend openhouse.webp',
            deskripsiProker: 'Sekbend di openhouse'
          }
        ],
        deskripsi: 'Divisi Treasurer mengelola keuangan HIMAKOM secara menyeluruh. Membuat laporan keuangan, mengelola cash flow, budgeting, dan tracking keuangan organisasi dengan transparan.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Buat sistem pencatatan keuangan atau laporan keuangan untuk event lengkap dengan pemasukan, pengeluaran, dan analisis budget yang detail dan realistis.',
          toolsPenugasan: 'Microsoft Excel, Google Sheets, Notion',
          linkPenugasan: 'https://drive.google.com/drive/folders/1HqUCb7OqFfcmWUKrgnApkYE-bSN2yxHA?ths=true',
          deadline: new Date(2025, 10, 21, 12, 0),
        },
      },
      {
        judul: 'Secretary',
        judulPanjang: 'Sekretaris',
        logoDivisi: 'secretary.png',
        slot: 3,
        slug: 'secretary',
        proker: [
          {
            url: '/assets/proker/ETT.webp',
            filename: 'ETT.webp',
            deskripsiProker: 'Evaluasi Akhir Tahun'
          },
          {
            url: '/assets/proker/Firstgathering sekbend.webp',
            filename: 'Firstgathering sekbend.webp',
            deskripsiProker: 'First gathering sekbend'
          },
          {
            url: '/assets/proker/pra-sidang bkm sekbend.webp',
            filename: 'pra-sidang bkm sekbend.webp',
            deskripsiProker: 'Pra-sidang BKM sekbend'
          },
          {
            url: '/assets/proker/sekbend openhouse.webp',
            filename: 'sekbend openhouse.webp',
            deskripsiProker: 'Sekbend di openhouse'
          }
        ],
        deskripsi: 'Divisi Secretary mengelola administrasi dan dokumentasi HIMAKOM. Membuat notulensi rapat, mengelola arsip, dan mengatur surat-menyurat organisasi dengan sistematis.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Buat sistem dokumentasi atau notulensi rapat yang terstruktur. Atau buat proposal/surat resmi dengan format yang proper dan bahasa yang formal.',
          toolsPenugasan: 'Microsoft Word, Google Docs, Notion, Canva',
          linkPenugasan: 'https://drive.google.com/drive/folders/1GCtX9LP50JaVH6JfKx8xauYHSy9MJHKD?ths=true',
          deadline: new Date(2025, 10, 21, 12, 0),
        },
      },
      {
        judul: 'HR',
        judulPanjang: 'Human Resources',
        logoDivisi: 'hr.png',
        slot: 4,
        slug: 'hr',
        proker: [
          {
            url: '/assets/proker/hr.webp',
            filename: 'hr.webp',
            deskripsiProker: 'Pelatihan divisi Human Resources'
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
        },
      },
      {
        judul: 'IPC',
        judulPanjang: 'Internal Public Control',
        logoDivisi: 'ipc.png',
        slot: 3,
        slug: 'ipc',
        proker: [
          {
            url: '/assets/proker/ipc.webp',
            filename: 'ipc.webp',
            deskripsiProker: 'Pelatihan divisi Internal Public Control'
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
        },
      },
      {
        judul: 'S&F',
        judulPanjang: 'Sponsorship & Fundraising',
        logoDivisi: 's&f.png',
        slot: 4,
        slug: 'snf',
        proker: [
          {
            url: '/assets/proker/snf.webp',
            filename: 'snf.webp',
            deskripsiProker: 'Pelatihan divisi Sponsorship & Fundraising'
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
        },
      },
      {
        judul: 'Skilldev',
        judulPanjang: 'Skill Development',
        logoDivisi: 'skillDev.png',
        slot: 4,
        slug: 'skilldev',
        proker: [
          {
            url: '/assets/proker/skilldev.webp',
            filename: 'skilldev.webp',
            deskripsiProker: 'Pelatihan divisi Skill Development'
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
        },
      },
      {
        judul: 'Media',
        judulPanjang: 'Media & Creative',
        logoDivisi: 'media.png',
        slot: 5,
        slug: 'media',
        proker: [
          {
            url: '/assets/proker/pemotretan divisi media.webp',
            filename: 'pemotretan divisi media.webp',
            deskripsiProker: 'Sesi pemotretan divisi media'
          }
        ],
        deskripsi: 'Divisi Media mengelola konten visual, photography, videography, dan desain grafis HIMAKOM. Membuat konten engaging untuk social media dan dokumentasi event.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: 'Buat konten visual untuk social media campaign atau design poster/banner untuk event. Atau buat video documentation/promotional dengan editing yang menarik.',
          toolsPenugasan: 'Adobe Photoshop, Illustrator, Premiere Pro, Canva, CapCut',
          linkPenugasan: 'https://drive.google.com/drive/folders/1WBnWOBrpM0HUd7wXpse6DIWlUbVzMyaR?ths=true',
          deadline: new Date(2025, 10, 21, 12, 0),
        },
      },
      {
        judul: 'PR',
        judulPanjang: 'Public Relations',
        logoDivisi: 'pr.png',
        slot: 4,
        slug: 'pr',
        proker: [
          {
            url: '/assets/proker/pr.webp',
            filename: 'pr.webp',
            deskripsiProker: 'Pelatihan divisi Public Relations'
          }
        ],
        deskripsi: 'Divisi PR mengelola hubungan dengan pihak eksternal dan komunikasi publik HIMAKOM. Membuat press release, mengelola media relations, dan membangun brand image organisasi.',
        dipilihOleh: [],
        himakom: true,
        penugasan: {
          deskripsiPenugasan: '1) Copywriting: Buat copywriting berdasarkan berita terbaru HIMAKOM/non-HIMAKOM dengan outline/storyboard konten Instagram (format PDF).<br><br>2) Wawancara: Lakukan wawancara 3-5 menit tentang topik PR (teknologi, sosial media, komunikasi) dengan narasumber di tempat wisata strategis Yogyakarta, rekam dalam video portrait (format video).',
          toolsPenugasan: 'Microsoft Office, Canva, Social Media Management Tools, Video Recording',
          linkPenugasan: 'https://drive.google.com/drive/folders/1ydgJ_EevD8EzhC_O-aGaU_5pBS89WK8m?ths=true',
          deadline: new Date(2025, 10, 21, 12, 0),
        },
      },
    ];

    // Insert divisi data
    console.log('Inserting divisi data...');
    for(const divisi of divisiData){
      const divisiBaru = new Divisi(divisi);
      await divisiBaru.save();
    }
    console.log('✅ Divisi data successfully seeded!');
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('✅ Seeding completed successfully!');
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
};

// Run the seed function
seedDivisi();
