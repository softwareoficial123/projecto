import { PanelDefinition } from '../types/panel';
import { adminPanel } from '../components/modules/admin';
import { userPanel } from '../components/modules/user';

export const PANEL_REGISTRY: PanelDefinition[] = [
  adminPanel,
  userPanel,
];
