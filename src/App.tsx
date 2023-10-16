import './App.css'
import CountryCapitalGame from './components/CountryCapitalGame'


export default function App() {
  const data: Record<string, string> = {
    Germany: "Berlin",
    France: "Paris",
  }

  return <CountryCapitalGame data={data} />
}

