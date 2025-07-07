import { createContext, useContext } from "react";
import type { SaitamaClient } from "@saitamafun/sdk";

type APIContext = {
  api: InstanceType<typeof SaitamaClient>;
};

export const APIContext = createContext<Partial<APIContext>>({
  api: undefined,
});

export const useAPI = () => useContext(APIContext) as APIContext;
