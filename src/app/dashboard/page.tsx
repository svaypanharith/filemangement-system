import { Statistic } from "@/components/statistic/statistic";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Statistic />
    </div>
  );
}
