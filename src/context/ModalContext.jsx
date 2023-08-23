import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

export const ModalTypes = {
  LOGIN: "login",
  CONFIRM: "confirm",
  DELETE_USER: "deleteUser",
};

const ModalContext = createContext();

export function ModalContextProvider({ children }) {
  const [modalState, setModalState] = useState({ type: null, isOpen: false });

  const openModal = (modalType) => {
    setModalState({ type: modalType, isOpen: true });
  };

  const closeModal = (modalType) => {
    setModalState({ type: modalType, isOpen: false });
  };

  return (
    <ModalContext.Provider
      value={{
        modalState,
        setModalState,
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
