import Card from "./Card";

export default function ErrorCard({ message }: { message: string }) {
  return (
    <Card>
      <p className="text-red-500 font-medium">{message}</p>
    </Card>
  );
}
