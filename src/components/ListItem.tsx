import React from "react";

import "styled-components/macro";

import capitalize from "lodash/capitalize";

import {
  Card,
  CardMedia,
  Checkbox,
  IconButton,
  ListItem as ListItemMUI,
  ListItemText,
  ListItemSecondaryAction,
  Typography
} from "@material-ui/core";

import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

const ListItem = (props: any) => {
  return (
    <ListItemMUI divider={props.divider}>
      <Checkbox
        style={props.isViewOnly ? {display: 'none'} : {display: 'initial'}}
        onClick={props.onCheckBoxToggle}
        checked={props.checked}
        disableRipple
      />
      <Card
        css={`
          min-width: 200px;
          width: 200px;
          height: 150px;

          margin: 0 20px;
        `}
      >
        <CardMedia
          css={`
            width: 100%;
            height: 100%;
            background-size: contain;
          `}
          image={props.imageUrl}
          title="amazon-item"
        />
      </Card>
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
            <Typography
              css={`
                color: black;
              `}
            >
              Price: {props.price}
            </Typography>
            <Typography variant="caption">Comment: {props.comment}</Typography>
          </>
        }
      />
      <ListItemSecondaryAction style={props.isViewOnly ? {display:'none'} : {display: 'initial'}}>
        <IconButton  aria-label="Delete Item" onClick={props.onButtonClick}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItemMUI>
  );
};

export default ListItem;
