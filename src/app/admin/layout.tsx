// app/admin/layout.tsx
import AdminNav from '@/components/admin-nav'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminNav />
      <div className="flex-grow">
        {children}
      </div>
    </div>
  )
}