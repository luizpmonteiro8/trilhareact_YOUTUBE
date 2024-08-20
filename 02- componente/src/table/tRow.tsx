interface Props {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export default function TRow({ name, description, price, quantity }: Props) {
  return (
    <tr>
      <td>{name}</td>
      <td>{description}</td>
      <td>{price}</td>
      <td>{quantity}</td>
    </tr>
  );
}
