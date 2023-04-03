import { combineReducers } from "redux";

import { allMenu, activeMenu } from "./menu";
import {
  selected,
  order,
  pagination,
  data,
  columns,
  filters,
  modal,
  modalChilds
} from "./list";

const rootReducer = combineReducers({
  allMenu,
  activeMenu,
  selected,
  order,
  pagination,
  data,
  columns,
  filters,
  modal,
  modalChilds
});

export default rootReducer;
