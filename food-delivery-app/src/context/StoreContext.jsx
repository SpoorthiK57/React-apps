import { createContext } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null); // Context creation, Storecontext(global store)
const StoreContextProvider = (props) => {
  // Define the shared data
  const contextValue = {
    food_list,
  };
  return (
    // Providing food_list data to all the children (this avoids props drilling)
    //StoreContextProvider wraps entire app and makes food_list available globally

    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

/* Context Api
 */
