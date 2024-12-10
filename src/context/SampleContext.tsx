import { createContext, ReactNode, useContext } from "react";

type SampleContextValue = {
  executeRequest: () => void;
};

export const SampleContext = createContext<SampleContextValue | undefined>(
  undefined
);

export const useSampleContext = () => {
  const context = useContext(SampleContext);

  if (!context) {
    throw new Error("useSampleContext must be used within an SampleProvider");
  }

  return context;
};

export const SampleProvider = ({ children }: { children: ReactNode }) => {
  const executeRequest = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  };

  const contextValue = {
    executeRequest,
  };

  // typically you will ned SampleContext.Provider but since v19 you don't need that.
  return <SampleContext value={contextValue}>{children}</SampleContext>;
};
