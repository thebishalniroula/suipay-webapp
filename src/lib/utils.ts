import { MIST_PER_SUI } from "@mysten/sui/utils";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number) {
  const units = [
    { label: "year", seconds: 31556952 },
    { label: "month", seconds: 2629746 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const unit of units) {
    if (seconds >= unit.seconds) {
      const value = Math.floor(seconds / unit.seconds);
      return `${value} ${unit.label}${value > 1 ? "s" : ""}`;
    }
  }

  return "0 seconds";
}

export const mistToSui = (mist: number) => mist / Number(MIST_PER_SUI);

export const safeParseJSON = (data: string) => {
  try {
    const parsed = JSON.parse(data);
    return parsed;
  } catch (error) {
    console.log("Failed to parse JSON:", error);
    return null;
  }
};
