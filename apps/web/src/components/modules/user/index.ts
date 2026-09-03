import { UserPanel } from './UserPanel';
import { PanelDefinition } from '../../../types/panel';

export const userPanel: PanelDefinition = {
  id: 'user',
  title: 'Panel de Usuario',
  icon: 'user',
  component: UserPanel,
  roles: ['admin', 'user'],
  isPublic: false,
};
