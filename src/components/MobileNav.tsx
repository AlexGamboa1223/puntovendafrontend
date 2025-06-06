// src/components/MobileNavLinks.tsx
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";

export default function MobileNavLinks() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <nav className="flex flex-col gap-4 p-4">
      <Link to="/" className="text-blue-600 font-medium hover:underline">
        Inicio
      </Link>

      {isAuthenticated ? (
        <>
          <Link to="/products" className="text-blue-600 font-medium hover:underline">
            Productos
          </Link>
          <Link to="/products/add" className="text-blue-600 font-medium hover:underline">
            Agregar producto
          </Link>
          <Link to="/orders" className="text-blue-600 font-medium hover:underline">
            Mis compras
          </Link>
          <Link to="/user-profile" className="text-blue-600 font-medium hover:underline">
            Perfil
          </Link>
        </>
      ) : (
        <Button
          variant="ghost"
          className="text-blue-600 font-medium text-left"
          onClick={async () => await loginWithRedirect()}
        >
          Iniciar sesión
        </Button>
      )}
    </nav>
  );
}
