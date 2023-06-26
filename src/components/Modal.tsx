import { FC } from "react";

import { ModalProps } from "../utils/component";

const Modal: FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
