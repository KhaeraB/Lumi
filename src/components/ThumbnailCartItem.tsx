import { useAddCart } from "../context/AddCartContext";
import storeItems from "../data/shop_items.json";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";

type ThumbnailCartProps = {
  id: number;
  quantity: number;
};

export function ThumbnailCartItem({ id, quantity }: ThumbnailCartProps) {
  const { removeFromCart } = useAddCart();

  const item = storeItems.find((index) => index.id === id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2}>
      <img
        src={item.imgUrl}
        alt={item.name}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        {item.name}{" "}
        {quantity > 1 && (
          <span className="text-muted" style={{ fontSize: ".65rem" }}> x {quantity} </span>
        )}
         <div className="text-muted" style={{fontSize:".75rem"}}>{formatCurrency(item.price)}</div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button variant="outline-warning" size="sm" onClick={()=> removeFromCart(item.id)}>&times;</Button>
    </Stack>
  );
}
