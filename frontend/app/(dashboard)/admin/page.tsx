import AdminDashboard from "@/modules/admin/adminDashboard";
import { getCurrentUser } from "@/utils/auth";
import { getAllUsersAndTheirFilteredTugas } from "@/utils/fetch";
import { cookies } from "next/headers";

const Page = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  const admin = await getCurrentUser();
  const allUsers = await getAllUsersAndTheirFilteredTugas(
    accessToken as string,
  );
  return <AdminDashboard allUsers={allUsers} admin={admin} />;
};

export default Page;
