export interface TeamMember {
  id: number;
  avatar: string;
  name: string;
  role: string;
  tagline: string;
  linkedinUrl: string | null;
  type: TeamMemberType,
  displayOrder: number;
  isVisible: boolean;
  talkAbout: string[];
}

export type TeamMemberType = "FOUNDER" | "HUMAN" | "AI_AGENT";
