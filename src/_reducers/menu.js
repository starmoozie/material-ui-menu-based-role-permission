const menuState = {
    menu: []
  };
  
  export const allMenu = (state = menuState, action) => {
    switch (action.type) {
      case "SET_MENU":
        return {
          menu: action.payload
        };
  
      default:
        return state;
    }
  };
  
  const activeMenuState = {
    data: ""
  };
  
  export const activeMenu = (state = activeMenuState, action) => {
    switch (action.type) {
      case "SET_ACTIVE_MENU":
        return {
          data: action.data
        };
  
      default:
        return state;
    }
  };
  