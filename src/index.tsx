import "./styles.css";

import * as firebase from "firebase";

import React from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";

import { TextField, Typography } from "@material-ui/core";
import { StylesProvider } from "@material-ui/styles";

import { useItems } from "./custom-hooks";

import Layout from "./components/Layout";

import AddItem from "./components/AddItem";
import ItemList from "./components/ItemList";

const KEYCODE_ENTER = 13;
const KEYCODE_ESC = 27;

const ListTitle: any = styled(Typography)`
  margin: 16px;
  cursor: pointer;
`;

const ListTitleEditing: any = styled(TextField)`
  margin: 16px;

  & > * {
    font-size: 3rem;
  }
`;

export type ListItem = {
  name: string;
  comment: string;
  category: string;
  quantity: number;
  url: string;
};

const keyInput = (
  e: React.KeyboardEvent,
  saveCallback: any,
  cancelCallback: any
) => {
  if (e.which === KEYCODE_ENTER || e.keyCode === KEYCODE_ENTER) {
    saveCallback(e);
    return true;
  } else if (e.which === KEYCODE_ESC || e.keyCode === KEYCODE_ESC) {
    cancelCallback(e);
    return true;
  }

  return false;
};

const EditableListTitle = () => {
  const [viewState, setViewState] = React.useState<"viewing" | "editing">(
    "viewing"
  );
  const [listTitle, setListTitle] = React.useState("title");

  const clearInputAndUpdateTitle = (e: React.KeyboardEvent) => {
    setListTitle((e.target as HTMLInputElement).value);
    setViewState("viewing");
  };

  const onInputKeyPress = (e: React.KeyboardEvent) =>
    keyInput(e, clearInputAndUpdateTitle, () => setViewState("viewing"));

  return viewState === "viewing" ? (
    <ListTitle variant="h3" onClick={() => setViewState("editing")}>
      {listTitle}
    </ListTitle>
  ) : (
    <ListTitleEditing
      placeholder="Name"
      defaultValue={listTitle}
      onKeyDown={onInputKeyPress}
    />
  );
};

const config = {
  apiKey: "AIzaSyAlKD1sebSl5mvT0HgFu2Nsy1GNPRDjCho",
  authDomain: "zist-90c81.firebaseapp.com",
  databaseURL: "https://zist-90c81.firebaseio.com",
  projectId: "zist-90c81",
  storageBucket: "zist-90c81.appspot.com",
  messagingSenderId: "65347563740",
  appId: "1:65347563740:web:cfeb4d4deea7e7c4"
};
firebase.initializeApp(config);
const lists = firebase.firestore().collection("lists");
console.log("lists", lists);
lists.get().then(querySnapshot =>
  querySnapshot.forEach(doc => {
    console.log("doc.id", doc.id);
    console.log("doc.data()", doc.data());
  })
);

// export const todosRef = databaseRef.child("todos");

const App = () => {
  const { items, addItem, checkItem, removeItem, setItems } = useItems();
  const listId = React.useRef("");

  React.useEffect(() => {
    const paths = window.location.pathname.split("/");
    if (paths[1] === "lists") {
      lists
        .doc(paths[2])
        .get()
        .then(doc => {
          if (doc.exists) {
            listId.current = paths[2];
            const data = doc.data();
            if (data) {
              setItems(data.listItems);
            }
          }
        });
    }
  }, [setItems]);

  return (
    <StylesProvider injectFirst>
      <Layout>
        <EditableListTitle />
        <AddItem addItem={addItem} />
        <ItemList
          items={items}
          onItemCheck={async (idx: number, amazonId: string) => {
            // const currentListItems = (await lists
            //   .doc(listId.current)
            //   .get()).data().listItems

            const data = (await lists.doc(listId.current).get()).data();

            if (data) {
              const currentListItems = data.listItems;

              await lists.doc(listId.current).set({
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
          onItemRemove={(idx: number) => removeItem(idx)}
        />
      </Layout>
    </StylesProvider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
