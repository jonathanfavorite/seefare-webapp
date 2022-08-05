import React, { createContext } from "react";

interface DashboardContextProps {}

const DashboardContext = createContext<DashboardContextProps>(null as any);

function DashboardContextProvider(props: any) {
  let contextList: DashboardContextProps = {};
  return (
    <DashboardContext.Provider value={contextList}>
        {props.children}
    </DashboardContext.Provider>
  );
}

export default DashboardContext;
