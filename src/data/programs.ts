import HelpIcon from '../assets/help.svg';
import ConfigIcon from '../assets/config.svg';

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
  config: {
    name: 'Configurações',
    icon: ConfigIcon
  }
};
