import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/admin-ui/avatar";

export interface UpdateItemData {
  initials?: string;
  name: string;
  description: string;
  bgColor?: string;
  avatarSrc?: string;
  avatarAlt?: string;
}

interface UserUpdateCardProps {
  item: UpdateItemData;
  adminImageUrl: string;
}

export const UserUpdateCard = ({
  item,
  adminImageUrl,
}: UserUpdateCardProps) => {
  return (
    <div className="flex-shrink-0 flex items-center gap-3 bg-white rounded-full pl-1 pr-4 py-1.5 min-w-fit shadow-xs">
      {item.avatarSrc ? (
        <Avatar className="w-8 h-8">
          <AvatarImage
            src={`${adminImageUrl}/${item.avatarSrc}`}
            alt={item.avatarAlt || item.name}
          />
          <AvatarFallback className="bg-gray-800 text-white text-[10px] font-bold">
            {item.initials}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div
          className={`w-8 h-8 rounded-full ${
            item.bgColor || "bg-gray-500"
          } flex items-center justify-center text-white text-[10px] font-bold`}
        >
          {item.initials}
        </div>
      )}
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] font-bold text-gray-900">{item.name}</span>
        <span className="text-[10px] text-gray-500 font-medium">
          {item.description}
        </span>
      </div>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1"></span>
    </div>
  );
};
