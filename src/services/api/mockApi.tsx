// Mock API functions with simulated delays
import { JSX } from "react";

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API error simulation (set to false to disable errors)
const SIMULATE_ERROR = false;
const ERROR_RATE = 0.1; // 10% chance of error

const shouldError = () => SIMULATE_ERROR && Math.random() < ERROR_RATE;

// Stats Cards API
export interface StatsCardData {
  title: string;
  iconBg: string;
  iconColor: string;
  icon: JSX.Element;
  value: string;
  subtitle: string;
  badgeText?: string;
  badgeBg?: string;
  badgeColor?: string;
}

export const fetchStatsCards = async (): Promise<StatsCardData[]> => {
  await delay(800);
  
  if (shouldError()) {
    throw new Error('Failed to fetch stats cards');
  }

  return [
    {
      title: "OUTREACHED",
      iconBg: "bg-[#E8F0FF]",
      iconColor: "text-[#3B82F6]",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      ),
      value: "1,240",
      subtitle: "Partners Contacted",
      badgeText: "+15%",
      badgeBg: "bg-[#E2F7E6]",
      badgeColor: "text-[#22C55E]"
    },
    {
      title: "ONBOARDED",
      iconBg: "bg-[#E2F7E6]",
      iconColor: "text-[#22C55E]",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      value: "85",
      subtitle: "Active in Program",
      badgeText: "+8%",
      badgeBg: "bg-[#E2F7E6]",
      badgeColor: "text-[#22C55E]"
    },
    {
      title: "AWAITING DELIVERABLES",
      iconBg: "bg-[#FEF3C7]",
      iconColor: "text-[#D97706]",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      value: "12",
      subtitle: "Pending Content"
    }
  ];
};

// Needs Approval API
export interface ApprovalRequest {
  id: number;
  name: string;
  action: string;
  time: string;
  initial: string;
}

export const fetchApprovalRequests = async (): Promise<ApprovalRequest[]> => {
  await delay(1000);
  
  if (shouldError()) {
    throw new Error('Failed to fetch approval requests');
  }

  return [
    {
      id: 1,
      name: "UrbanFit Life",
      action: "Approve Content",
      time: "2h ago",
      initial: "U"
    },
    {
      id: 2,
      name: "TechSavvy Mom",
      action: "Approve Commission",
      time: "5h ago",
      initial: "T"
    },
    {
      id: 3,
      name: "Daily Gadgets",
      action: "Validate Lead",
      time: "1d ago",
      initial: "D"
    },
    {
      id: 4,
      name: "Yoga with Jen",
      action: "Approve Invoice",
      time: "1d ago",
      initial: "Y"
    }
  ];
};

// Partner Funnel API
export interface PartnerFunnelData {
  categories: string[];
  values: number[];
  growthPercentage: string;
  growthDescription: string;
}

export const fetchPartnerFunnel = async (): Promise<PartnerFunnelData> => {
  await delay(1200);
  
  if (shouldError()) {
    throw new Error('Failed to fetch partner funnel data');
  }

  return {
    categories: ["TOTAL MARKET", "PROSPECTS", "LEADS", "SALES"],
    values: [142382, 87027, 48027, 32027],
    growthPercentage: "+37%",
    growthDescription: "6,653 growth in closed sales"
  };
};

// Payouts API
export interface PayoutsData {
  percentage: string;
  amount: string;
  chartData: {
    categories: string[];
    values: number[];
  };
}

export const fetchPayouts = async (): Promise<PayoutsData> => {
  await delay(900);
  
  if (shouldError()) {
    throw new Error('Failed to fetch payouts data');
  }

  return {
    percentage: "+350%",
    amount: "$2.5 m",
    chartData: {
      categories: ["01.23", "02.23", "03.23", "", "", "", "", "", "09.23"],
      values: [50, 70, 60, 80, 100, 70, 30, 120, 90]
    }
  };
};

// Program Growth API
export interface ProgramGrowthItem {
  name: string;
  count: number;
  width: string;
  color: string;
}

export interface ProgramGrowthData {
  application: {
    total: string;
    items: ProgramGrowthItem[];
  };
  product: {
    total: string;
    items: ProgramGrowthItem[];
  };
  campaign: {
    total: string;
    items: ProgramGrowthItem[];
  };
}

export const fetchProgramGrowth = async (): Promise<ProgramGrowthData> => {
  await delay(1100);
  
  if (shouldError()) {
    throw new Error('Failed to fetch program growth data');
  }

  return {
    application: {
      total: "+124",
      items: [
        { name: "Levanta", count: 45, width: "70%", color: "bg-[#1B1917]" },
        { name: "Impact", count: 32, width: "50%", color: "bg-[#A6A19F]" },
        { name: "Social Snowball", count: 28, width: "40%", color: "bg-[#D6D3D1]" },
        { name: "Shopify Collabs", count: 19, width: "30%", color: "bg-[#E4E4E4]" },
      ]
    },
    product: {
      total: "+86",
      items: [
        { name: "PartnerStack", count: 35, width: "65%", color: "bg-[#1B1917]" },
        { name: "Rider", count: 22, width: "45%", color: "bg-[#A6A19F]" },
        { name: "Everflow", count: 18, width: "35%", color: "bg-[#D6D3D1]" },
        { name: "TUNE", count: 11, width: "25%", color: "bg-[#E4E4E4]" },
      ]
    },
    campaign: {
      total: "+42",
      items: [
        { name: "Summer Sale", count: 18, width: "60%", color: "bg-[#1B1917]" },
        { name: "Black Friday", count: 12, width: "40%", color: "bg-[#A6A19F]" },
        { name: "Influencer", count: 8, width: "30%", color: "bg-[#D6D3D1]" },
        { name: "Email Blast", count: 4, width: "15%", color: "bg-[#E4E4E4]" },
      ]
    }
  };
};

// Chat Messages API
export interface ChatMessage {
  id: number;
  name: string;
  message: string;
  time: string;
  badge: string | null;
  image: string;
}

export const fetchChatMessages = async (): Promise<ChatMessage[]> => {
  await delay(700);
  
  if (shouldError()) {
    throw new Error('Failed to fetch chat messages');
  }

  return [
    {
      id: 1,
      name: "Sarah Jenkins",
      message: "The new assets for the campaign look amazing! Can we schedule a call to discuss the rollout?",
      time: "2m ago",
      badge: "2",
      image: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      id: 2,
      name: "Mike Ross",
      message: "Just sent over the revised agreement. Let me know if you need anything else modified.",
      time: "1h ago",
      badge: null,
      image: "https://i.pravatar.cc/150?u=mike"
    },
    {
      id: 3,
      name: "Elena Fisher",
      message: "I have some questions about the attribution window for the \"Summer Glow\" bundle.",
      time: "3h ago",
      badge: "5",
      image: "https://i.pravatar.cc/150?u=elena"
    },
    {
      id: 4,
      name: "David Kim",
      message: "The referral links are working perfectly now. Thanks for the quick fix on the tracking!",
      time: "5h ago",
      badge: "1",
      image: "https://i.pravatar.cc/150?u=david"
    },
    {
      id: 5,
      name: "Alex Morgan",
      message: "Can we push the meeting to next Tuesday?",
      time: "6h ago",
      badge: null,
      image: "https://i.pravatar.cc/150?u=alex"
    },
    {
      id: 6,
      name: "Jessica Lee",
      message: "Invoice #4022 has been paid. Thanks!",
      time: "1d ago",
      badge: "3",
      image: "https://i.pravatar.cc/150?u=jessica"
    }
  ];
};

// User Updates API
export interface UpdateItemData {
  initials?: string;
  name: string;
  description: string;
  bgColor?: string;
  avatarSrc?: string;
  avatarAlt?: string;
}

export const fetchUserUpdates = async (): Promise<UpdateItemData[]> => {
  await delay(600);
  
  if (shouldError()) {
    throw new Error('Failed to fetch user updates');
  }

  return [
    {
      initials: "CD",
      name: "CreativeDir",
      description: "04 Brand Assets are live ...",
      bgColor: "bg-[#06b6d4]",
    },
    {
      initials: "ED",
      name: "Editor",
      description: "First draft of the \"Unboxi...",
      bgColor: "bg-[#ef4444]",
    },
    {
      initials: "MB",
      name: "MediaBuyer",
      description: "ROAS is up 15% on the n...",
      bgColor: "bg-[#f97316]",
    },
    {
      name: "Sarah J.",
      description: "Veltro Inc. approved the n...",
      avatarSrc: "user-img-1.jpg",
      avatarAlt: "Sarah J.",
      initials: "SJ"
    },
    {
      initials: "MT",
      name: "MediaTeam",
      description: "Premium Inventory secured...",
      bgColor: "bg-[#dc2626]",
    },
    {
      name: "SocialBot",
      description: "Instagram engagement up...",
      avatarSrc: "user-img-2.jpg",
      avatarAlt: "SocialBot",
      initials: "SB"
    },
    {
      initials: "MT",
      name: "MediaTeam",
      description: "Premium Inventory secur...",
      bgColor: "bg-[#dc2626]",
    },
    {
      initials: "SB",
      name: "SocialBot",
      description: "Instagram engagement u...",
      bgColor: "bg-[#22c55e]",
    },
    {
      initials: "DS",
      name: "Designer",
      description: "New mockup ready for rev...",
      bgColor: "bg-purple-500",
    },
    {
      initials: "AN",
      name: "Analytics",
      description: "Weekly report generated...",
      bgColor: "bg-blue-600",
    }
  ];
};

