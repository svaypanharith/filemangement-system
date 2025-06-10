"use client";

interface baseprobs {
  header?: React.ReactNode;
  children?: React.ReactNode;
}

export const Base = ({ header, children }: baseprobs) => {
  return (
    <div className=" flex-col w-full h-screen">
      {header}
      <div className="flex w-full items-center justify-center h-full">
        <div className="flex w-full items-center justify-center ">
          {children}
        </div>
      </div>
    </div>
  );
};
