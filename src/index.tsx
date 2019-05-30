import "./styles.css";

import React, { memo } from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";

import { Typography } from "@material-ui/core";
import { StylesProvider } from "@material-ui/styles";

import { useItems } from "./custom-hooks";

import Layout from "./components/Layout";

import AddItem from "./components/AddItem";
import ItemList from "./components/ItemList";

const ListTitle: any = styled(Typography)`
  margin: 16px;
`;

export type ListItem = {
  name: "";
  description: "";
};

const App = memo(props => {
  const { items, addItem, checkItem, removeItem } = useItems();

  return (
    <StylesProvider injectFirst>
      <Layout>
        <ListTitle variant="h3">Meditation Items</ListTitle>
        <AddItem addItem={addItem} />
        <ItemList
          items={items}
          onItemCheck={(idx: number) => checkItem(idx)}
          onItemRemove={(idx: number) => removeItem(idx)}
        />
      </Layout>
    </StylesProvider>
  );
});

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
