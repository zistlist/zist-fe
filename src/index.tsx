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
  id: string;
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

const EditableListTitle = ({ listTitle, setListTitle, isViewOnly }: any) => {
  const [viewState, setViewState] = React.useState<"viewing" | "editing">(
    "viewing"
  );

  const clearInputAndUpdateTitle = (e: React.KeyboardEvent) => {
    setListTitle((e.target as HTMLInputElement).value);
    setViewState("viewing");
  };

  const onInputKeyPress = (e: React.KeyboardEvent) =>
    keyInput(e, clearInputAndUpdateTitle, () => setViewState("viewing"));

  if (isViewOnly === false) {
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
  } else {
    return <ListTitle variant="h3">{listTitle}</ListTitle>;
  }
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
lists.get().then(querySnapshot => querySnapshot.forEach(doc => {}));

const provider = new firebase.auth.GoogleAuthProvider();

const App = () => {
  const { items, addItem, checkItem, removeItem, setItems } = useItems();

  const [listTitle, setListTitle] = React.useState("title");

  const listId = React.useRef("");

  const [user, setUser] = React.useState();

  const [listOwner, setListOwner] = React.useState();

  const isViewOnly = !user || user.uid !== listOwner;

  const signIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result: any) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const token = result.credential.accessToken;

        // The signed-in user info.
        const user = result.user;

        setUser(user);
      })
      .catch(function(error: any) {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // const credential = error.credential;
        // ...
      });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        setUser(null);
        window.location.href = "/";
      })
      .catch(function(error) {
        // An error happened.
      });
  };

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

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
              setListTitle(data.title);
              setListOwner(data.userId);
            }
          }
        });
    }
  }, [setItems]);

  return (
    <StylesProvider injectFirst>
      {user ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={signIn}>Sign In</button>
      )}
      <Layout>
        <EditableListTitle
          isViewOnly={isViewOnly}
          listTitle={listTitle}
          setListTitle={(title: string) => {
            if (listId.current) {
              lists.doc(listId.current).update({
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
                  const addDoc = await lists.add({
                    title: listTitle,
                    listItems: [item],
                    userId: user ? user.uid : null
                  });

                  window.history.pushState(null, "", `/lists/${addDoc.id}`);
                  listId.current = addDoc.id;
                } else {
                  await lists.doc(listId.current).update({
                    listItems: [...items, item]
                  });
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
            const data = (await lists.doc(listId.current).get()).data();

            if (data) {
              const currentListItems = data.listItems;

              await lists.doc(listId.current).update({
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
            await lists.doc(listId.current).update({
              listItems: items.filter((_, filterIndex) => idx !== filterIndex)
            });
            removeItem(idx);
          }}
        />
      </Layout>
    </StylesProvider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
