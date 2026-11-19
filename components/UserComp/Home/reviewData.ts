export interface SubReview {
  id: string;
  rating: number;
  title: string;
  text: string;
  author: string;
  initials: string;
  avatarBg: string;
}

export interface ReviewSlide {
  featured: {
    quote: string;
    author: string;
    initials: string;
  };
  cards: [SubReview, SubReview];
}

export const REVIEW_SLIDES: ReviewSlide[] = [
  {
    featured: {
      quote:
        "Diving at Ras Mohammed with our guide was the best day of our entire trip. Every detail, from pickup to the reef briefing, felt personal and perfectly planned.",
      author: "Sarah Mitchell",
      initials: "SM",
    },
    cards: [
      {
        id: "r1",
        rating: 5,
        title: "History came alive",
        text: "Our Egyptologist made the Valley of the Kings unforgettable. Smooth transfers and great hotels throughout.",
        author: "Ahmed Karim",
        initials: "AK",
        avatarBg: "bg-[#708A93]",
      },
      {
        id: "r2",
        rating: 5,
        title: "Sunset I'll never forget",
        text: "The quad ride and Bedouin dinner were pure magic. Our family of five had the time of our lives.",
        author: "Lena Weber",
        initials: "LW",
        avatarBg: "bg-[#D8A33A]",
      },
    ],
  },
  {
    featured: {
      quote:
        "Cruising the Nile at sunset was completely magical. The luxury boat, personalized guided tours in Luxor and Aswan exceeded all our expectations.",
      author: "Michael Davies",
      initials: "MD",
    },
    cards: [
      {
        id: "r3",
        rating: 5,
        title: "Flawless airport pickup",
        text: "Our driver was waiting right at terminal exit in Cairo with cool bottled water and AC vehicle. Zero stress.",
        author: "Claire Dupont",
        initials: "CD",
        avatarBg: "bg-[#013E51]",
      },
      {
        id: "r4",
        rating: 5,
        title: "World-class dive instructors",
        text: "Completed my PADI Open Water in Hurghada. Calm reefs, professional gear, and unforgettable coral life.",
        author: "Jonas Richter",
        initials: "JR",
        avatarBg: "bg-[#708A93]",
      },
    ],
  },
  {
    featured: {
      quote:
        "From our first flight inquiry to the private tour of the Grand Egyptian Museum, every step was handled with genuine warmth and precision.",
      author: "Elena Rostova",
      initials: "ER",
    },
    cards: [
      {
        id: "r5",
        rating: 5,
        title: "Spectacular desert safari",
        text: "Stargazing in the White Desert under millions of stars was surreal. Safe, well-equipped, and delicious meals.",
        author: "Tariq Mansoor",
        initials: "TM",
        avatarBg: "bg-[#D8A33A]",
      },
      {
        id: "r6",
        rating: 5,
        title: "Hand-picked luxury resort",
        text: "The boutique hotel in El Gouna recommended by Egypt Dreams was pristine with exceptional beachfront views.",
        author: "Hannah Schmidt",
        initials: "HS",
        avatarBg: "bg-[#013E51]",
      },
    ],
  },
  {
    featured: {
      quote:
        "An unforgettable family vacation. The customized pace for our kids at the Giza Pyramids and Karnak Temple made history feel like an adventure.",
      author: "David & Chloe Evans",
      initials: "DE",
    },
    cards: [
      {
        id: "r7",
        rating: 5,
        title: "Five-star concierge care",
        text: "Whenever we needed a dinner booking or excursion change, our dedicated concierge responded within minutes.",
        author: "Fatima Al-Hassan",
        initials: "FA",
        avatarBg: "bg-[#708A93]",
      },
      {
        id: "r8",
        rating: 5,
        title: "Breathtaking Red Sea cruise",
        text: "Swimming alongside wild dolphins in Marsa Alam was a dream come true. Highly recommended team!",
        author: "Markus Lindner",
        initials: "ML",
        avatarBg: "bg-[#D8A33A]",
      },
    ],
  },
];
