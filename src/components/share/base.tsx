"use client";
import Header from "./header";
interface baseprobs {
  header?: React.ReactNode;
  children?: React.ReactNode;
  title?: string;
}

export const Base = ({ header, children, title }: baseprobs) => {
  return (
     <div className="p-2 h-screen">
      <Header back title={title || ""} />
      <div className="flex w-full items-center justify-center h-full">
        {children}
      </div>
     </div>
  );
};
