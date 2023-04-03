const selectState = {
    selected: []
  };
  
  export const selected = (state = selectState, action) => {
    switch (action.type) {
      case "SET_SELECTED":
        return {
          ...state,
          ...action.payload
        };
  
      default:
        return state;
    }
  };
  
  const orderState = {
    order: "asc",
    orderBy: ""
  };
  
  export const order = (state = orderState, action) => {
    switch (action.type) {
      case "SET_ORDER":
        return {
          ...state,
          ...action.payload
        };
  
      default:
        return state;
    }
  };
  
  const paginationState = {
    page: 0,
    rowsPerPage: 10
  };
  
  export const pagination = (state = paginationState, action) => {
    switch (action.type) {
      case "SET_PAGINATION":
        return {
          ...state,
          ...action.payload
        };
  
      default:
        return state;
    }
  };
  
  const dataState = {
    rows: []
  };
  
  export const data = (state = dataState, action) => {
    switch (action.type) {
      case "SET_DATA":
        return {
          ...state,
          rows: action.rows
        };
  
      default:
        return state;
    }
  };
  
  const columnState = {
    columns: []
  };
  
  export const columns = (state = columnState, action) => {
    switch (action.type) {
      case "SET_COLUMNS":
        return {
          ...state,
          columns: action.data
        };
  
      default:
        return state;
    }
  };
  
  const filterState = {
    data: []
  };
  
  export const filters = (state = filterState, action) => {
    switch (action.type) {
      case "SET_FILTERS":
        return {
          data: action.data
        };
  
      default:
        return state;
    }
  };
  
  const modalState = {
    open: false,
    action: "",
    data: ""
  };
  
  export const modal = (state = modalState, action) => {
    switch (action.type) {
      case "OPEN_MODAL":
        return {
          ...action.payload
        };
  
      default:
        return state;
    }
  };
  
  const modalChildsState = {
    create: [],
    edit: [],
    detail: [],
    filter: [],
    validation: ""
  };
  
  export const modalChilds = (state = modalChildsState, action) => {
    switch (action.type) {
      case "SET_MODAL_CHILDS":
        return {
          ...state,
          ...action.payload
        };
  
      default:
        return state;
    }
  };
  