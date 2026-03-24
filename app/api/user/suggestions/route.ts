import { NextResponse } from "next/server";
import { z } from "zod";

import { generateSuggestionsWithAi } from "@/lib/ai";
import { limitSuggestionRequest } from "@/lib/rate-limit";
import { pickFallbackSuggestions } from "@/lib/suggestion-fallback";

const requestSchema = z.object({
  username: z.string().trim().min(1).max(40),
  draft: z.string().max(1000).optional().default("")
});

function getRequestIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "anonymous";
  }

  return request.headers.get("x-real-ip") ?? "anonymous";
}

export async function POST(request: Request) {
  const fallback = pickFallbackSuggestions();

  try {
    const body = await request.json();
    const { username, draft } = requestSchema.parse(body);

    const rateLimit = await limitSuggestionRequest(`suggestions:${getRequestIp(request)}`);

    if (!rateLimit.success) {
      return NextResponse.json({ suggestions: fallback });
    }

    const suggestions = await generateSuggestionsWithAi({ username, draft });

    return NextResponse.json({
      suggestions: suggestions ?? fallback
    });
  } catch {
    return NextResponse.json({
      suggestions: fallback
    });
  }
}
