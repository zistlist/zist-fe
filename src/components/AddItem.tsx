import React, { memo } from "react";

import "styled-components/macro";

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

import { ListItem } from "..";


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

const SAMPLE_AMAZON_SCRAPED_ITEMS = {
  imageUrl:
    "data:image/webp;base64,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",
  name: "Coleman Dome Tent for Camping | Sundome Tent with Easy Setup",
  description:
    "Make camping easier with the Coleman 6-Person Sundome Tent with rainfly. If it rains, the Weathertec System’s patented welded floors and inverted protected seams help ensure you stay dry, and the Insta--Clip pole attachments stand up to wind. The snag-free, continuous pole sleeves mean you only have to feed the poles once—shrinking setup time to just 10 minutes. Inside the tent, a specially-designed ventilation system with floor vent keeps air moving while keeping insects out. The 10 ft. x 10 ft. (3 m x 3 m) floor fits two queen size airbeds.",
  price: 12.94
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
    }

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
    <Paper style={props.isViewOnly ? { margin: 16, padding: 16, display: 'none' } : { margin: 16, padding: 16 }}>
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
              [<TextField
                placeholder="URL"
                value={values.url}
                onChange={handleChange("url")}
                onKeyDown={onInputKeyPress}
                fullWidth
              />,
              <Button
                style={{ position:"absolute", marginLeft: 15}}
                  color="secondary"
                  variant="outlined"
                  onClick={loadAmazonInfoAndClearUrlInput}

                >
                  AddItem
                </Button>
            ]
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
              <MenuItem value="lifestyle">Lifestyle</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="travel">Travel</MenuItem>
              <MenuItem value="fitness">Fitness</MenuItem>
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
          >
            AddToList
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
});

export default AddItem;
