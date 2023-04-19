import { Offcanvas, Stack } from "react-bootstrap";
import { useAddCart } from "../context/AddCartContext";
import { ThumbnailCartItem } from "./ThumbnailCartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/shop_items.json";

type AddToCartProps ={
    isOpen: boolean
}

export function ShowCart({isOpen}: AddToCartProps) {
    const {closeCart, cartItems} = useAddCart()
  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
            {cartItems.map(item => (
                <ThumbnailCartItem key= {item.id} {...item} />
            ))}
            <div className="ms-auto fw-bold fs-3">
              Total : {" "}
              {formatCurrency(cartItems.reduce((total, cartItems) =>{
                const totalItem = storeItems.find(i => i.id === cartItems.id)
                return total + (totalItem?.price || 0) * cartItems.quantity
              }, 0)
              )}
            </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
