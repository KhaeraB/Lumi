import { useAddCart } from "../context/AddCartContext";
import storeItems from "../data/shop_items.json";
import { Stack } from "react-bootstrap";

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
      </div>
    </Stack>
  );
}
