import MoneyPiramide from "./components/MoneyPiramide";
import GameSection from "./components/GameSection";
import NotAvailableForMobile from "./components/NotAvailableForMobile";
import "./App.css";

function App() {
  return (
    <main className="w-full h-screen flex">
      <NotAvailableForMobile />
      <GameSection />
      <MoneyPiramide />
    </main>
  );
}

export default App;
