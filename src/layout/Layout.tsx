import Footer from "@/components/Footer";
import Header from "../components/Header";
import Hero from "@/components/Hero";

type Props = {
  children: React.ReactNode;
  showHero?: boolean;
};

function Layout({ children, showHero = false }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Header />
      {showHero && <Hero />}
      <div className="container mx-auto flex-1 py-10 px-4">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
