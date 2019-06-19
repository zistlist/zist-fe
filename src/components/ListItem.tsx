import React from "react";

import "styled-components/macro";

import capitalize from "lodash/capitalize";

import {
  ListItem as ListItemMUI,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
  Typography
} from "@material-ui/core";

import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

const ListItem = (props: any) => {
  return (
    <ListItemMUI divider={props.divider}>
      <Checkbox
        onClick={props.onCheckBoxToggle}
        checked={props.checked}
        disableRipple
      />
      <img src={props.imageUrl} alt="amazon-item" />
      <ListItemText
        primary={<Typography>{props.name}</Typography>}
        secondary={
          <>
            <Typography variant="caption">{props.description}</Typography>
            <Typography
              css={`
                color: black;
              `}
            >
              Category: {capitalize(props.category)}
            </Typography>
            <Typography
              css={`
                color: black;
              `}
            >
              Quantity: {props.quantity}
            </Typography>
            <Typography variant="caption">Comment: {props.comment}</Typography>
          </>
        }
      />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Item" onClick={props.onButtonClick}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItemMUI>
  );
};

export default ListItem;
