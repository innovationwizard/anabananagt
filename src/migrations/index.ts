import * as migration_20260807_033310_initial from './20260807_033310_initial';

export const migrations = [
  {
    up: migration_20260807_033310_initial.up,
    down: migration_20260807_033310_initial.down,
    name: '20260807_033310_initial'
  },
];
