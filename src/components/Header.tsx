
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  userName: string;
}

export const Header = ({ userName }: HeaderProps) => {
  const { logout } = useAuth();

  return (
    <header className="w-full py-5 px-8 flex justify-between items-center border-b border-gray-100 bg-white">
      <div className="text-gray-600 font-medium">
        Личный кабинет партнера
      </div>
      
      <div className="flex items-center gap-3">
        <User className="w-5 h-5 text-gray-600" />
        <span className="text-gray-700 font-medium">{userName}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={logout} 
          className="ml-4 text-gray-600 hover:text-red-600"
        >
          <LogOut className="w-4 h-4 mr-1" />
          Выход
        </Button>
      </div>
    </header>
  );
};
