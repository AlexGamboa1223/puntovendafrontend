import { useAuth0 } from '@auth0/auth0-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { CircleUserRound, LogOut, User as UserIcon } from 'lucide-react';
import { Separator } from './ui/separator';
import { Link } from 'react-router-dom';

export default function UserNameMenu() {
  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-gray-800 font-medium shadow hover:bg-gray-100 transition">
        <CircleUserRound className="text-blue-600" size={20} />
        <span className="truncate max-w-[140px]">{user?.email}</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white border border-gray-200 rounded-lg shadow-lg mt-2 w-48">
        <DropdownMenuItem asChild>
          <Link
            to="/user-profile"
            className="flex items-center gap-2 px-3 py-2 hover:bg-blue-50 rounded-md transition text-gray-700"
          >
            <UserIcon size={16} className="text-blue-500" />
            <span>Perfil</span>
          </Link>
        </DropdownMenuItem>

        <Separator className="my-1 bg-gray-200" />

        <DropdownMenuItem asChild>
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 px-3 py-2 w-full text-left text-red-600 hover:bg-red-50 rounded-md transition"
          >
            <LogOut size={16} />
            <span>Salir</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
