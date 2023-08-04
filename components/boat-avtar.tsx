import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

export const BoatAvatar: React.FC = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src="/logo.png" className="p-1" />
    </Avatar>
  );
};
