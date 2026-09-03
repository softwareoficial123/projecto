import AdminPanel from './AdminPanel';
import { PanelDefinition } from '../../../types/panel';

export const adminPanel: PanelDefinition = {
  id: 'admin',
  title: 'Panel de Administración',
  icon: 'settings',
  component: AdminPanel,
  roles: ['admin'],
  isPublic: false,
};
