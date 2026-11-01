export interface CampaignConfig {
  id: "gone" | "wadada";
  name: string;
  candidateName: string;
  title: string;
  office: string;
  constituency: string;
  slogan: string;
  party: string;
  frameSrc: string;
  dimensions: { width: number; height: number };
  cutout: {
    top: string;
    left: string;
    right: string;
    bottom: string;
    widthPercent: number;
    heightPercent: number;
    borderRadius: string;
  };
  defaultLgas: string[];
}

export const CAMPAIGNS: Record<string, CampaignConfig> = {
  gone: {
    id: "gone",
    name: "G-ONE 2027",
    candidateName: "Prince Gowon Enenche (G-ONE)",
    title: "A Voice of Representation For The People",
    office: "House of Representatives",
    constituency: "Ankpa, Omala, Olamaboro Federal Constituency",
    slogan: "Progress - In God We Trust",
    party: "Social Democratic Party (SDP)",
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
    defaultLgas: ["Ankpa", "Omala", "Olamaboro"],
  },
  wadada: {
    id: "wadada",
    name: "Wadada 2027",
    candidateName: "Sen. Ahmed Aliyu Wadada",
    title: "Join the Winning Team",
    office: "Nasarawa State 2027",
    constituency: "Nasarawa State",
    slogan: "In God We Trust",
    party: "All Progressives Congress (APC) / Coalition",
    frameSrc: "/design_frame.png",
    dimensions: { width: 1080, height: 1080 },
    cutout: {
      top: "27%",
      left: "49%",
      right: "5%",
      bottom: "26%",
      widthPercent: 46.0,
      heightPercent: 47.0,
      borderRadius: "1.5rem",
    },
    defaultLgas: [
      "Akwanga",
      "Awe",
      "Doma",
      "Karu",
      "Keana",
      "Keffi",
      "Kokona",
      "Lafia",
      "Nasarawa",
      "Nasarawa Eggon",
      "Obi",
      "Toto",
      "Wamba",
    ],
  },
};

export interface Supporter {
  id: string;
  campaignId: "gone" | "wadada";
  name: string;
  lga: string;
  ward?: string;
  imageUrl: string;
  posterUrl?: string;
  createdAt: string;
}

export const INITIAL_SUPPORTERS: Supporter[] = [
  {
    id: "sup-1",
    campaignId: "gone",
    name: "Ibrahim Usman",
    lga: "Ankpa",
    ward: "Ankpa Township",
    imageUrl: "/poster_sample_gone.png",
    createdAt: "2026-11-01T12:30:00Z",
  },
  {
    id: "sup-2",
    campaignId: "gone",
    name: "Faith Ochanya",
    lga: "Olamaboro",
    ward: "Okpo Central",
    imageUrl: "/poster_sample_gone.png",
    createdAt: "2026-11-01T11:45:00Z",
  },
  {
    id: "sup-3",
    campaignId: "gone",
    name: "Salifu Mohammed",
    lga: "Omala",
    ward: "Abejukolo Ward",
    imageUrl: "/poster_sample_gone.png",
    createdAt: "2026-11-01T10:15:00Z",
  },
  {
    id: "sup-4",
    campaignId: "wadada",
    name: "Musa Al-Hassan",
    lga: "Lafia",
    ward: "Lafia Central",
    imageUrl: "/poster_sample.png",
    createdAt: "2026-11-01T09:20:00Z",
  },
  {
    id: "sup-5",
    campaignId: "wadada",
    name: "Amina Yusuf",
    lga: "Keffi",
    ward: "Keffi Town",
    imageUrl: "/poster_sample.png",
    createdAt: "2026-11-01T08:50:00Z",
  },
  {
    id: "sup-6",
    campaignId: "gone",
    name: "David Oche",
    lga: "Ankpa",
    ward: "Ojoku Ward",
    imageUrl: "/poster_sample_gone.png",
    createdAt: "2026-11-01T08:10:00Z",
  },
  {
    id: "sup-7",
    campaignId: "wadada",
    name: "Chukwudi Eze",
    lga: "Karu",
    ward: "Mararaba",
    imageUrl: "/poster_sample.png",
    createdAt: "2026-11-01T07:30:00Z",
  },
  {
    id: "sup-8",
    campaignId: "gone",
    name: "Grace Enenche",
    lga: "Olamaboro",
    ward: "Imane Ward",
    imageUrl: "/poster_sample_gone.png",
    createdAt: "2026-11-01T06:15:00Z",
  },
];

export const LGA_STATS = [
  { name: "Ankpa", count: 3420, constituency: "Ankpa/Omala/Olamaboro", state: "Kogi" },
  { name: "Omala", count: 2180, constituency: "Ankpa/Omala/Olamaboro", state: "Kogi" },
  { name: "Olamaboro", count: 2890, constituency: "Ankpa/Omala/Olamaboro", state: "Kogi" },
  { name: "Lafia", count: 5210, constituency: "Nasarawa South", state: "Nasarawa" },
  { name: "Keffi", count: 4120, constituency: "Nasarawa West", state: "Nasarawa" },
  { name: "Karu", count: 4890, constituency: "Nasarawa West", state: "Nasarawa" },
  { name: "Akwanga", count: 3150, constituency: "Nasarawa North", state: "Nasarawa" },
  { name: "Nasarawa", count: 3670, constituency: "Nasarawa West", state: "Nasarawa" },
  { name: "Doma", count: 2340, constituency: "Nasarawa South", state: "Nasarawa" },
];
