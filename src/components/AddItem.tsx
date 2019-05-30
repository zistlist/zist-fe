import React, { memo } from "react";

import { TextField, Paper, Button, Grid } from "@material-ui/core";

import { ListItem } from "..";

const initialState: ListItem = {
  name: "",
  description: ""
};

const keyInput = (event: any, callback: any) => {
  if (event.which === 13 || event.keyCode === 13) {
    callback();
    return true;
  }

  return false;
};

const AddItem = memo((props: any) => {
  const [values, setValues] = React.useState<ListItem>(initialState);

  const handleChange = (name: keyof ListItem) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clearInputAndAddItem = () => {
    props.addItem(values);
    setValues(initialState);
  };

  const onInputKeyPress = (event: any) => keyInput(event, clearInputAndAddItem);

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container alignItems="flex-end">
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            placeholder="Name"
            value={values.name}
            onChange={handleChange("name")}
            // onKeyPress={onInputKeyPress}
            fullWidth
          />
          <TextField
            placeholder="Description"
            value={values.description}
            onChange={handleChange("description")}
            // onKeyPress={onInputKeyPress}
            fullWidth
          />
          {/* <TextField
            placeholder="Add item here"
            value={inputValue}
            onChange={changeInput}
            onKeyPress={onInputKeyPress}
            fullWidth
          /> */}
        </Grid>
        <Grid xs={2} md={1} item>
          <Button
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={clearInputAndAddItem}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
});

export default AddItem;
