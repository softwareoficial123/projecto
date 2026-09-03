import { PANEL_REGISTRY } from '../../lib/registry';
import Link from 'next/link';
import { ThemeSwitcher } from '../../components/core/ThemeSwitcher';

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { tenantId: string };
}) {
  const userRole = 'user';
  const accessiblePanels = PANEL_REGISTRY.filter(
    (panel) => panel.isPublic || panel.roles.includes(userRole)
  );

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar - Responsive: Hidden on small screens, block on md+ */}
      <nav className="w-full md:w-64 bg-gray-100 dark:bg-gray-800 p-4 border-b md:border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">CRM: {params.tenantId}</h1>
          <ThemeSwitcher />
        </div>
        <ul className="space-y-2 flex-1">
          {accessiblePanels.map((panel) => (
            <li key={panel.id}>
              <Link
                href={`/${params.tenantId}#${panel.id}`}
                className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {panel.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {children}
      </main>
    </div>
  );
}
