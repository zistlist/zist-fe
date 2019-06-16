import React, { memo } from "react";
import { List as ListMUI, Paper } from "@material-ui/core";

import ListItem from "./ListItem";

const List = memo((props: any) => (
  <>
    {props.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <ListMUI style={{ overflow: "scroll" }}>
          {props.items.map((item: any, idx: number) => (
            <ListItem
              {...item}
              key={`Item.${idx}`}
              divider={idx !== props.items.length - 1}
              onButtonClick={() => props.onItemRemove(idx)}
              onCheckBoxToggle={() => props.onItemCheck(idx)}
            />
          ))}
        </ListMUI>
      </Paper>
    )}
  </>
));

export default List;
