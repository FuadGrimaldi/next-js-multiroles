import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
const UserHomePage = async () => {
  const session = await getServerSession(authOptions);
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
