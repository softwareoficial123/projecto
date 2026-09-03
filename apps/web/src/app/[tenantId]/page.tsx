import { UserPanel } from '@/components/modules/user/UserPanel'; // Nota: asegúrate de la exportación

export default function DashboardPage() {
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <UserPanel />
    </div>
  );
}
