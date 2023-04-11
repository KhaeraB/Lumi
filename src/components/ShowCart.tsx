import { Offcanvas } from "react-bootstrap";
import { useAddCart } from "../context/AddCartContext";
import { Stack } from "@mui/material";
import { ThumbnailCartItem } from "./ThumbnailCartItem";

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
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
