import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aesthura Admin",
  description: "Studio admin dashboard",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      {children}
    </div>
  );
}
