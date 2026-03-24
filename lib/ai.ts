import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const suggestionSchema = z.object({
  suggestions: z.array(z.string().trim().min(1).max(160)).length(3)
});

const geminiApiKey = process.env.GEMINI_API_KEY;

const ai = geminiApiKey
  ? new GoogleGenAI({
      apiKey: geminiApiKey
    })
  : null;

function buildSuggestionPrompt({
  username,
  draft
}: {
  username: string;
  draft: string;
}) {
  const trimmedUsername = username.trim() || "this person";
  const trimmedDraft = draft.trim();

  return [
    "You generate anonymous feedback suggestions for a fun web app.",
    "Return exactly 3 short suggestions as JSON in this shape:",
    '{"suggestions":["...", "...", "..."]}',
    "Rules:",
    "- Each suggestion must be one sentence.",
    "- Each suggestion must read like a direct anonymous message someone would send to the recipient.",
    "- Prefer statements over questions.",
    "- Do not generate writing prompts or ask the sender what they think.",
    "- Keep them natural, casual, and human.",
    "- Avoid robotic motivational language.",
    "- Avoid harassment, sexual content, hate, self-harm, or illegal content.",
    "- Do not include numbering, markdown, or extra keys.",
    "- Keep each suggestion under 160 characters.",
    "- Good examples: \"You make people feel heard.\" \"You seem more confident lately.\"",
    "- Bad examples: \"What do you think I am good at?\" \"What is one thing I should improve?\"",
    trimmedDraft
      ? `The sender already typed this draft for @${trimmedUsername}: "${trimmedDraft}". Generate 3 suggestions that refine or continue that message while keeping it sendable as direct feedback.`
      : `No draft exists yet. Generate 3 generic anonymous feedback messages suitable for sending to @${trimmedUsername}.`
  ].join("\n");
}

export async function generateSuggestionsWithAi({
  username,
  draft
}: {
  username: string;
  draft: string;
}) {
  if (!ai) {
    return null;
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: buildSuggestionPrompt({
      username,
      draft: draft.slice(0, 280)
    })
  });

  const text = response.text?.trim();

  if (!text) {
    return null;
  }

  try {
    const parsed = JSON.parse(text) as unknown;
    return suggestionSchema.parse(parsed).suggestions;
  } catch {
    return null;
  }
}
