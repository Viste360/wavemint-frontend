import { redirect } from "next/navigation";

export default function Home() {
  return <meta httpEquiv="refresh" content="0;url=/splash" />;
}
export default function Home() {
  redirect("/login");
}
