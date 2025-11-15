export interface DivisiProps {
  _id: string;
  judul: string;
  judulPanjang: string;
  logoDivisi: string;
  slot: number;
  slug: string;
  proker: Proker; 
  deskripsi: string;
  dipilihOleh: string[];
  himakom: boolean;
  penugasan: Penugasan;
  __v: number;
}

interface Proker {
  url: string;
  filename: string;
  deskripsiProker: string;
  _id: string;
}

interface Penugasan {
  deskripsiPenugasan: string;
  toolsPenugasan: string;
  linkPenugasan: string;
  _id: string;
}

export interface User {
  id: string;
  NIM: string;
  username: string;
  isAdmin: boolean;
  enrolledSlugOti: string;
  enrolledSlugHima: string;
}