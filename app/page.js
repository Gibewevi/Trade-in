import Image from "next/image";
import Header from "./components/header/Header";
import Become from "./components/header/homepage/become/Become";
import Link from "next/link"; // Importez le composant Link

export default function Home() {
  return (
    <div className="w-full bg-slate-100 h-screen">
      <Become></Become>
        {/* Utilisez le composant Link pour naviguer */}
        <Link href="/lesson">
          <button className="bg-red-700">Cliquez sur la lesson</button>
        </Link>
    </div>
  );
}
