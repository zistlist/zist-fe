import React, { memo } from "react";
import {
  List as ListMUI,
  ListItem as ListItemMUI,
  Paper
} from "@material-ui/core";

import "styled-components/macro";

import capitalize from "lodash/capitalize";

import ListItem from "./ListItem";


const List = memo((props: any) => (
  <>
    {props.items.length > 0 && (
      <Paper
        css={`
          margin: 16px;
          padding: 16px;
        `}
      >
        <ListMUI
          css={`
            overflow: scroll;
          `}
        >
          {props.items
            .reduce((categoriesForList: Array<any>, currentItem: any) => {
              if (
                !currentItem.category &&
                !categoriesForList.includes("Not Categorized")
              ) {
                return [...categoriesForList, "Not Categorized"];
              }
              if (!categoriesForList.includes(currentItem.category)) {
                return [...categoriesForList, currentItem.category];
              }
              return categoriesForList;
            }, [])
            .map((category: any) => (
              <>
                <ListItemMUI>{capitalize(category)}</ListItemMUI>
                <ListMUI
                  css={`
                    overflow: scroll;
                  `}
                >
                  {props.items
                    .filter(
                      (item: any) =>
                        item.category.toLowerCase() ===
                          category.toLowerCase() ||
                        (category === "Not Categorized" && !item.category)
                    )
                    .map((item: any, idx: number) => (
                      <ListItem
                        isViewOnly={props.isViewOnly}
                        {...item}
                        key={`Item.${idx}`}
                        divider={idx !== props.items.length - 1}
                        onButtonClick={() =>
                          props.onItemRemove(idx, props.items)
                        }
                        onCheckBoxToggle={() =>
                          props.onItemCheck(idx, item.amazonId)
                        }
                      />
                    ))}
                </ListMUI>
              </>
            ))}
        </ListMUI>
      </Paper>
    )}
  </>
));

export default List;
