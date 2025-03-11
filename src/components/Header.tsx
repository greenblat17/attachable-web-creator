
import { User } from "lucide-react";

interface HeaderProps {
  userName: string;
}

export const Header = ({ userName }: HeaderProps) => {
  return (
    <header className="w-full py-5 px-8 flex justify-between items-center border-b border-gray-100 bg-white">
      <div className="text-gray-600 font-medium">
        Личный кабинет партнера
      </div>
      
      <div className="flex items-center gap-3">
        <User className="w-5 h-5 text-gray-600" />
        <span className="text-gray-700 font-medium">{userName}</span>
      </div>
    </header>
  );
};
