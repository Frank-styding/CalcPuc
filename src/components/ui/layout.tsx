import { IconButton, IIconButton } from "./IconButton";
import { VerificationModal } from "../VerificationModal";

export default function Layout({
  header,
  contain,
  buttons,
  value,
}: Readonly<{
  header: React.ReactNode;
  contain: React.ReactNode;
  buttons: IIconButton[];
  value?: number;
}>) {
  return (
    <div className="relative w-screen h-screen bg-[var(--color-dark)] grid grid-rows-[75px_auto]">
      <div className="border-b border-b-[var(--color-dark2)]">{header}</div>
      <div className="overflow-hidden">{contain}</div>
      <div className="absolute flex flex-col bottom-5 right-5  justify-center items-center gap-5">
        {buttons.map((item, i) => (
          <IconButton
            key={i + "icon"}
            onClick={item.onClick}
            icon={item.icon}
          />
        ))}
      </div>
      {value != undefined && (
        <div className="select-none absolute grid place-content-center w-30 py-3 left-[50%] bottom-5 translate-x-[-50%] bg-[var(--color-dark1)] text-[var(--color-dark3)] text-2xl rounded-lg border border-[var(--color-dark2)]">
          {value}
        </div>
      )}
      <VerificationModal />
    </div>
  );
}
