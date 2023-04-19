import { useContext, createContext, ReactNode, useState } from "react";
import { ShowCart } from "../components/ShowCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type AddCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};
export type AddCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  incrementCartQuantity: (id: number) => void;
  decrementCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};
const AddCartContext = createContext({} as AddCartContext);

export function useAddCart() {
  return useContext(AddCartContext);
}

export function AddCartProvider({ children }: AddCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("items-cart", []);
  const [isOpen, setIsOpen] = useState(false);
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function incrementCartQuantity(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decrementCartQuantity(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(id: number) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  return ( 
    <AddCartContext.Provider
      value={{
        openCart,
        closeCart,
        getItemQuantity,
        incrementCartQuantity,
        decrementCartQuantity,
        removeFromCart,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
      <ShowCart isOpen= {isOpen} />
    </AddCartContext.Provider>
  );
}
