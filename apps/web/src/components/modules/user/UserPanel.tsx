'use client';
import { clientLogger } from '@/lib/client-logger';

export function UserPanel() {
  const handleClick = () => {
    clientLogger.info('Botón del UserPanel clickeado');
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold">Panel de Usuario</h2>
      <button 
        onClick={handleClick}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Click para test de logs
      </button>
    </div>
  );
}
