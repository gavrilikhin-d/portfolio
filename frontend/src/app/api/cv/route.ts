import { cvDownloadName } from "@/components/sections/experience/experience-data";
import { fetchCvContent } from "@/lib/cv";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const download = new URL(request.url).searchParams.get("download") === "1";

  try {
    const cv = await fetchCvContent();
    const headers = new Headers({
      "Content-Type": "application/pdf",
      "Content-Disposition": download
        ? `attachment; filename="${cvDownloadName}"`
        : "inline",
      "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
    });

    if (cv.etag) {
      headers.set("ETag", cv.etag);
    }

    if (cv.lastModified) {
      headers.set("Last-Modified", cv.lastModified.toUTCString());
    }

    const body = new Uint8Array(cv.body);

    return new Response(body, { headers });
  } catch {
    return new Response("CV unavailable.", { status: 503 });
  }
}
