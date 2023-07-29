import { useContext } from 'react';
import { createContext } from "react";
const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext)

export default AppContext;
