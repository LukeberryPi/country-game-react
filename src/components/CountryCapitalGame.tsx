import Card from "./Card";

interface CountryCapitalGameProps {
  data: Record<string, string>;
}

export default function CountryCapitalGame({ data }: CountryCapitalGameProps) {
  const entries = [...Object.keys(data), ...Object.values(data)];

  const shuffleArray = (arr: string[]) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const shuffledEntries = shuffleArray(entries);

  const cardMap = shuffledEntries.map((entry) => {
    return <Card key={entry} name={entry} />;
  });

  return <div>{cardMap}</div>;
}
