import { getCurrentUser } from "@/utils/auth";
import { AvatarIcon } from "@radix-ui/react-icons";

const Avatar = async ({ className }: { className?: string}) => {
  const user = await getCurrentUser();

  return (
    <div className={`flex items-center gap-2 absolute z-10 top-0 right-0 bg-custom-gray-dark p-2 rounded-sm ${className}`}>
      <h1 className="hidden xs:block max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">{user?.username}</h1>
      <div className=" bg-custom-gray p-1 rounded-sm">
        <AvatarIcon className="h-6 w-auto shrink-0" />
      </div>
    </div>
  );
};

export default Avatar;
