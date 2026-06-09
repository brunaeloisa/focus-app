export interface AppWindow {
  id: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
  z?: number;
}
