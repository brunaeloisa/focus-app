import HelpIcon from '../assets/help.svg';
import SettingsIcon from '../assets/settings.svg';
import { Settings } from '../programs/Settings';

interface ProgramData {
  name: string;
  icon: string;
  component?: React.ComponentType;
}

export const PROGRAMS_DATA: Record<string, ProgramData> = {
  help: {
    name: 'Ajuda',
    icon: HelpIcon
  },
  settings: {
    name: 'Configurações',
    icon: SettingsIcon,
    component: Settings
  }
};
