import { IP } from "@/types";
import { headers } from "next/headers";

export async function getClientIp(): Promise<IP | "unknown"> {
  const headersList = await headers();

  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() as IP ?? "unknown";
  }

  return headersList.get("x-real-ip") as IP ?? "unknown";
}
