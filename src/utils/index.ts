import { ErrorType } from "@/types";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const isErrorType = (data: unknown): data is ErrorType => {
  return (
    !!data && typeof data === "object" && "code" in data && "message" in data
  );
};

export function tw(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
