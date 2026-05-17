import { EStatusId } from '../../../constants/statusMap';

interface IBadgeConfig {
  readonly label: string;
  readonly solidClass: string;
  readonly lightClass: string;
}

export const BADGE_CONFIG: Record<EStatusId, IBadgeConfig> = {
  [EStatusId.READ]: {
    label: 'Read',
    solidClass: 'badge--solid-read',
    lightClass: 'badge--light-read',
  },
  [EStatusId.READING]: {
    label: 'Reading',
    solidClass: 'badge--solid-reading',
    lightClass: 'badge--light-reading',
  },
  [EStatusId.WANT]: {
    label: 'To read',
    solidClass: 'badge--solid-want',
    lightClass: 'badge--light-want',
  },
  [EStatusId.LISTENING]: {
    label: 'Listening',
    solidClass: 'badge--solid-listening',
    lightClass: 'badge--light-listening',
  },
  [EStatusId.LISTENED]: {
    label: 'Listened',
    solidClass: 'badge--solid-listened',
    lightClass: 'badge--light-listened',
  },
};
