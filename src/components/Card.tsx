interface CardProps {
  name: string;
  onClick?: () => void; 
}

export default function Card({ name, onClick }: CardProps) {
  return <button onClick={onClick}>{name}</button>;
}
