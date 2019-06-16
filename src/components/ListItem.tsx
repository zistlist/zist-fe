import React, { memo } from "react";

import {
  ListItem as ListItemMUI,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

const ListItem = memo((props: any) => (
  <ListItemMUI divider={props.divider}>
    <Checkbox
      onClick={props.onCheckBoxToggle}
      checked={props.checked}
      disableRipple
    />
    <ListItemText primary={props.name} secondary={props.description} />
    <ListItemSecondaryAction>
      <IconButton aria-label="Delete Item" onClick={props.onButtonClick}>
        <DeleteOutlined />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItemMUI>
));

export default ListItem;
