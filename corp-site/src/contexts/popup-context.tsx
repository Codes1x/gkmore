"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface PopupContextType {
  isOpen: boolean;
  title: string;
  openPopup: (title?: string) => void;
  closePopup: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

interface PopupProviderProps {
  children: ReactNode;
}

export function PopupProvider({ children }: PopupProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("Свяжитесь с нами");

  const openPopup = (customTitle?: string) => {
    if (customTitle) setTitle(customTitle);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    // Сбрасываем заголовок на дефолтный через небольшую задержку
    setTimeout(() => setTitle("Свяжитесь с нами"), 300);
  };

  return (
    <PopupContext.Provider value={{ isOpen, title, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
}
