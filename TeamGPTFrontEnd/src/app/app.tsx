import { Outlet } from "react-router-dom";
import { GlobalContext, useGlobalState } from "./hooks/context-hooks";

export default function App() {

  const { globalState, setGlobalState } = useGlobalState();

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      <Outlet />
    </GlobalContext.Provider>
  )
}
