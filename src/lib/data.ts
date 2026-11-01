export interface CandidateInfo {
  name: string;
  moniker: string;
  office: string;
  constituency: string;
  state: string;
  party: string;
  partyFullName: string;
  slogan: string;
  subSlogan: string;
  origin: string;
  education: string;
  business: string;
  movementName: string;
  website: string;
  pillars: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const G_ONE_CANDIDATE: CandidateInfo = {
  name: "Prince Gowon Enenche",
  moniker: "G-ONE (G1)",
  office: "House of Representatives",
  constituency: "Ankpa, Omala, and Olamaboro Federal Constituency",
  state: "Kogi State",
  party: "SDP",
  partyFullName: "Social Democratic Party",
  slogan: "Progress · In God We Trust",
  subSlogan: "I Reserved For Him My Vote",
  origin: "Imane, Olamaboro Local Government Area, Kogi State",
  education: "B.Sc. Political Science, Kogi State University",
  business: "Chairman & CEO, G1 Group of Companies & G-One Luxury Homes",
  movementName: "The G-1 Movement",
  website: "https://g-1.com.ng",
  pillars: [
    {
      title: "Economic Empowerment & Tech Hubs",
      description:
        "Micro-grant schemes for SMEs, artisan tools empowerment, and establishing digital innovation bootcamps for youths across Ankpa, Omala, and Olamaboro.",
      icon: "Cpu",
    },
    {
      title: "Agrarian Revolution & Rural Roads",
      description:
        "Direct investment in connecting farming communities to commercial markets, providing subsidized inputs, and rehabilitating feeder roads to curb post-harvest losses.",
      icon: "Tractor",
    },
    {
      title: "Quality Education & Youth Capital",
      description:
        "Comprehensive scholarship schemes for tertiary students, renovation of primary and secondary schools, and vocational training centers.",
      icon: "GraduationCap",
    },
    {
      title: "Accessible Healthcare & Social Safety Nets",
      description:
        "Equipping primary healthcare centers, routine medical outreach programs, and welfare support for elderly, widows, and vulnerable households.",
      icon: "HeartPulse",
    },
  ],
};

export const FRAME_CONFIG = {
  frameSrc: "/gone_frame.png",
  dimensions: { width: 1024, height: 1024 },
  cutout: {
    top: "26.07%",
    left: "50.88%",
    right: "6.64%",
    bottom: "31.93%",
    widthPercent: 42.48,
    heightPercent: 42.0,
    borderRadius: "1.75rem",
  },
};

export interface LgaInfo {
  name: string;
  constituency: string;
  state: string;
  count: number;
  wards: string[];
}

export const CONSTITUENCY_LGAS: LgaInfo[] = [
  {
    name: "Ankpa",
    constituency: "Ankpa/Omala/Olamaboro",
    state: "Kogi",
    count: 0,
    wards: [
      "Ankpa Township",
      "Ankpa Suburb I",
      "Ankpa Suburb II",
      "Enjema I",
      "Enjema II",
      "Ojoku I",
      "Ojoku II",
      "Ojoku III",
      "Biraidu (Awo)",
      "Biraidu (Okaba)",
      "Biraidu (Inye)",
    ],
  },
  {
    name: "Omala",
    constituency: "Ankpa/Omala/Olamaboro",
    state: "Kogi",
    count: 0,
    wards: [
      "Abejukolo I",
      "Abejukolo II",
      "Bagana",
      "Bagaji",
      "Akpacha",
      "Ogodu",
      "Icheke",
      "Oji-Aji",
      "Olla",
      "Ife",
    ],
  },
  {
    name: "Olamaboro",
    constituency: "Ankpa/Omala/Olamaboro",
    state: "Kogi",
    count: 0,
    wards: [
      "Imane I",
      "Imane II",
      "Okpo",
      "Ogugu I",
      "Ogugu II",
      "Ogugu III",
      "Adeh",
      "Inele",
      "Ugo",
      "Ochadamu",
    ],
  },
];

export interface Supporter {
  id: string;
  name: string;
  lga: string;
  ward?: string;
  imageUrl: string;
  posterUrl?: string;
  createdAt: string;
}

export const INITIAL_SUPPORTERS: Supporter[] = [];
