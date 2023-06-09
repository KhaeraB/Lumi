import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useAddCart } from "../context/AddCartContext";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};
export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    incrementCartQuantity,
    decrementCartQuantity,
    removeFromCart,
  } = useAddCart();
  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-3">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick= {() => incrementCartQuantity(id)}> + Add To Card</Button>
          ) : (
            <div
              className="d-flex align-item-center flex-column"
              style={{ gap: ".4rem" }}
            >
              <div
                className="d-flex align-item-center justify-content-center"
                style={{ gap: ".4rem" }}
              >
                <Button onClick= {() => decrementCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span>
                </div>
                <Button onClick= {() => incrementCartQuantity(id)}>+</Button>
              </div>
              <Button variant="danger" size="sm" onClick= {() => removeFromCart(id)}>
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
