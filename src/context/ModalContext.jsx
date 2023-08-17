import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const ModalContext = createContext();

export function ModalContextProvider({ children }) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const openModal = () => {
    setLoginModalOpen(true);
  };

  const closeModal = () => {
    setLoginModalOpen(false);
  };
  return (
    <ModalContext.Provider
      value={{
        loginModalOpen,
        setLoginModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  return useContext(ModalContext);
}
