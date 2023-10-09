import { createContext, useState, useEffect } from "react";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [option, setOption] = useState({
    grouping: "status",
    sortOption: "priority",
  });

  useEffect(() => {
    const storedOption = localStorage.getItem("option");
    if (storedOption && storedOption) {
      const parsedOption = JSON.parse(storedOption);
      setOption(parsedOption);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("option", JSON.stringify(option));
  }, [option]);

  return (
    <StateContext.Provider
      value={{
        option,
        setOption,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
