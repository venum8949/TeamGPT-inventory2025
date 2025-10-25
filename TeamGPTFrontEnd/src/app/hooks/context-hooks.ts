import { createContext, Dispatch, useContext, useState } from 'react';
import { LoginResponse } from '../models/TeamGPTInventory/login-response';

export const GlobalContext = createContext<{globalState: GlobalStateInterface, setGlobalState: Dispatch<React.SetStateAction<GlobalStateInterface>>}>(undefined as any);
export const useGlobalContext = () => useContext(GlobalContext);

export const useGlobalState = () => {
  const initialState = {
    user: undefined
  } as GlobalStateInterface;

  const [globalState, setGlobalState] = useState<GlobalStateInterface>(initialState);

  return { globalState, setGlobalState };
};

interface GlobalStateInterface {
  user: LoginResponse | undefined;
}
