import MoneyPiramide from "./components/MoneyPiramide";
import GameSection from "./components/GameSection";
import "./App.css";

function App() {
  return (
    <main className="w-full h-screen flex">
      <GameSection />
      <MoneyPiramide />
    </main>
  );
}

export default App;
