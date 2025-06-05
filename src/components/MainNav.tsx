import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UserNameMenu from "./UserNameMenu";
import { Link } from "react-router-dom";

export default function MainNav() {
  const { isLoading, loginWithRedirect, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <span className="text-sm text-gray-500">Cargando...</span>;
  }

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 bg-white shadow">
      {/* Navegación izquierda */}
      <div className="flex gap-4 items-center">
        <Link to="/" className="text-blue-600 font-bold hover:underline">
          Inicio
        </Link>
        {isAuthenticated && (
          <>
            <Link to="/products" className="text-blue-600 font-bold hover:underline">
              Productos
            </Link>
            <Link to="/products/add" className="text-blue-600 font-bold hover:underline">
              Inventario y Agregar
            </Link>
            <Link to="/orders" className="text-blue-600 font-bold hover:underline">
              Mis compras
            </Link>
          </>
        )}
      </div>

      {/* Autenticación derecha */}
      <div className="flex items-center">
        {isAuthenticated ? (
          <UserNameMenu />
        ) : (
          <Button
            variant="ghost"
            className="font-bold hover:text-blue-500 hover:bg-white"
            onClick={async () => await loginWithRedirect()}
          >
            Log In
          </Button>
        )}
      </div>
    </div>
  );
}
