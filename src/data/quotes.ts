/**
 * Koleksi quotes untuk ditampilkan di Footer
 * Minimal 20 quotes dengan berbagai kategori
 */

export interface Quote {
  text: string;
  category: 'motivational' | 'data-analysis' | 'cute' | 'tech-humor';
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
    text: "Terus belajar, terus berkembang, terus berkarya! ✨",
    category: 'motivational'
  },

  // Data Analysis Fun Facts (6)
  {
    text: "Data is the new oil, tapi butuh analyst buat refine-nya!",
    category: 'data-analysis'
  },
  {
    text: "Behind every great decision, ada data yang di-analyze dengan teliti",
    category: 'data-analysis'
  },
  {
    text: "Statistik itu kayak bikini - yang terlihat menarik, tapi yang tersembunyi itu yang vital",
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
    text: "Coffee + Data = Magic ✨",
    category: 'cute'
  },
  {
    text: "Terima kasih sudah mampir di portfolio ku! 💖",
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
    text: "Keep scrolling, ada easter egg tersembunyi lho! 🐣",
    category: 'cute'
  },

  // Tech Humor (6)
  {
    text: "SELECT * FROM visitors WHERE vibe = 'awesome' -- That's you!",
    category: 'tech-humor'
  },
  {
    text: "Life is too short to use Excel for everything... but sometimes you have to",
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
  {
    text: "I don't always test my code, but when I do, I do it in production",
    category: 'tech-humor'
  },

  // Bonus quotes (2)
  {
    text: "Analyst mindset: Question everything, validate with data",
    category: 'data-analysis'
  },
  {
    text: "Error is just another way of saying 'opportunity to learn'",
    category: 'motivational'
  }
];

export default quotes;
