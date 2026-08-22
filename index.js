const cacheSuffix = new URL(import.meta.url).search;
const { diceRomanceSpecialV73 } = await import('./tables/dice-romance-special-v7-3.js' + cacheSuffix);
const { romanceSeasoningTable } = await import('./tables/romance-seasoning-table.js' + cacheSuffix);
const { romanceSpecialMinimalV11 } = await import('./tables/romance-special-minimal-v1-1.js' + cacheSuffix);
const { diceRomanceSpecialV73TwoPlayer } = await import('./tables/dice-romance-special-v7-3-two-player.js' + cacheSuffix);
const { diceRomanceNarrativeV2 } = await import('./tables/dice-romance-narrative-v2.js' + cacheSuffix);
const { noDiceRomanceSpecialV73 } = await import('./tables/no-dice-romance-special-v7-3.js' + cacheSuffix);
const { noDiceRomanceSpecialV73TwoPlayer } = await import('./tables/no-dice-romance-special-v7-3-two-player.js' + cacheSuffix);
const { diceRomanceMinimalRoseAdapter } = await import('./tables/dice-romance-minimal-rose-adapter.js' + cacheSuffix);
const { tianyinTimeRecallV49 } = await import('./progressions/tianyin-time-recall-v4-9.js' + cacheSuffix);
const { tianyinRomanceRecallV12 } = await import('./progressions/tianyin-romance-recall-v1-2.js' + cacheSuffix);
const { tianyinTimeInformationBoundaryV24 } = await import('./progressions/tianyin-time-information-boundary-v2-4.js' + cacheSuffix);

export const databaseResourcePackage = {
  schemaVersion: 1,
  version: 'main',
  defaultTable: 'dice-romance-special-v7-3',
  defaultProgression: 'tianyin-time-recall-v4-9',
  tables: [diceRomanceSpecialV73, romanceSeasoningTable, romanceSpecialMinimalV11, diceRomanceSpecialV73TwoPlayer, diceRomanceNarrativeV2, noDiceRomanceSpecialV73, noDiceRomanceSpecialV73TwoPlayer, diceRomanceMinimalRoseAdapter],
  progressions: [tianyinTimeRecallV49, tianyinRomanceRecallV12, tianyinTimeInformationBoundaryV24],
};
