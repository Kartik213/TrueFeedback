import { PublicProfile } from "@/components/public-profile";

type ProfilePageProps = {
  params: Promise<{ username: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  return <PublicProfile username={username} />;
}
