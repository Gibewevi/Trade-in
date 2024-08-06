import Introduction from "./components/homepage/introduction/Introduction";
import Become from "./components/homepage/become/Become";
import TableOfContent from "./components/homepage/tableOfContent/TableOfContent";
import Header from "./components/header/Header";

export default function Home() {
  
  return (
    <div className="w-full bg-slate-100">
      <Introduction />
      <Become/>
      <TableOfContent />
    </div>
  );
}
