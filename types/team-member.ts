export interface TeamMember {
  id: string;
  avatar: string;
  name: string;
  role: string;
  tagline: string;
  linkedin_url: string | null;
  type: TeamMemberType,
  display_order: number;
  is_visible: boolean;
  talk_about: string[];
}

export type TeamMemberType = "FOUNDER" | "HUMAN" | "AI_AGENT";
