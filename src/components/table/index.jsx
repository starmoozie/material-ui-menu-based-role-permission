import { useEffect } from "react";
import TableToolbar from "./Toolbar";
import TableList from "./Container";
import { useDispatch } from "react-redux";
import { useActiveMenu } from "../../_hooks";
import Modal from "../modal";
import { groupBy } from "../../_utils";

export default function Table(props) {
  const dispatch = useDispatch();
  const { activeMenu } = useActiveMenu();
  const permission = groupBy(activeMenu?.permission, "type");

  useEffect(() => {
    dispatch({
      type: "SET_COLUMNS",
      data: props.columns
    });

    dispatch({
      type: "SET_MODAL_CHILDS",
      payload: {
        create: props.createFields,
        edit: props.editFields,
        detail: props.details,
        filter: props.filters,
        validation: props.validation
      }
    });
  }, [dispatch, props]);

  return (
    <>
      {activeMenu ? (
        <>
          <TableToolbar {...permission} />
          <TableList {...permission} />
          <Modal />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
