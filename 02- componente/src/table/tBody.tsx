import { Items } from "./table";
import TRow from "./trow";

interface Props {
  items: Items[];
}

export default function TBody({ items }: Props) {
  return (
    <tbody>
      {items.map((item) => {
        return (
          <TRow
            key={item.name}
            name={item.name}
            description={item.description}
            price={item.price}
            quantity={item.quantity}
            /* {...item} */
          />
        );
      })}
    </tbody>
  );
}
