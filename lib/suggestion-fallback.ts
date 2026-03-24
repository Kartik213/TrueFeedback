export const fallbackSuggestions = [
  "You make people feel comfortable faster than you probably realize.",
  "You come across as thoughtful even in small interactions.",
  "You have a calm presence that people notice.",
  "You are more capable than you give yourself credit for.",
  "You have a way of making people feel included.",
  "You seem stronger than you think when things get difficult.",
  "Your energy feels genuine and easy to trust.",
  "You leave a better impression on people than you probably expect.",
  "You are easy to talk to, and that is rarer than it should be.",
  "You have a natural warmth that stands out.",
  "You should trust your instincts more because they seem solid.",
  "You are doing better than you think you are.",
  "You make things feel lighter just by being around.",
  "You have a quietly confident vibe that works in your favor.",
  "You have a lot more presence than you might notice yourself."
];

export function pickFallbackSuggestions(count = 3) {
  return [...fallbackSuggestions].sort(() => Math.random() - 0.5).slice(0, count);
}
