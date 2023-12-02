import { useState } from 'react';

export default function useModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return [isOpen, close, open];
}
