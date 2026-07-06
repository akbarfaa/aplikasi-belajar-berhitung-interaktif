export type World = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  topics: string[];
  color: "coral" | "mint" | "gold" | "grape" | "cyan" | "sky" | "blush";
  emoji: string;
  locked?: boolean;
};

export const worlds: World[] = [
  { id: "counting", number: 1, title: "Petualangan Berhitung", subtitle: "Angka-angka terbangun", topics: ["Berhitung", "Mengenal Angka", "Perbandingan"], color: "coral", emoji: "🔢" },
  { id: "addition", number: 2, title: "Kerajaan Penjumlahan", subtitle: "Tambah terus!", topics: ["Penjumlahan", "Hitung Cepat", "Kecepatan"], color: "mint", emoji: "➕" },
  { id: "subtraction", number: 3, title: "Lembah Pengurangan", subtitle: "Hilangkan yang lebih", topics: ["Pengurangan", "Angka Hilang"], color: "gold", emoji: "➖" },
  { id: "multiplication", number: 4, title: "Arena Perkalian", subtitle: "Kekuatan kali", topics: ["Tabel Perkalian", "Susunan"], color: "grape", emoji: "✖️" },
  { id: "division", number: 5, title: "Pulau Pembagian", subtitle: "Bagi & berbagi", topics: ["Pembagian", "Sisa Bagi"], color: "cyan", emoji: "➗" },
  { id: "fractions", number: 6, title: "Hutan Pecahan", subtitle: "Potongan kue", topics: ["Pecahan", "Pecahan Senilai"], color: "blush", emoji: "🥧" },
  { id: "decimals", number: 7, title: "Kota Desimal", subtitle: "Titik-titik neon", topics: ["Desimal", "Pembulatan"], color: "sky", emoji: "🏙️", locked: true },
  { id: "geometry", number: 8, title: "Planet Geometri", subtitle: "Bentuk di orbit", topics: ["Bangun Datar", "Sudut"], color: "coral", emoji: "🪐", locked: true },
  { id: "algebra", number: 9, title: "Lab Aljabar", subtitle: "Pecahkan yang tak diketahui", topics: ["Variabel", "Persamaan"], color: "mint", emoji: "⚗️", locked: true },
  { id: "statistics", number: 10, title: "Angkasa Statistik", subtitle: "Alam data", topics: ["Rata-rata", "Diagram"], color: "gold", emoji: "📊", locked: true },
  { id: "calculus", number: 11, title: "Galaksi Kalkulus", subtitle: "Batas tak terhingga", topics: ["Limit", "Turunan"], color: "grape", emoji: "🌌", locked: true },
];
