interface CardProps {
  name: string;
}

export default function Card({ name }: CardProps) {
  return <button className="card">{name}</button>;
}
