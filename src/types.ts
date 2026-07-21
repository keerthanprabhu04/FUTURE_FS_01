export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  codeUrl?: string;
  category: "Full Stack" | "Frontend" | "Backend" | "AI/Data";
  highlights?: string[];
  role?: string;
  challenges?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0-100 for progress percentage
  iconName: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
  tags: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  description: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "unread" | "read";
}
