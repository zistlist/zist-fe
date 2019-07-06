import "../styles.css";

import * as firebase from "firebase";

import React from "react";
import ReactDOM from "react-dom";

import { StylesProvider } from "@material-ui/styles";

import { useItems } from "../custom-hooks";

import Layout from "./Layout";

import AddItem from "./AddItem";
import ItemList from "./ItemList";

import { lists } from '../utils/firebaseQuery';
import { EditableListTitle } from '../utils/utils';

export type ListItem = {
  name: string;
  comment: string;
  category: string;
  quantity: number;
  id: string;
  url: string;
};

const list = lists();
list.get().then(querySnapshot => querySnapshot.forEach(doc => {}));

const App = () => {
  const { items, addItem, checkItem, removeItem, setItems } = useItems();

  const [listTitle, setListTitle] = React.useState("title");

  const listId = React.useRef("");

  const [isViewOnly, setViewOnly] = React.useState(true);

  React.useEffect(() => {
    const paths = window.location.pathname.split("/");
    if (paths[1] === "lists") {
      list
        .doc(paths[2])
        .get()
        .then(doc => {
          if (doc.exists) {
            listId.current = paths[2];
            const data = doc.data();
            if (data) {
              setItems(data.listItems);
              setListTitle(data.title);
            }
          }
        });
    }
  }, [setItems]);

  return (
    <StylesProvider injectFirst>
      <button onClick={() => {setViewOnly(!isViewOnly); console.log(isViewOnly)}}>mockViewer</button>
      <Layout>
        <EditableListTitle
          isViewOnly={isViewOnly}
          listTitle={listTitle}
          setListTitle={(title: string) => {
            if (listId.current) {
              list.doc(listId.current).update({
                title
              });
            }
            if (isViewOnly === false) {
              setListTitle(title);
            }
          }}
        />
        <AddItem
          isViewOnly={isViewOnly}
          addItem={async (item: any) => {
            if (!items.find(el => el.id === item.id)) {
              if (item.category !== "" && item.quantity !== null) {
                if (!items.length) {
                  const addDoc = await list.add({
                    title: listTitle,
                    listItems: [item]
                  });

                  window.history.pushState(null, "", `/lists/${addDoc.id}`);
                  listId.current = addDoc.id;
                } else {
                  {
                    await list.doc(listId.current).update({
                      listItems: [...items, item]
                    });
                  }
                }
                addItem(item);
              }
            }
          }}
        />
        <ItemList
          isViewOnly={isViewOnly}
          items={items}
          onItemCheck={async (idx: number, amazonId: string) => {
            const data = (await list.doc(listId.current).get()).data();

            if (data) {
              const currentListItems = data.listItems;

              await list.doc(listId.current).update({
                listItems: currentListItems.map((currentListItem: any) => {
                  if (currentListItem.amazonId === amazonId) {
                    return {
                      ...currentListItem,
                      checked: !currentListItem.checked
                    };
                  }
                  return currentListItem;
                })
              });
            }

            checkItem(idx);
          }}
          onItemRemove={async (idx: number, items: Array<ListItem>) => {
            await list.doc(listId.current).update({
              listItems: items.filter((_, filterIndex) => idx !== filterIndex)
            });
            removeItem(idx);
          }}
        />
      </Layout>
    </StylesProvider>
  );
};

export default App;
