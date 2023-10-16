interface CountryCapitalGameProps {
  data: Record<string, string>;
}

export default function CountryCapitalGame({ data }: CountryCapitalGameProps) {
  return <div>{JSON.stringify(data)}</div>;
}
