import "@/styles/globals.css";
import { IconButton, IIconButton } from "./IconButton";

export default function Layout({
  header,
  contain,
  buttons,
}: Readonly<{
  header: React.ReactNode;
  contain: React.ReactNode;
  buttons: IIconButton[];
}>) {
  return (
    <div className="relative w-screen h-screen bg-[var(--color-dark)] grid grid-rows-[75px_auto]">
      <div className="border-b border-b-[var(--color-dark2)]">{header}</div>
      <div className="overflow-hidden">{contain}</div>
      <div className="absolute w-screen h-10 bottom-8 l-0 flex justify-center items-center gap-5">
        {buttons.map((item, i) => (
          <IconButton
            key={i + "icon"}
            onClick={item.onClick}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}
