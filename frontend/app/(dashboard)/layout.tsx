import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardNavbar from "@/components/DashboardNavbar";
import Container from "@/components/Container";

import Avatar from "@/components/Avatar"; // Assuming Avatar is in this path
import { getCurrentUser } from "@/utils/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const isAdmin = user?.isAdmin === "true" ? true : false;

  return (
    <div className="relative flex flex-col lg:flex-row">
      <DashboardSidebar admin={isAdmin} />

      <div className="flex-grow">
        <DashboardNavbar admin={isAdmin} />
        <Avatar className="top-8 right-6 lg:hidden" />
        <Container
          parentClass={`pt-0 w-screen lg:w-[80vw] lg:pt-8 min-h-screen`}
          className="relative"
        >
          {/* avatar component */}
          <Avatar className={`hidden lg:flex`} />
          {children}
        </Container>
      </div>
    </div>
  );
}
