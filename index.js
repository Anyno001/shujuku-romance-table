const cacheSuffix = new URL(import.meta.url).search;
const { romanceMinimalTable } = await import('./tables/romanceMinimalTable.js' + cacheSuffix);
const { tianyinzhiyinRomanceRecallV12 } = await import('./progressions/tianyinzhiyinRomanceRecallV12.js' + cacheSuffix);

export const databaseResourcePackage = {
  schemaVersion: 1,
  version: 'main',
  tables: [romanceMinimalTable],
  progressions: [tianyinzhiyinRomanceRecallV12],
};
