import { useVerificationModal } from "@/hooks/useVerificationModal";

export const VerificationModal = () => {
  const { visible, message, acceptName, callback, hideModal } =
    useVerificationModal();

  const buttonClassName = [
    "cursor-pointer select-none w-30 h-10  bg-[var(--color-dark)] rounded-lg grid place-content-center border-1 border-[var(--color-dark2)]",
    "hover:opacity-80 hover:bg-[var(--color-dark1)]",
  ].join(" ");

  if (!visible) return <></>;

  const handleAccept = () => {
    hideModal();
    callback?.();
  };

  const handleCancel = () => {
    hideModal();
  };
  return (
    <div className="w-screen h-screen absolute grid place-content-center">
      <div className="w-screen h-screen relative">
        <div className="absolute w-screen h-screen opacity-70 bg-[var(--color-dark1)] inset-0 backdrop-blur-sm" />
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-80 h-50 bg-[var(--color-dark1)] rounded-xl border-1 border-[var(--color-dark2)]">
          <div className="w-full h-full grid grid-rows-[auto_50px] ">
            <div className="grid place-content-center text-xl text-[var(--color-dark3)] px-8">
              {message}
            </div>
            <div className="flex justify-center gap-8 text-lg">
              <div
                className={buttonClassName + " text-[var(--color-primary)]"}
                onClick={handleAccept}
              >
                {acceptName}
              </div>
              <div
                className={buttonClassName + " text-[var(--color-dark3)]"}
                onClick={handleCancel}
              >
                {"Cancelar"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
