// "use client";
// import SidebarLayout from "@/app/layout/sidebarlayout";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <SidebarLayout>{children}</SidebarLayout>;
// }


import { Statistic } from '@/components/statistic/statistic'

import AdminLayout from '@/components/layout/AdminLayout'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLayout>
        {children}
    </AdminLayout>
  )
}

