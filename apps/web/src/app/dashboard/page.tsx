"use client";
import dynamic from "next/dynamic";

// Carga dinámica según rol (Simulación de RBAC)
const AdminPanel = dynamic(() => import("../../components/AdminPanel"), {
  loading: () => <p>Loading Admin...</p>,
});
const UserPanel = dynamic(() => import("../../components/UserPanel"), {
  loading: () => <p>Loading User...</p>,
});

export default function Dashboard() {
  // En un caso real: obtener rol desde un hook o contexto de Auth
  const role: "ADMIN" | "USER" = "ADMIN" as "ADMIN" | "USER";

  return (
    <div>
      <h1>Dashboard</h1>
      {role === "ADMIN" && <AdminPanel />}
      {role === "USER" && <UserPanel />}
    </div>
  );
}
