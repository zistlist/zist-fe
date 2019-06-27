import { useState } from "react";
import { ListItem } from ".";

type CheckedState = {
  checked: boolean;
};

type ListItemWithCheckedState = ListItem & CheckedState;

export const useItems = (initialValue: ListItemWithCheckedState[] = []) => {
  const [items, setItems] = useState(initialValue);

  return {
    items,
    setItems,
    addItem: (item: ListItemWithCheckedState) => {
      if (item.category !== "" && item.quantity !== null) {
        setItems(
          items.concat({
            ...item,
            checked: false
          })
        );
      }
    },
    checkItem: (idx: number) => {
      setItems(
        items.map((item: any, index: number) => {
          if (idx === index) {
            item.checked = !item.checked;
          }

          return item;
        })
      );
    },
    removeItem: (idx: number) => {
      setItems(items.filter((item: any, index: number) => idx !== index));
    }
  };
};
