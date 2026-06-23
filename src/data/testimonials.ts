export interface Testimonial {
  id: string;
  name: string;
  treatment: string;
  rating: number;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Maria G.",
    treatment: "Invisalign",
    rating: 5,
    quote:
      "I was terrified of dentists for years. Dr. Chen and her team made me feel heard and never rushed. My Invisalign results exceeded what I imagined.",
  },
  {
    id: "2",
    name: "James T.",
    treatment: "Emergency visit",
    rating: 5,
    quote:
      "Called with a cracked tooth at 4 PM and they got me in same day. Clear explanation, fair pricing, and zero judgment. This is my dentist now.",
  },
  {
    id: "3",
    name: "Linda & Noah P.",
    treatment: "Pediatric first visit",
    rating: 5,
    quote:
      "Our 4-year-old actually asked when we can go back. Dr. Reed was patient, playful, and made the whole family comfortable.",
  },
  {
    id: "4",
    name: "Robert K.",
    treatment: "Dental implant",
    rating: 5,
    quote:
      "The 3D planning gave me confidence before we started. The implant feels like my real tooth. Worth every penny.",
  },
  {
    id: "5",
    name: "Priya S.",
    treatment: "Whitening & cleaning",
    rating: 5,
    quote:
      "Jennifer's cleaning was the most thorough I've had, and the whitening was dramatic without sensitivity. Highly recommend.",
  },
  {
    id: "6",
    name: "David M.",
    treatment: "New patient exam",
    rating: 5,
    quote:
      "Amy walked me through insurance before my visit so there were no surprises. Transparent, modern office — exactly what I wanted.",
  },
];
