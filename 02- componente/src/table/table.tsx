import TBody from "./tBody";
import THead from "./thead";
export interface Items {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface Props {
  items: Items[];
}

export default function Table({ items }: Props) {
  return (
    <table>
      <THead />
      <TBody items={items} />
    </table>
  );
}
