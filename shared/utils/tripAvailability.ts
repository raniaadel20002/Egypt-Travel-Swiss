const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DAY_NAME_TO_INDEX: Record<string, number> = {
  sunday: 0,
  sun: 0,
  "0": 0,
  monday: 1,
  mon: 1,
  "1": 1,
  tuesday: 2,
  tue: 2,
  "2": 2,
  wednesday: 3,
  wed: 3,
  "3": 3,
  thursday: 4,
  thu: 4,
  "4": 4,
  friday: 5,
  fri: 5,
  "5": 5,
  saturday: 6,
  sat: 6,
  "6": 6,
};

export function getTripAllowedDayNumbers(
  availableDays?: (string | number)[] | null
): number[] {
  if (!availableDays || !Array.isArray(availableDays) || availableDays.length === 0) {
    return [0, 1, 2, 3, 4, 5, 6];
  }

  const result = new Set<number>();

  for (const item of availableDays) {
    if (typeof item === "number") {
      if (item >= 0 && item <= 6) result.add(item);
    } else if (typeof item === "string") {
      const trimmed = item.trim().toLowerCase();
      if (trimmed in DAY_NAME_TO_INDEX) {
        result.add(DAY_NAME_TO_INDEX[trimmed]);
      } else {
        const parsed = parseInt(trimmed, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 6) {
          result.add(parsed);
        }
      }
    }
  }

  if (result.size === 0 || result.size === 7) {
    return [0, 1, 2, 3, 4, 5, 6];
  }

  return Array.from(result).sort((a, b) => a - b);
}

export function isDateAvailableForTrip(
  dateStr: string,
  availableDays?: (string | number)[] | null
): boolean {
  if (!dateStr) return false;

  const allowed = getTripAllowedDayNumbers(availableDays);
  if (allowed.length === 7) return true;

  const parts = dateStr.split("-").map(Number);
  if (parts.length < 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    return false;
  }

  const [year, month, day] = parts;
  const targetDate = new Date(year, month - 1, day);
  const dayIndex = targetDate.getDay();

  return allowed.includes(dayIndex);
}

export function getAvailableDaysText(
  availableDays?: (string | number)[] | null
): string {
  const allowed = getTripAllowedDayNumbers(availableDays);
  if (allowed.length === 7) return "Daily";
  return allowed.map((d) => DAY_NAMES[d]).join(", ");
}

export function getDayNameForDate(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-").map(Number);
  if (parts.length < 3) return "";
  const targetDate = new Date(parts[0], parts[1] - 1, parts[2]);
  return DAY_NAMES[targetDate.getDay()] || "";
}

export function getNextAvailableDate(
  fromDate: Date = new Date(),
  availableDays?: (string | number)[] | null
): string {
  const allowed = getTripAllowedDayNumbers(availableDays);

  const check = new Date(fromDate);
  check.setDate(check.getDate() + 1);

  if (allowed.length === 7) {
    return check.toISOString().split("T")[0];
  }

  for (let i = 0; i < 14; i++) {
    if (allowed.includes(check.getDay())) {
      return check.toISOString().split("T")[0];
    }
    check.setDate(check.getDate() + 1);
  }

  return check.toISOString().split("T")[0];
}
