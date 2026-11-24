import AdminDashboardLayout from "@/components/adminComp/Common/AdminDashboardLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}
