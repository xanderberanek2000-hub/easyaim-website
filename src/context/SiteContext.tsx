import React, { createContext, useContext, useState, useEffect } from "react";

export type Game = {
  id: string;
  name: string;
  status: "Supported" | "Coming Soon";
  description: string;
  imageUrl: string;
  productLink?: string;
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
  games: Game[];
  products: Product[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  statuses: StatusItem[];
};

const defaultData: SiteData = {
  siteName: "EasyAim",
  heroTitle: "AI-Powered Aimbots & Triggerbots",
  heroSubtitle: "Pure AI-driven cheating software. We offer advanced aimbots and triggerbots. Just pure, undetectable AI performance.",
  paymentInstructions: "Please send the exact amount in Crypto to the address below, then open a ticket in our Discord with your transaction ID to receive your license key.",
  discordLink: "https://discord.gg/example",
  twitterLink: "https://twitter.com/example",
  facebookLink: "https://facebook.com/example",
  supportTicketLink: "https://example.com/support",
  aboutUsTitle: "About EasyAim",
  aboutUsContent: "We are a dedicated team of AI researchers and developers focused on pushing the boundaries of computer vision. Our mission is to provide the most advanced, secure, and undetectable AI-assisted tools for gamers worldwide. We believe in pure performance without compromising your account's safety.",
  games: [
    {
      id: "roblox",
      name: "Roblox",
      status: "Supported",
      description: "Full suite of AI aimbot and triggerbot features available.",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
      productLink: "/product/roblox-aim"
    },
    {
      id: "cs",
      name: "CS",
      status: "Coming Soon",
      description: "In development. Pure AI vision-based aimbot. Expected release next month.",
      imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "rust",
      name: "Rust",
      status: "Coming Soon",
      description: "Currently in private beta testing phase. AI recoil control and triggerbot.",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"
    }
  ],
  products: [
    {
      id: "roblox-aim",
      name: "EasyAim for Roblox",
      game: "Roblox",
      cheatType: "Full Suite",
      description: "Advanced AI aimbot and triggerbot for Roblox.",
      features: ["AI Aimbot (Customizable FOV & Smoothness)", "Color-based Triggerbot", "Humanized Recoil Control", "Stream Proof (OBS Bypass)", "Auto-Update System", "Undetected Injection"],
      price: "From $4.99",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "roblox-lite",
      name: "EasyAim Lite",
      game: "Roblox",
      cheatType: "Triggerbot",
      description: "Lightweight triggerbot for instant reactions. Pure pixel-scanning.",
      features: ["Color Triggerbot", "Flick Bot", "Humanized Smoothing", "Low Resource Usage"],
      price: "From $2.99",
      image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=800&auto=format&fit=crop"
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
      tool: "EasyAim for Roblox",
      status: "online",
      lastUpdated: "2 hours ago",
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString(),
      version: "v2.4.1"
    },
    {
      id: "s2",
      game: "Roblox",
      tool: "EasyAim Lite",
      status: "online",
      lastUpdated: "1 day ago",
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString(),
      version: "v1.2.0"
    },
    {
      id: "s3",
      game: "CS",
      tool: "EasyAim for CS",
      status: "maintenance",
      lastUpdated: "3 days ago",
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleString(),
      version: "Beta 0.9"
    },
    {
      id: "s4",
      game: "Rust",
      tool: "EasyAim for Rust",
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
