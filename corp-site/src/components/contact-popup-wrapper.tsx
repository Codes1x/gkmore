"use client";

import { usePopup } from "@/contexts/popup-context";
import { ContactPopup } from "@/components/contact-popup";

// Wrapper компонент для использования usePopup хука
export function ContactPopupWrapper() {
  const { isOpen, title, closePopup } = usePopup();
  return <ContactPopup isOpen={isOpen} onClose={closePopup} title={title} />;
}
