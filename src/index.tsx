import "./styles.css";

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

const App = () => {
  const { items, addItem, checkItem, removeItem } = useItems();

  return (
    <StylesProvider injectFirst>
      <Layout>
        <EditableListTitle />
        <AddItem addItem={addItem} />
        <ItemList
          items={items}
          onItemCheck={(idx: number) => checkItem(idx)}
          onItemRemove={(idx: number) => removeItem(idx)}
        />
      </Layout>
    </StylesProvider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
