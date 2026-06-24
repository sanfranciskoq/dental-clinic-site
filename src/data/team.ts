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
  {
    slug: "dr-priya-patel",
    name: "Dr. Priya Patel",
    title: "Endodontist",
    specialties: ["Root Canal Therapy", "Microsurgery", "Pain Management"],
    languages: ["English", "Hindi", "Gujarati"],
    bio: "Dr. Patel specializes in saving natural teeth through precision endodontics. She uses operating microscopes and 3D imaging to treat complex cases with minimal discomfort.",
    education: [
      "DDS, UCLA School of Dentistry",
      "Certificate in Endodontics, University of Pennsylvania",
    ],
    affiliations: ["American Association of Endodontists"],
    personalNote:
      "Nothing beats keeping your natural tooth. That's why I love what I do.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
  },
  {
    slug: "dr-elena-vasquez",
    name: "Dr. Elena Vasquez",
    title: "Orthodontist",
    specialties: ["Invisalign", "Braces", "Early Orthodontics"],
    languages: ["English", "Spanish"],
    bio: "Dr. Vasquez creates confident smiles for teens and adults. She partners closely with our general dentists to coordinate Invisalign and traditional orthodontic care in-house.",
    education: [
      "DDS, University of Michigan School of Dentistry",
      "MS Orthodontics, Baylor College of Dentistry",
    ],
    affiliations: ["American Association of Orthodontists"],
    personalNote:
      "Straight teeth change more than your smile — they change how you carry yourself.",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&crop=face",
  },
  {
    slug: "taylor-brooks",
    name: "Taylor Brooks, RDA",
    title: "Lead Dental Assistant",
    specialties: ["Chairside Assisting", "Digital Scanning", "Patient Comfort"],
    languages: ["English"],
    bio: "Taylor keeps procedures running smoothly chairside and helps anxious patients feel at ease. Patients often mention his calm presence during longer treatments.",
    education: ["Registered Dental Assistant Certification, Austin Community College"],
    affiliations: ["Texas Dental Assistants Association"],
    personalNote:
      "If you're nervous, tell me — we'll go at your pace. No surprises.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
  },
  {
    slug: "rachel-nguyen",
    name: "Rachel Nguyen",
    title: "Treatment Coordinator",
    specialties: ["Treatment Planning", "Insurance Estimates", "Financing"],
    languages: ["English", "Vietnamese"],
    bio: "Rachel walks you through treatment plans, insurance breakdowns, and payment options before you commit. She makes complex dentistry feel straightforward.",
    education: ["BS Health Sciences, Texas State University"],
    affiliations: [],
    personalNote:
      "Understanding your options shouldn't require a finance degree. I'm here to translate.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  },
];

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((m) => m.slug === slug);
}

export const dentists = teamMembers.filter((m) => m.title.includes("Dentist"));
