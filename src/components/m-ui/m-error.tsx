"use client";
interface MErrorProps {
  error: string;
}
export default function MError({ error }: MErrorProps) {
  return <div className="text-red-500">{error}</div>;
}
