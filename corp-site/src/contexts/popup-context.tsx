"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface PopupOptions {
  title?: string;
  source?: string;
}

interface PopupContextType {
  isOpen: boolean;
  title: string;
  source?: string;
  openPopup: (options?: string | PopupOptions) => void;
  closePopup: () => void;
}

const DEFAULT_TITLE = "Свяжитесь с нами";
const DEFAULT_SOURCE = "Сайт ГК Море";

const PopupContext = createContext<PopupContextType | undefined>(undefined);

interface PopupProviderProps {
  children: ReactNode;
}

export function PopupProvider({ children }: PopupProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [source, setSource] = useState<string | undefined>(DEFAULT_SOURCE);

  const openPopup = (options?: string | PopupOptions) => {
    if (typeof options === "string") {
      setTitle(options);
      setSource(DEFAULT_SOURCE);
    } else if (options && typeof options === "object") {
      setTitle(options.title ?? DEFAULT_TITLE);
      setSource(options.source ?? DEFAULT_SOURCE);
    } else {
      setTitle(DEFAULT_TITLE);
      setSource(DEFAULT_SOURCE);
    }
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    // Сбрасываем значения на дефолтные через небольшую задержку
    setTimeout(() => {
      setTitle(DEFAULT_TITLE);
      setSource(DEFAULT_SOURCE);
    }, 300);
  };

  return (
    <PopupContext.Provider value={{ isOpen, title, source, openPopup, closePopup }}>
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
