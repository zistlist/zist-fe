import React, { memo } from "react";
import { List as ListMUI, Paper } from "@material-ui/core";

import ListItem from "./ListItem";

const List = memo((props: any) => (
  <>
    {props.items.length > 0 && (
      <Paper css={` margin: 16 `}>
        <ListMUI css={` overflow: scroll `}>
          {props.items.map((item: any, idx: number) => (
            <ListItem
              isViewOnly={props.isViewOnly}
              {...item}
              key={`Item.${idx}`}
              divider={idx !== props.items.length - 1}
              onButtonClick={() => props.onItemRemove(idx, props.items)}
              onCheckBoxToggle={() => props.onItemCheck(idx, item.amazonId)}
            />
          ))}
        </ListMUI>
      </Paper>
    )}
  </>
));

export default List;
