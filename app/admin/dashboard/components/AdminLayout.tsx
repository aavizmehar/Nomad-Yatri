// components/AdminLayout.tsx
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:block">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-400">Admin Panel</h2>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded hover:bg-slate-800 transition">Overview</Link>
          <Link href="/admin/users" className="block px-4 py-2 rounded hover:bg-slate-800 transition">User Management</Link>
          <Link href="/admin/hosts" className="block px-4 py-2 rounded hover:bg-slate-800 transition">Host Approvals</Link>
          <Link href="/admin/programs" className="block px-4 py-2 rounded hover:bg-slate-800 transition">Programs</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}