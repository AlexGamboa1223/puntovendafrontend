import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import AuthCallBackPage from "./pages/AuthCallBackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";

// Páginas de productos
import AddProductPage from "./pages/products/AddProductPage";
import EditProductPage from "./pages/products/EditProductPage";
import ProductsPage from "./pages/products/ProductsPage";

// Página de éxito
import SuccessPage from "./pages/SuccessPage";

// Página de historial de órdenes
import OrdersPage from "./pages/orders/OrdersPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Página pública de inicio */}
      <Route
        path="/"
        element={
          <Layout showHero={true}>
            <HomePage />
          </Layout>
        }
      />

      {/* Callback de autenticación */}
      <Route path="/auth-callback" element={<AuthCallBackPage />} />

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        {/* Perfil */}
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />

        {/* Productos */}
        <Route
          path="/products"
          element={
            <Layout>
              <ProductsPage />
            </Layout>
          }
        />
        <Route
          path="/products/add"
          element={
            <Layout>
              <AddProductPage />
            </Layout>
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <Layout>
              <EditProductPage />
            </Layout>
          }
        />

        {/* Página de éxito Stripe */}
        <Route
          path="/success"
          element={
            <Layout>
              <SuccessPage />
            </Layout>
          }
        />

        {/* Historial de órdenes */}
        <Route
          path="/orders"
          element={
            <Layout>
              <OrdersPage />
            </Layout>
          }
        />
      </Route>

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
