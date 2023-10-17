import "./App.css";
import CountryCapitalGame from "./components/CountryCapitalGame";

export default function App() {
  return (
    <CountryCapitalGame
      data={{
        Germany: "Berlin",
        France: "Paris",
      }}
    />
  );
}
