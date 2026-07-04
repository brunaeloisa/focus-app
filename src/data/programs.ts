import HelpIcon from '../assets/help.svg';
import SettingsIcon from '../assets/settings.svg';
import { Settings } from '../components/programs/settings';

interface ProgramData {
  name: string;
  icon: string;
  allowFullscreen: boolean;
  component?: React.ComponentType;
}

export const PROGRAMS_DATA: Record<string, ProgramData> = {
  help: {
    name: 'Ajuda',
    icon: HelpIcon,
    allowFullscreen: true
  },
  settings: {
    name: 'Configurações',
    icon: SettingsIcon,
    component: Settings,
    allowFullscreen: false
  }
};
