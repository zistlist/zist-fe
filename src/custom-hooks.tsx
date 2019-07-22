import { useState } from "react";

export const useItems = (initialValue: ListItemWithCheckedState[] = []) => {
  const [items, setItems] = useState(initialValue);

  return {
    items,
    setItems,
    addItem: (item: ListItemWithCheckedState) => {
      setItems(
        items.concat({
          ...item,
          checked: false
        })
      );
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
      // remove item from list in firestore

      setItems(items.filter((item: any, index: number) => idx !== index));
    }
  };
};
