import { IconType } from "react-icons";
import {
  FiGrid,
  FiCalendar,
  FiHome,
  FiSend,
  FiCompass,
  FiTag,
  FiMapPin,
  FiBookOpen,
  FiImage,
  FiMessageSquare,
  FiStar,
  FiHelpCircle,
  FiPercent,
  FiShield,
  FiUsers,
  FiLayers,
} from "react-icons/fi";

export interface NavItemConfig {
  label: string;
  href: string;
  icon: IconType;
  active: boolean;
}

export interface NavGroupConfig {
  title: string;
  items: NavItemConfig[];
}

export function getAdminNavGroups(pathname: string): NavGroupConfig[] {
  const isReviewsActive =
    pathname === "/admin/reviews" ||
    (pathname.startsWith("/admin/reviews/") &&
      !pathname.startsWith("/admin/reviews-project"));

  return [
    {
      title: "Overview",
      items: [
        {
          label: "Dashboard",
          href: "/admin/dashboard",
          icon: FiGrid,
          active: pathname === "/admin/dashboard",
        },
      ],
    },
    {
      title: "Reservations",
      items: [
        {
          label: "Tour Bookings",
          href: "/admin/bookings",
          icon: FiCalendar,
          active: pathname.startsWith("/admin/bookings"),
        },
        {
          label: "Hotel Bookings",
          href: "/admin/hotel-bookings",
          icon: FiHome,
          active: pathname.startsWith("/admin/hotel-bookings"),
        },
        {
          label: "Flight Bookings",
          href: "/admin/flight-bookings",
          icon: FiSend,
          active: pathname.startsWith("/admin/flight-bookings"),
        },
      ],
    },
    {
      title: "Tours & Content",
      items: [
        {
          label: "Trips & Excursions",
          href: "/admin/trips",
          icon: FiCompass,
          active: pathname.startsWith("/admin/trips"),
        },
        {
          label: "Private Services",
          href: "/admin/services",
          icon: FiLayers,
          active: pathname.startsWith("/admin/services"),
        },
        {
          label: "Trip Types",
          href: "/admin/trip-types",
          icon: FiTag,
          active: pathname.startsWith("/admin/trip-types"),
        },
        {
          label: "Destinations",
          href: "/admin/destinations",
          icon: FiMapPin,
          active: pathname.startsWith("/admin/destinations"),
        },
        {
          label: "Articles & Blogs",
          href: "/admin/blogs",
          icon: FiBookOpen,
          active: pathname.startsWith("/admin/blogs"),
        },
        {
          label: "Media Gallery",
          href: "/admin/gallery",
          icon: FiImage,
          active: pathname.startsWith("/admin/gallery"),
        },
        {
          label: "Team Members",
          href: "/admin/team-members",
          icon: FiUsers,
          active: pathname.startsWith("/admin/team-members"),
        },
      ],
    },
    {
      title: "Engagement",
      items: [
        {
          label: "Trip Reviews",
          href: "/admin/reviews",
          icon: FiMessageSquare,
          active: isReviewsActive,
        },
        {
          label: "Platform Reviews",
          href: "/admin/reviews-project",
          icon: FiStar,
          active: pathname.startsWith("/admin/reviews-project"),
        },
        {
          label: "FAQ / Questions",
          href: "/admin/faq",
          icon: FiHelpCircle,
          active: pathname.startsWith("/admin/faq"),
        },
        {
          label: "Promo Codes",
          href: "/admin/promo-codes",
          icon: FiPercent,
          active: pathname.startsWith("/admin/promo-codes"),
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          label: "Administrators",
          href: "/admin/admins",
          icon: FiShield,
          active: pathname.startsWith("/admin/admins"),
        },
      ],
    },
  ];
}
