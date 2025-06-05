import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth0 } from '@auth0/auth0-react';

export default function MobileNavLinks() {
  const { logout } = useAuth0();

  return (
    <nav className="flex flex-col gap-4 px-4">
      <Link
        to="/user-profile"
        className="block px-4 py-2 font-semibold rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors"
      >
        Perfil
      </Link>
      <Button
        onClick={() => logout()}
        className="w-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
      >
        Salir
      </Button>
    </nav>
  );
}
