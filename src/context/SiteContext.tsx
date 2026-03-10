import React, { createContext, useContext, useState, useEffect } from "react";

export type Game = {
  id: string;
  name: string;
  status: "Supported" | "Coming Soon";
  description: string;
  imageUrl: string;
  productLink?: string;
};

export type Review = {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
};

export type Product = {
  id: string;
  name: string;
  game: string;
  cheatType: string;
  description: string;
  features: string[];
  price: string;
  image: string;
  developerId: string;
  reviews: Review[];
};

export type Developer = {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  joinedDate: string;
};

export type Testimonial = {
  id: string;
  author: string;
  initial: string;
  colorClass: string;
  text: string;
  rating: number;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category?: string;
};

export type StatusItem = {
  id: string;
  game: string;
  tool: string;
  status: "online" | "updating" | "maintenance";
  lastUpdated: string;
  updatedAt?: string;
  version: string;
};

export type FeatureCard = {
  id: string;
  icon: string; // We'll store the lucide icon name
  title: string;
  description: string;
  colorClass: string;
};

export type SiteData = {
  siteName: string;
  heroTitle: string;
  heroSubtitle: string;
  paymentInstructions: string;
  discordLink: string;
  twitterLink: string;
  facebookLink: string;
  supportTicketLink: string;
  aboutUsTitle: string;
  aboutUsContent: string;
  shopTitle: string;
  shopSubtitle: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
  featureCards: FeatureCard[];
  games: Game[];
  products: Product[];
  developers: Developer[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  statuses: StatusItem[];
};

const defaultData: SiteData = {
  siteName: "Itz Easy",
  heroTitle: "Premium Aimbot Cheats and Spoofers",
  heroSubtitle: "High-performance cheating software. We offer advanced aimbots, triggerbots, and HWID spoofers. Just pure, undetectable performance.",
  paymentInstructions: "Please send the exact amount in Crypto to the address below, then open a ticket in our Discord with your transaction ID to receive your license key.",
  discordLink: "https://discord.gg/example",
  twitterLink: "https://twitter.com/example",
  facebookLink: "https://facebook.com/example",
  supportTicketLink: "https://example.com/support",
  aboutUsTitle: "About Itz Easy",
  aboutUsContent: "We are a dedicated team of developers focused on pushing the boundaries of computer vision. Our mission is to provide the most advanced, secure, and undetectable tools for gamers worldwide. We believe in pure performance without compromising your account's safety.",
  shopTitle: "Store",
  shopSubtitle: "Browse our selection of premium gaming cheats.",
  dashboardTitle: "User Dashboard",
  dashboardSubtitle: "Manage your licenses, downloads, and account settings.",
  featureCards: [
    {
      id: "feat-1",
      icon: "Crosshair",
      title: "Precision Aiming",
      description: "Advanced algorithms for pixel-perfect accuracy.",
      colorClass: "neon-cyan"
    },
    {
      id: "feat-2",
      icon: "Shield",
      title: "Undetected",
      description: "Built with security in mind to keep your accounts safe.",
      colorClass: "neon-purple"
    },
    {
      id: "feat-3",
      icon: "Zap",
      title: "Instant Delivery",
      description: "Get your license key immediately after purchase.",
      colorClass: "neon-blue"
    }
  ],
  games: [
    {
      id: "roblox",
      name: "Roblox",
      status: "Supported",
      description: "Full suite of aimbot and triggerbot features available.",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
      productLink: "/product/roblox-aim"
    },
    {
      id: "cs",
      name: "CS",
      status: "Coming Soon",
      description: "In development. Pure vision-based aimbot. Expected release next month.",
      imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "rust",
      name: "Rust",
      status: "Coming Soon",
      description: "Currently in private beta testing phase. Recoil control and triggerbot.",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"
    }
  ],
  products: [
    {
      id: "roblox-aim",
      name: "Itz Easy for Roblox",
      game: "Roblox",
      cheatType: "Full Suite",
      description: "Advanced aimbot and triggerbot for Roblox.",
      features: ["Aimbot (Customizable FOV & Smoothness)", "Color-based Triggerbot", "Humanized Recoil Control", "Stream Proof (OBS Bypass)", "Auto-Update System", "Undetected Injection"],
      price: "From $4.99",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
      developerId: "dev-1",
      reviews: [
        { id: "r1", userId: "u1", userName: "ToxicPlayer99", rating: 5, comment: "Best aimbot out there.", date: "2023-10-01" }
      ]
    },
    {
      id: "roblox-lite",
      name: "Itz Easy Lite",
      game: "Roblox",
      cheatType: "Triggerbot",
      description: "Lightweight triggerbot for instant reactions. Pure pixel-scanning.",
      features: ["Color Triggerbot", "Flick Bot", "Humanized Smoothing", "Low Resource Usage"],
      price: "From $2.99",
      image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800&auto=format&fit=crop",
      developerId: "dev-1",
      reviews: []
    },
    {
      id: "hwid-spoofer",
      name: "Itz Easy Spoofer",
      game: "All Games",
      cheatType: "Spoofer",
      description: "Undetectable HWID spoofer to bypass hardware bans. Works for all major anti-cheats.",
      features: ["Kernel Level", "One-Click Spoof", "No Format Required", "EAC/BE Support"],
      price: "From $19.99",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
      developerId: "dev-2",
      reviews: [
        { id: "r2", userId: "u2", userName: "AimGod_x", rating: 5, comment: "Saved my account.", date: "2023-10-05" }
      ]
    }
  ],
  developers: [
    {
      id: "dev-1",
      name: "Itz Easy Dev Team",
      bio: "Creators of the best premium aimbots.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ItzEasy",
      joinedDate: "2023-01-01"
    },
    {
      id: "dev-2",
      name: "SpoofMaster",
      bio: "Specializing in kernel-level HWID spoofers.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SpoofMaster",
      joinedDate: "2023-05-15"
    }
  ],
  testimonials: [
    {
      id: "t1",
      author: "ToxicPlayer99",
      initial: "T",
      colorClass: "neon-cyan",
      text: "Absolutely incredible cheat. The triggerbot is flawless and the aimbot is highly customizable. Never been detected.",
      rating: 5
    },
    {
      id: "t2",
      author: "AimGod_x",
      initial: "A",
      colorClass: "neon-purple",
      text: "Support team is amazing. Had an issue with my HWID and they reset it within 5 minutes on Discord. 10/10 service.",
      rating: 5
    },
    {
      id: "t3",
      author: "SilentSniper",
      initial: "S",
      colorClass: "neon-blue",
      text: "The cleanest UI I've ever seen for a cheat like this. Easy to inject, no crashes, and works perfectly on Windows 11.",
      rating: 5
    }
  ],
  faqs: [
    {
      id: "f1",
      question: "How do I install the software?",
      answer: "After purchasing, go to your dashboard, complete the verification step, and download the loader. Run the loader as administrator, enter your license key, and launch the game.",
      category: "Installation"
    },
    {
      id: "f2",
      question: "Is it safe to use on my main account?",
      answer: "While our cheats are designed to be undetected and stream-proof, we always recommend using an alternate account to ensure the absolute safety of your main account.",
      category: "Safety"
    },
    {
      id: "f3",
      question: "How do I reset my HWID?",
      answer: "You can reset your Hardware ID directly from your dashboard once every 7 days. If you need an immediate reset, please open a support ticket.",
      category: "Account"
    },
    {
      id: "f4",
      question: "Do you offer refunds?",
      answer: "Due to the digital nature of our products, we do not offer refunds once a license key has been activated. Please read our terms of service for more details.",
      category: "Billing"
    }
  ],
  statuses: [
    {
      id: "s1",
      game: "Roblox",
      tool: "Itz Easy for Roblox",
      status: "online",
      lastUpdated: "2 hours ago",
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString(),
      version: "v2.4.1"
    },
    {
      id: "s2",
      game: "Roblox",
      tool: "Itz Easy Lite",
      status: "online",
      lastUpdated: "1 day ago",
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString(),
      version: "v1.2.0"
    },
    {
      id: "s3",
      game: "CS",
      tool: "Itz Easy for CS",
      status: "maintenance",
      lastUpdated: "3 days ago",
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleString(),
      version: "Beta 0.9"
    },
    {
      id: "s4",
      game: "Rust",
      tool: "Itz Easy for Rust",
      status: "updating",
      lastUpdated: "Just now",
      updatedAt: new Date().toLocaleString(),
      version: "v3.0.0"
    }
  ]
};

type SiteContextType = {
  data: SiteData;
  updateData: (newData: Partial<SiteData>) => void;
};

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(() => {
    const saved = localStorage.getItem("siteData");
    if (saved) {
      try {
        return { ...defaultData, ...JSON.parse(saved) };
      } catch (e) {
        return defaultData;
      }
    }
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem("siteData", JSON.stringify(data));
  }, [data]);

  const updateData = (newData: Partial<SiteData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <SiteContext.Provider value={{ data, updateData }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error("useSiteData must be used within a SiteProvider");
  }
  return context;
}
