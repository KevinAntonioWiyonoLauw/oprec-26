// export const fetchMakomti = async (makomti: string) => {
//   // const res = await fetch(BASE_URL + "makomti?makomtiName=" + makomti)

//   if (makomti === "himakom") {
//     return {
//       id: "himakom",
//       name: "himakom",
//       what_we_do:
//         "HIMAKOM FMIPA UGM hadir untuk memfasilitasi aspirasi, minat, serta keluhan dan masukan mahasiswa Ilmu Komputer FMIPA UGM. HIMAKOM memastikan lingkungan belajar yang sehat, inklusif, aman, dan nyaman untuk seluruh civitas akademika Ilmu Komputer FMIPA UGM.",
//       lead: {
//         quote:
//           "Hello, fellow CS UGM friends, MAKOMTI applications are officially open! I am thrilled to extend a warm invitation for individuals looking to grow both interpersonal and professional skills to seize this opportunity and join us! I wish you all goodluck on your application :>\n\nHalo, teman-teman CS UGM, pendaftaran MAKOMTI telah resmi dibuka! Dengan senang hati kami menyampaikan undangan hangat bagi kalian yang ingin mengembangkan kemampuan interpersonal dan profesional untuk memanfaatkan kesempatan ini dan bergabung bersama kami! Semangat dan goodluck :>\n",
//         name: "Alana Jocelyn Natania Massie",
//         imageUrl:
//           "https://firebasestorage.googleapis.com/v0/b/oprec-makomti-2024.appspot.com/o/foto-ceo-makomji%2Ffoto-makomji.png?alt=media",
//       },
//       description:
//         "HIMAKOM FMIPA UGM hadir untuk memfasilitasi aspirasi, minat, serta keluhan dan masukan mahasiswa Ilmu Komputer FMIPA UGM.",
//       divisions: [
//         {
//           id: "assistant_secretary",
//           name: "Assistant Secretary",
//           logoUrl:
//             "https://firebasestorage.googleapis.com/v0/b/oprec-makomti-2024.appspot.com/o/divisions%2Flogo%2Fkj5ki_Sekretaris.png?alt=media",
//         },
//         {
//           id: "assistant_treasurer",
//           name: "Assistant Treasurer",
//           logoUrl:
//             "https://firebasestorage.googleapis.com/v0/b/oprec-makomti-2024.appspot.com/o/divisions%2Flogo%2Fj9qe1_Treasurer.png?alt=media",
//         },
//         {
//           id: "human_resources",
//           name: "Human Resources",
//           logoUrl:
//             "https://firebasestorage.googleapis.com/v0/b/oprec-makomti-2024.appspot.com/o/divisions%2Flogo%2Fxhang_HR.png?alt=media",
//         },
//         {
//           id: "internal_control",
//           name: "Internal Control",
//           logoUrl:
//             "https://firebasestorage.googleapis.com/v0/b/oprec-makomti-2024.appspot.com/o/divisions%2Flogo%2Fwwuwm_ic.png?alt=media",
//         },
//         {
//           id: "media",
//           name: "Media",
//           logoUrl:
//             "https://firebasestorage.googleapis.com/v0/b/oprec-makomti-2024.appspot.com/o/divisions%2Flogo%2F21q4v_mEDIA.png?alt=media",
//         },
//         {
//           id: "partnership",
//           name: "Partnership",
//           logoUrl:
//             "https://firebasestorage.googleapis.com/v0/b/oprec-makomti-2024.appspot.com/o/divisions%2Flogo%2F8tp1t_Partnership.png?alt=media",
//         },
//         {
//           id: "project_management",
//           name: "Project Management",
//           logoUrl:
//             "https://firebasestorage.googleapis.com/v0/b/oprec-makomti-2024.appspot.com/o/divisions%2Flogo%2Fhd9cu_PROJECT%20MANAGEMENT.png?alt=media",
//         },
//         {
//           id: "public_relations",
//           name: "Public Relations",
//           logoUrl:
//             "https://firebasestorage.googleapis.com/v0/b/oprec-makomti-2024.appspot.com/o/divisions%2Flogo%2Fi7grx_PR.png?alt=media",
//         },
//         {
//           id: "skill_development",
//           name: "Skill Development",
//           logoUrl:
//             "https://firebasestorage.googleapis.com/v0/b/oprec-makomti-2024.appspot.com/o/divisions%2Flogo%2Fy5wct_SD.png?alt=media",
//         },
//       ],
//     } as Makomti
//   } else {
//     return {
//       id: "omahti",
//       name: "omahti",
//       description:
//         "Organisasi Mahasiswa Ahli Teknologi Informasi (OmahTI) merupakan organisasi IT yang berfokus pada pelatihan, perlombaan, produk, dan pelayanan. Melalui OmahTI, teman-teman Ilmu Komputer UGM mampu mengembangkan kemampuan hardskill seputar IT sehingga menghasilkan produk melalui berbagai kegiatan yang diadakan.",
//       what_we_do: "Pelatihan, Perlombaan, Produk, dan Pelayanan",
//       lead: {
//         quote:
//           "Halo teman-teman Ilmu Komputer UGM! Dengan berbangga hati, kami mengajak teman-teman semua untuk bergabung dalam OmahTI UGM untuk bersama-sama mengembangkan diri dalam berbagai skill sesuai dengan minat yang sesuai. Jangan lupa untuk daftar tepat waktu dan berikan usaha terbaikmu. Good luck~",
//         name: "Wenka Wendira Putri Bun",
//         imageUrl:
//           "https://firebasestorage.googleapis.com/v0/b/oprec-makomti-2024.appspot.com/o/foto-ceo-makomji%2Ffoto-ceo.png?alt=media",
//       },
//       divisions: [
//         {
//           id: "backend",
//           name: "Back-End Development",
//           logoUrl:
//             "https://firebasestorage.googleapis.com/v0/b/oprec-makomti-2024.appspot.com/o/divisions%2Flogo%2F5txqr_webdev.png?alt=media",
//         },
//         {
//           id: "competitive_programming",
//           name: "Competitive Programming",
//           logoUrl:
//             "https://firebasestorage.googleapis.com/v0/b/oprec-makomti-2024.appspot.com/o/divisions%2Flogo%2Fzk3z9_cp.png?alt=media",
//         },
//         {
//           id: "cyber_security",
//           name: "Cyber Security",
//           logoUrl:
//             "https://firebasestorage.googleapis.com/v0/b/oprec-makomti-2024.appspot.com/o/divisions%2Flogo%2Fp6hof_cysec.png?alt=media",
//         },
//         {
//           id: "data_science",
//           name: "Data Science",
//           logoUrl:
//             "https://firebasestorage.googleapis.com/v0/b/oprec-makomti-2024.appspot.com/o/divisions%2Flogo%2F3xc6t_Datsci.png?alt=media",
//         },
//         {
//           id: "frontend",
//           name: "Front-End Development",
//           logoUrl:
//             "https://firebasestorage.googleapis.com/v0/b/oprec-makomti-2024.appspot.com/o/divisions%2Flogo%2Fzfusq_Front%20End%20Logo%20-1%20-BW.png?alt=media",
//         },
//         {
//           id: "game_development",
//           name: "Game Development",
//           logoUrl:
//             "https://firebasestorage.googleapis.com/v0/b/oprec-makomti-2024.appspot.com/o/divisions%2Flogo%2Fa5dqj_gamedev.png?alt=media",
//         },
//         {
//           id: "mobile_app",
//           name: "Mobile-Apps Development",
//           logoUrl:
//             "https://firebasestorage.googleapis.com/v0/b/oprec-makomti-2024.appspot.com/o/divisions%2Flogo%2Fuvvso_mobapps.png?alt=media",
//         },
//         {
//           id: "uiux",
//           name: "UIUX",
//           logoUrl:
//             "https://firebasestorage.googleapis.com/v0/b/oprec-makomti-2024.appspot.com/o/divisions%2Flogo%2F09udl_uiux.png?alt=media",
//         },
//       ],
//     } as Makomti
//   }
//   // return res.json() as Promise<Makomti>
// }

export const divisi = [
  {
    makomti: "himakom",
    id: "treasurer-assistant",
    nama: "Treasurer Assistant ",
    logoUrl: "",
    tentang: "",
    kegiatan: {
      fotoUrl: "",
      namaKegiatan: "",
    },
    penugasan: "",
  },
  {
    makomti: "himakom",
    id: "secretary-asistant",
    nama: "Secretary Assistant",
    logoUrl: "",
    tentang: "",
    kegiatan: {
      fotoUrl: "",
      namaKegiatan: "",
    },
    penugasan: "",
  },
  {
    makomti: "himakom",
    id: "ic",
    nama: "Internal Control",
    logoUrl: "",
    tentang: "",
    kegiatan: {
      fotoUrl: "",
      namaKegiatan: "",
    },
    penugasan: "",
  },
  {
    makomti: "himakom",
    id: "hr",
    nama: "Human Resources",
    logoUrl: "",
    tentang: "",
    kegiatan: {
      fotoUrl: "",
      namaKegiatan: "",
    },
    penugasan: "",
  },
  {
    makomti: "himakom",
    id: "skilldev",
    nama: "Skill Development",
    logoUrl: "",
    tentang: "",
    kegiatan: {
      fotoUrl: "",
      namaKegiatan: "",
    },
    penugasan: "",
  },
  {
    makomti: "himakom",
    id: "pm",
    nama: "Project Management",
    logoUrl: "",
    tentang: "",
    kegiatan: {
      fotoUrl: "",
      namaKegiatan: "",
    },
    penugasan: "",
  },
  {
    makomti: "himakom",
    id: "partnership",
    nama: "Partnership",
    logoUrl: "",
    tentang: "",
    kegiatan: {
      fotoUrl: "",
      namaKegiatan: "",
    },
    penugasan: "",
  },
  {
    makomti: "himakom",
    id: "pr",
    nama: "Public Relations",
    logoUrl: "",
    tentang: "",
    kegiatan: {
      fotoUrl: "",
      namaKegiatan: "",
    },
    penugasan: "",
  },
  {
    makomti: "himakom",
    id: "media",
    nama: "Media",
    logoUrl: "",
    tentang: "",
    kegiatan: {
      fotoUrl: "",
      namaKegiatan: "",
    },
    penugasan: "",
  },
  {
    makomti: "omahti",
    id: "backend",
    nama: "Backend",
    logoUrl: "",
    tentang: "",
    kegiatan: {
      fotoUrl: "",
      namaKegiatan: "",
    },
    penugasan: "",
  },
  {
    makomti: "omahti",
    id: "cp",
    nama: "Competitive Programming",
    logoUrl: "",
    tentang: "",
    kegiatan: {
      fotoUrl: "",
      namaKegiatan: "",
    },
    penugasan: "",
  },
  {
    makomti: "omahti",
    id: "cybersec",
    nama: "Cyber Security",
    logoUrl: "",
    tentang: "",
    kegiatan: {
      fotoUrl: "",
      namaKegiatan: "",
    },
    penugasan: "",
  },
  {
    makomti: "omahti",
    id: "dsai",
    nama: "Data Science and Artificial Intelligence",
    logoUrl: "",
    tentang: "",
    kegiatan: {
      fotoUrl: "",
      namaKegiatan: "",
    },
    penugasan: "",
  },
  {
    makomti: "omahti",
    id: "frontend",
    nama: "Frontend",
    logoUrl: "",
    tentang: "",
    kegiatan: {
      fotoUrl: "",
      namaKegiatan: "",
    },
    penugasan: "",
  },
  {
    makomti: "omahti",
    id: "gamedev",
    nama: "Game Developer",
    logoUrl: "",
    tentang: "",
    kegiatan: {
      fotoUrl: "",
      namaKegiatan: "",
    },
    penugasan: "",
  },
  {
    makomti: "omahti",
    id: "mobapps",
    nama: "Mobile Apps",
    logoUrl: "",
    tentang: "",
    kegiatan: {
      fotoUrl: "",
      namaKegiatan: "",
    },
    penugasan: "",
  },
  {
    makomti: "omahti",
    id: "uiux",
    nama: "UI/UX",
    logoUrl: "",
    tentang: "",
    kegiatan: {
      fotoUrl: "",
      namaKegiatan: "",
    },
    penugasan: "",
  },
];