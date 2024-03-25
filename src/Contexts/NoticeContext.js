import React, { createContext, useContext, useState } from "react";

const NewNoticeContext = createContext();

export const useNewNotice = () => {
  return useContext(NewNoticeContext);
};

export const NewNoticeProvider = ({ children }) => {
  const [newNotice, setNewNotice] = useState(0);

  const updateNewNotice = (newNotice) => {
    setNewNotice(newNotice);
  };

  const value = { newNotice, updateNewNotice };

  return (
    <NewNoticeContext.Provider value={value}>
      {children}
    </NewNoticeContext.Provider>
  );
};
