export enum EStatusId {
  READ = 1,
  READING = 2,
  WANT = 3,
  LISTENING = 4,
  LISTENED = 5,
}

export type TStatusKey = 'read' | 'reading' | 'want' | 'listening' | 'listened';

interface IStatusMeta {
  readonly label: string;
  readonly key: TStatusKey;
  readonly solidClass: string;
  readonly lightClass: string;
}

export const STATUS_META: Record<EStatusId, IStatusMeta> = {
  [EStatusId.READ]: {
    label: 'Read',
    key: 'read',
    solidClass: 'badge--solid-read',
    lightClass: 'badge--light-read',
  },
  [EStatusId.READING]: {
    label: 'Reading',
    key: 'reading',
    solidClass: 'badge--solid-reading',
    lightClass: 'badge--light-reading',
  },
  [EStatusId.WANT]: {
    label: 'To read',
    key: 'want',
    solidClass: 'badge--solid-want',
    lightClass: 'badge--light-want',
  },
  [EStatusId.LISTENING]: {
    label: 'Listening',
    key: 'listening',
    solidClass: 'badge--solid-listening',
    lightClass: 'badge--light-listening',
  },
  [EStatusId.LISTENED]: {
    label: 'Listened',
    key: 'listened',
    solidClass: 'badge--solid-listened',
    lightClass: 'badge--light-listened',
  },
};

export const STATUS_IDS: EStatusId[] = [
  EStatusId.READ,
  EStatusId.READING,
  EStatusId.WANT,
  EStatusId.LISTENING,
  EStatusId.LISTENED,
];

export const isValidStatusId = (id: number): id is EStatusId =>
  Object.values(EStatusId).includes(id as EStatusId);
