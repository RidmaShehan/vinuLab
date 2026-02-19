import Navbar from "@/components/Navbar";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnalyticsTracker />
      <Navbar />
      {children}
    </>
  );
}
