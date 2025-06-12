import { create } from "zustand";
interface IVerificationModal {
  visible: boolean;
  message: string;
  acceptName: string;
  callback?: () => void;
  showValidation: (
    message: string,
    acceptName: string,
    callback: () => void
  ) => void;
  hideModal: () => void;
}
export const useVerificationModal = create<IVerificationModal>()((set) => ({
  visible: false,
  message: "",
  acceptName: "",
  hideModal: () => set(() => ({ visible: false })),
  showValidation: (message, acceptName, callback) =>
    set(() => ({
      message,
      acceptName,
      callback,
      visible: true,
    })),
}));
