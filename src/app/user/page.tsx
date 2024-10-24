import { getServerSession } from "next-auth";
import { authOptionts } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
const UserHomePage = async () => {
  const session = await getServerSession(authOptionts);
  if (!session) {
    redirect("/login");
    return null;
  }
  return (
    <div>
      <span className="text-3xl text-gray-600">Hello This is dashboard</span>
    </div>
  );
};

export default UserHomePage;
