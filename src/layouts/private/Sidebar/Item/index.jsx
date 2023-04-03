import { Fragment } from "react";
import List from "@mui/material/List";
import { useSelector } from "react-redux";
import SingleItemSidebar from "./Single";
import NestedItemSidebar from "./Nested";

export default function ItemSidebar() {
  const { menu } = useSelector((state) => state.allMenu);

  return (
    <>
      {menu.length ? (
        <List>
          {menu.map((item) => {
            return (
              <Fragment key={item.id}>
                {!item.children.length ? (
                  <SingleItemSidebar {...item} />
                ) : (
                  <NestedItemSidebar {...item} />
                )}
              </Fragment>
            );
          })}
        </List>
      ) : (
        <></>
      )}
    </>
  );
}
