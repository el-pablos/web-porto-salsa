/**
 * Koleksi quotes untuk ditampilkan di Footer
 * Disesuaikan dengan persona gabungan: Sociology + Data Analysis + Tech + Volunteer
 */

export interface Quote {
  text: string;
  category: 'motivational' | 'data-analysis' | 'cute' | 'tech-humor' | 'sociology';
}

export const quotes: Quote[] = [
  // Motivational (5)
  {
    text: "Satu insight bisa mengubah segalanya!",
    category: 'motivational'
  },
  {
    text: "Hari ini adalah hari yang tepat untuk explore data baru",
    category: 'motivational'
  },
  {
    text: "Keep calm and let the data speak",
    category: 'motivational'
  },
  {
    text: "Every dataset has a story waiting to be discovered",
    category: 'motivational'
  },
  {
    text: "Terus belajar, terus berkembang, terus berkarya!",
    category: 'motivational'
  },

  // Sociology (5)
  {
    text: "Sosiologi mengajarkan kita melihat dunia dari perspektif yang berbeda",
    category: 'sociology'
  },
  {
    text: "Di balik setiap angka, ada cerita manusia yang menunggu untuk dipahami",
    category: 'sociology'
  },
  {
    text: "Perubahan sosial dimulai dari memahami masyarakat secara mendalam",
    category: 'sociology'
  },
  {
    text: "Data tanpa konteks sosial hanyalah angka, konteks tanpa data hanyalah opini",
    category: 'sociology'
  },
  {
    text: "Volunteer bukan tentang waktu yang kita berikan, tapi dampak yang kita ciptakan",
    category: 'sociology'
  },

  // Data Analysis Fun Facts (5)
  {
    text: "Data is the new oil, tapi butuh analyst buat refine-nya!",
    category: 'data-analysis'
  },
  {
    text: "Behind every great decision, ada data yang di-analyze dengan teliti",
    category: 'data-analysis'
  },
  {
    text: "Correlation doesn't imply causation, tapi bisa jadi clue yang menarik!",
    category: 'data-analysis'
  },
  {
    text: "Setiap dataset punya cerita, tugas kita adalah menemukannya",
    category: 'data-analysis'
  },
  {
    text: "Data tanpa visualisasi adalah seperti buku tanpa ilustrasi",
    category: 'data-analysis'
  },

  // Cute Messages (5)
  {
    text: "Coffee + Data = Magic",
    category: 'cute'
  },
  {
    text: "Terima kasih sudah mampir di portfolio ku!",
    category: 'cute'
  },
  {
    text: "Semoga harimu menyenangkan seperti menemukan insight baru!",
    category: 'cute'
  },
  {
    text: "Kamu luar biasa! Jangan lupa istirahat ya~",
    category: 'cute'
  },
  {
    text: "Keep scrolling, ada easter egg tersembunyi lho!",
    category: 'cute'
  },

  // Tech Humor (4)
  {
    text: "SELECT * FROM visitors WHERE vibe = 'awesome' -- That's you!",
    category: 'tech-humor'
  },
  {
    text: "In God we trust, all others must bring data",
    category: 'tech-humor'
  },
  {
    text: "99% of data scientists spend 80% of their time cleaning data",
    category: 'tech-humor'
  },
  {
    text: "Roses are red, violets are blue, unexpected 'NaN' on line 32",
    category: 'tech-humor'
  },
];

export default quotes;
