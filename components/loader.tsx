import Image from "next/image";

export const Loader: React.FC = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image alt="logo" fill src="/logo.png" />
      </div>
      <p className="text-muted-foreground text-sm text-center">
        My AI is thinking...
      </p>
    </div>
  );
};
