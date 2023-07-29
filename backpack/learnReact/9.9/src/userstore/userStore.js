import React, { useState, useEffect, createContext, useContext } from "react";
import { getPerms } from "@/api/index";

export const UserContext = createContext();
export const useUserStore = () => useContext(UserContext);

export const UserContextProvider = ({ children, id }, props) => {
  const [perms, setPerms] = useState([]);
  const [functions, setFunctions] = useState([]);


  useEffect(() => {
    getPerms({
      PLMForm: id
    }).then(res => {
      setPerms(res.data.data.permissions)
      setFunctions(res.data.data.functions)
      // console.log('perms==',res.data.data);
    })
  }, [])//eslint-disable-line

  return (
    <UserContext.Provider
      value={{
        perms,
        functions
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

