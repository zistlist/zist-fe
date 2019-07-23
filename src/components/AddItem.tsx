import React, { memo } from "react";

import "styled-components/macro";

import capitalize from "lodash/capitalize";

import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from "@material-ui/core";

const KEYCODE_ENTER = 13;
const KEYCODE_ESC = 27;

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

const initialState: ListItem = {
  name: "",
  comment: "",
  category: "",
  quantity: 1,
  url: "",
  id: ""
};

const getAmazonInfo = async (productUrl: string) => {
  const res = await fetch(
    "https://us-central1-myproject-dbb0e.cloudfunctions.net/scraper",
    {
      method: "POST",
      body: JSON.stringify({ data: productUrl }),
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  if (!res.ok) throw new Error(res as any);
  return res.json();
};

const ScrapedAmazonItems = ({
  values: { imageUrl, name, description, price }
}: any) => {
  return (
    <>
      <img src={imageUrl} alt="amazon-item" />
      <Typography variant="h5">{name}</Typography>
      <Typography variant="body2">{description}</Typography>
      <Typography>$ {price}</Typography>
    </>
  );
};

const AddItem = memo((props: any) => {
  const [values, setValues] = React.useState<ListItem>(initialState);
  const [urlLoaded, setUrlLoaded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const loadAmazonInfoAndClearUrlInput = async () => {
    setLoading(true);
    const scrapedAmazonInfo = await getAmazonInfo(values.url);
    setValues({ ...values, ...scrapedAmazonInfo, url: "" });
    setLoading(false);
    setUrlLoaded(true);
  };

  const onInputKeyPress = (e: React.KeyboardEvent) =>
    keyInput(e, loadAmazonInfoAndClearUrlInput, () =>
      setValues({ ...values, url: "" })
    );

  const onButtonClick = () => {
    loadAmazonInfoAndClearUrlInput();
  };

  const handleChange = (name: keyof ListItem) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clearInputAndAddItem = () => {
    props.addItem(values);
    setValues(initialState);
    setUrlLoaded(false);
  };

  return (
    <Paper
      css={`
        margin: 16px;
        padding: 16px;
        ${props.isViewOnly && "display: none"};
      `}
    >
      <Grid container alignItems="flex-end">
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          {!urlLoaded ? (
            loading ? (
              <CircularProgress
                css={`
                  display: block;
                `}
              />
            ) : (
              <>
                <TextField
                  placeholder="URL"
                  value={values.url}
                  onChange={handleChange("url")}
                  onKeyDown={onInputKeyPress}
                  fullWidth
                />
                <Button
                  css={`
                    position: absolute;
                    margin-left: 15px;
                    width: 7rem;
                  `}
                  color="secondary"
                  variant="outlined"
                  onClick={loadAmazonInfoAndClearUrlInput}
                >
                  Add Item
                </Button>
              </>
            )
          ) : (
            <ScrapedAmazonItems values={values} />
          )}

          <FormControl>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              css={`
                width: 8rem;
              `}
              value={values.category}
              onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                setValues({ ...values, category: e.target.value as string });
              }}
              inputProps={{
                name: "category",
                id: "category"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {props.categories.map((category: any) => (
                <MenuItem value={category.toLowerCase()}>
                  {capitalize(category)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            placeholder="Comment"
            value={values.comment}
            onChange={handleChange("comment")}
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
            disabled={!urlLoaded}
            css={`
              width: 7rem;
            `}
          >
            Add To List
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
});

export default AddItem;
