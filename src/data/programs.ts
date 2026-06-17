import HelpIcon from '../assets/help.svg';

interface ProgramStructure {
  name: string;
  icon: string;
  component?: React.ComponentType;
}

export const PROGRAMS_DATA: Record<string, ProgramStructure> = {
  ajuda: {
    name: 'Ajuda',
    icon: HelpIcon
  },
  exemplo: {
    name: 'Programa de Exemplo',
    icon: HelpIcon
  }
};
