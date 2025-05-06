
import { User, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  userName: string;
}

export const Header = ({ userName }: HeaderProps) => {
  const { logout } = useAuth();
  const isMobile = useIsMobile();

  return (
    <header className="w-full py-5 px-4 sm:px-8 flex justify-between items-center border-b border-gray-100 bg-white">
      {!isMobile && (
        <div className="text-gray-600 font-medium">
          Личный кабинет партнера
        </div>
      )}
      
      <div className={`flex items-center gap-2 sm:gap-3 ${isMobile ? 'ml-auto' : ''}`}>
        <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        <span className="text-gray-700 font-medium text-sm sm:text-base">
          {isMobile ? userName.split(' ')[0] : userName}
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={logout} 
          className="ml-2 sm:ml-4 text-gray-600 hover:text-red-600 p-1 sm:p-2"
        >
          <LogOut className="w-4 h-4" />
          {!isMobile && <span className="ml-1">Выход</span>}
        </Button>
      </div>
    </header>
  );
};
