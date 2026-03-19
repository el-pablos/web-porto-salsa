/**
 * Achievement Badges Data
 * Sistem gamification untuk portfolio
 */

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji
  category: 'explorer' | 'interaction' | 'secret' | 'engagement';
  isSecret: boolean;
}

export interface AchievementState {
  badges: string[]; // unlocked badge ids
  stats: {
    totalClicks: number;
    sectionsVisited: string[];
    eggsCollected: number;
    chickenClicks: number;
    projectsHovered: string[];
    skillsHovered: string[];
    contactClicked: boolean;
    confettiTriggered: boolean;
    scrolledToFooter: boolean;
    pageLoadTime: number | null;
  };
  firstVisit: string; // ISO date
}

export const badges: Badge[] = [
  // Explorer Category
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Pertama kali mengunjungi portfolio',
    icon: '👣',
    category: 'explorer',
    isSecret: false,
  },
  {
    id: 'section-hopper',
    name: 'Section Hopper',
    description: 'Mengunjungi semua 6 section',
    icon: '🦘',
    category: 'explorer',
    isSecret: false,
  },
  {
    id: 'deep-diver',
    name: 'Deep Diver',
    description: 'Scroll sampai footer',
    icon: '🤿',
    category: 'explorer',
    isSecret: false,
  },

  // Interaction Category
  {
    id: 'clicker',
    name: 'Clicker',
    description: 'Klik 10 kali di mana saja',
    icon: '🖱️',
    category: 'interaction',
    isSecret: false,
  },
  {
    id: 'chicken-friend',
    name: 'Chicken Friend',
    description: 'Klik ayam 5 kali',
    icon: '🐔',
    category: 'interaction',
    isSecret: false,
  },
  {
    id: 'egg-hunter',
    name: 'Egg Hunter',
    description: 'Kumpulkan 5 telur dari ayam',
    icon: '🥚',
    category: 'interaction',
    isSecret: false,
  },

  // Secret Category
  {
    id: 'party-starter',
    name: 'Party Starter',
    description: 'Trigger confetti easter egg',
    icon: '🎉',
    category: 'secret',
    isSecret: true,
  },
  {
    id: 'night-explorer',
    name: 'Night Explorer',
    description: 'Kunjungi website jam 00:00 - 04:00',
    icon: '🦉',
    category: 'secret',
    isSecret: true,
  },
  {
    id: 'speed-reader',
    name: 'Speed Reader',
    description: 'Scroll ke footer dalam 30 detik',
    icon: '⚡',
    category: 'secret',
    isSecret: true,
  },

  // Engagement Category
  {
    id: 'connector',
    name: 'Connector',
    description: 'Klik link contact (email/social)',
    icon: '🔗',
    category: 'engagement',
    isSecret: false,
  },
  {
    id: 'project-enthusiast',
    name: 'Project Enthusiast',
    description: 'Hover semua project cards',
    icon: '💼',
    category: 'engagement',
    isSecret: false,
  },
  {
    id: 'skill-checker',
    name: 'Skill Checker',
    description: 'Hover semua skill items',
    icon: '📊',
    category: 'engagement',
    isSecret: false,
  },
];

export const initialAchievementState: AchievementState = {
  badges: [],
  stats: {
    totalClicks: 0,
    sectionsVisited: [],
    eggsCollected: 0,
    chickenClicks: 0,
    projectsHovered: [],
    skillsHovered: [],
    contactClicked: false,
    confettiTriggered: false,
    scrolledToFooter: false,
    pageLoadTime: null,
  },
  firstVisit: new Date().toISOString(),
};

export default badges;
