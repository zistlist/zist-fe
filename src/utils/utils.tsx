import React from "react";
import styled from "styled-components"
import { TextField, Typography } from "@material-ui/core";

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

const KEYCODE_ENTER = 13;
const KEYCODE_ESC = 27;

export const keyInput = (
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

export const EditableListTitle = ({ listTitle, setListTitle, isViewOnly }: any) => {
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
    return (
      <ListTitle variant="h3">
        {listTitle}
      </ListTitle>
    );
  }
};
