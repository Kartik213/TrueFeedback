import { NextResponse } from "next/server";

const messages = [
  "Believe in yourself and all that you are. You are capable of achieving incredible things.",
  "Stay positive and keep moving forward, even when faced with challenges.",
  "You possess immense strength and determination. Embrace your power and conquer your goals.",
  "Embrace the journey and trust the process. Every step you take brings you closer to your dreams.",
  "Be kind to yourself and others. Your compassion and empathy make the world a better place.",
  "Every day is a new beginning, filled with endless opportunities for growth.",
  "Let your light shine bright, illuminating the path for others.",
  "Chase your dreams with unwavering determination, knowing that you have the power to make them a reality.",
  "Find joy in the little things, for they are often the source of life's greatest happiness.",
  "Live with purpose and passion, pursuing your goals with enthusiasm.",
  "Your potential is limitless. Believe in yourself and unleash your boundless creativity.",
  "Spread love and kindness wherever you go, for it is the greatest gift you can give to others.",
  "Celebrate your progress, no matter how small. Each step forward is a victory worth acknowledging.",
  "Focus on the present moment, for it is where true peace and contentment reside.",
  "Stay true to yourself and your values, even in the face of adversity.",
  "Choose happiness every day, finding joy in the simple pleasures of life.",
  "Find strength in adversity, knowing that challenges are opportunities for growth.",
  "You are stronger than you know. Trust in your inner resilience and face challenges with courage.",
  "Embrace your uniqueness and celebrate what sets you apart.",
  "Take time to rest and recharge, nourishing your mind, body, and soul."
];

export async function GET() {
  const shuffled = [...messages].sort(() => Math.random() - 0.5);

  return NextResponse.json({
    suggestions: shuffled.slice(0, 3)
  });
}
