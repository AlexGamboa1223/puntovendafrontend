export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-8 mt-10 shadow-inner">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="text-lg font-semibold tracking-tight mb-4 md:mb-0">
          © 2025 M&AtechPVPW.com
        </div>
        <div className="flex gap-6 text-sm font-medium">
          <a href="#" className="hover:underline">
            Política de privacidad
          </a>
          <a href="#" className="hover:underline">
            Términos del servicio
          </a>
        </div>
      </div>
    </footer>
  );
}
