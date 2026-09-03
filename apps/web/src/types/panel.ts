export interface PanelDefinition {
  id: string;
  title: string;
  icon: string;
  component: React.ComponentType;
  roles: string[];
  isPublic: boolean;
}
