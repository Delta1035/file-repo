import { useContext } from 'react';
import { createContext } from "react";
const PermsContext = createContext(null);





export const usePermsContext = () => useContext(PermsContext)

export default PermsContext;
