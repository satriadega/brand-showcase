import { useState } from "react";

export default function useToggle() {
  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  return {
    show,
    handleOpen,
    handleClose,
  };
}
