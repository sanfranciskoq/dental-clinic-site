import type { TeamMember } from "@/types/team";

export const teamMembers: TeamMember[] = [
  {
    slug: "dr-sarah-chen",
    name: "Dr. Sarah Chen",
    title: "Lead Dentist & Founder",
    specialties: ["Cosmetic Dentistry", "Implants", "Invisalign"],
    languages: ["English", "Mandarin"],
    bio: "Dr. Chen founded Bright Smile Dental in 2010 with a mission to make high-quality dentistry feel personal and approachable. She combines advanced digital dentistry with a calm, patient-first chairside manner.",
    education: [
      "DDS, University of Texas School of Dentistry",
      "Advanced training in implantology, Spear Education",
    ],
    affiliations: ["American Dental Association", "Academy of General Dentistry"],
    personalNote:
      "I became a dentist after seeing how a confident smile changed my best friend's life. That moment still drives everything we do here.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
  },
  {
    slug: "dr-marcus-reed",
    name: "Dr. Marcus Reed",
    title: "Associate Dentist",
    specialties: ["Emergency Care", "Restorative Dentistry", "Pediatric"],
    languages: ["English", "Spanish"],
    bio: "Dr. Reed is known for his steady hand during emergencies and his ability to put nervous patients at ease. He treats patients of all ages and has a special talent for explaining procedures in plain language.",
    education: [
      "DDS, Baylor College of Dentistry",
      "Pediatric dentistry rotation, Children's Medical Center Dallas",
    ],
    affiliations: ["Texas Dental Association", "American Academy of Pediatric Dentistry"],
    personalNote:
      "Kids teach you patience. Adults teach you trust. I try to earn both every single day.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
  },
  {
    slug: "jennifer-morales",
    name: "Jennifer Morales, RDH",
    title: "Lead Dental Hygienist",
    specialties: ["Preventive Care", "Periodontal Therapy"],
    languages: ["English", "Spanish"],
    bio: "Jennifer has been with Bright Smile for eight years. Patients love her thorough yet gentle cleanings and the practical tips she shares for maintaining oral health between visits.",
    education: ["BS Dental Hygiene, Texas Woman's University"],
    affiliations: ["American Dental Hygienists' Association"],
    personalNote:
      "Prevention is the best treatment. My goal is to help you need fewer interventions over your lifetime.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face",
  },
  {
    slug: "amy-park",
    name: "Amy Park",
    title: "Office Manager & Patient Coordinator",
    specialties: ["Insurance Navigation", "Scheduling"],
    languages: ["English", "Korean"],
    bio: "Amy is your go-to for insurance questions, payment plans, and finding appointment times that fit your schedule. She makes the administrative side of dentistry painless.",
    education: ["BA Healthcare Administration, UT Austin"],
    affiliations: [],
    personalNote:
      "Nobody should avoid the dentist because of paperwork confusion. I'm here to fix that.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
  },
];

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((m) => m.slug === slug);
}

export const dentists = teamMembers.filter((m) => m.title.includes("Dentist"));
