import { get, set, clear } from 'idb-keyval';
import { runMigration, getStorageMetadata } from '../src/lib/migration';
import type { LegacyPhrase } from '../src/types/schema';
import { generateId } from '../src/lib/utils';

const LEGACY_TEST_DATA: LegacyPhrase[] = [
  {
    id: generateId('Hello', 'こんにちは'),
    meaning: 'Hello',
    sentence: 'こんにちは',
    pronunciation: 'Konnichiwa',
    tags: ['Greeting', 'Japanese'],
  },
  {
    id: generateId('Thank you', 'ありがとう'),
    meaning: 'Thank you',
    sentence: 'ありがとう',
    pronunciation: 'Arigatou',
    tags: ['Greeting', 'Japanese'],
    memo: 'Common phrase',
  },
  {
    id: generateId('Good morning', 'おはよう'),
    meaning: 'Good morning',
    sentence: 'おはよう',
    pronunciation: 'Ohayou',
    tags: ['Greeting', 'Japanese'],
  },
];

const LEGACY_LEARNING_STATUS = {
  completedIds: [
    generateId('Hello', 'こんにちは'),
    generateId('Thank you', 'ありがとう'),
  ],
  incorrectIds: [generateId('Good morning', 'おはよう')],
  points: 150,
  learningLanguage: 'ja',
  quizStats: {
    [generateId('Hello', 'こんにちは')]: {
      correct: ['writing', 'interpretation'],
      incorrect: [],
    },
  },
};

async function setupLegacyData() {
  console.log('🔧 Setting up legacy v1 data...\n');
  
  await set('phraseList', LEGACY_TEST_DATA);
  await set('learningStatus', LEGACY_LEARNING_STATUS);
  
  console.log('✅ Legacy data created:');
  console.log(`   - ${LEGACY_TEST_DATA.length} phrases with content-based IDs`);
  console.log(`   - ${LEGACY_LEARNING_STATUS.completedIds.length} completed IDs`);
  console.log(`   - ${LEGACY_LEARNING_STATUS.incorrectIds.length} incorrect IDs`);
  console.log(`   - ${Object.keys(LEGACY_LEARNING_STATUS.quizStats || {}).length} quiz stats entries\n`);
}

async function testMigration() {
  console.log('🚀 Starting migration test...\n');
  
  const metadataBefore = await getStorageMetadata();
  console.log('📊 Metadata before migration:');
  console.log(`   - Schema version: ${metadataBefore.schemaVersion}`);
  console.log(`   - Migration log entries: ${metadataBefore.migrationLog?.length || 0}\n`);
  
  const result = await runMigration();
  
  console.log('📈 Migration result:');
  console.log(`   - Success: ${result.success}`);
  console.log(`   - Migrated count: ${result.migratedCount}`);
  console.log(`   - Error: ${result.error || 'None'}\n`);
  
  if (!result.success) {
    console.error('❌ Migration failed!');
    return false;
  }
  
  const metadataAfter = await getStorageMetadata();
  console.log('📊 Metadata after migration:');
  console.log(`   - Schema version: ${metadataAfter.schemaVersion}`);
  console.log(`   - Last migration: ${metadataAfter.lastMigrationAt}`);
  console.log(`   - Migration log entries: ${metadataAfter.migrationLog?.length || 0}\n`);
  
  const migratedPhrases = await get('phraseList');
  const migratedStatus = await get('learningStatus');
  
  console.log('✅ Migrated data verification:');
  console.log(`   - Phrases: ${migratedPhrases?.length || 0}`);
  
  if (migratedPhrases && migratedPhrases.length > 0) {
    const firstPhrase = migratedPhrases[0];
    console.log('\n   First phrase structure:');
    console.log(`     - id: ${firstPhrase.id} (UUID format: ${/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(firstPhrase.id)})`);
    console.log(`     - meaning: ${firstPhrase.meaning}`);
    console.log(`     - sentence: ${firstPhrase.sentence}`);
    console.log(`     - createdAt: ${firstPhrase.createdAt}`);
    console.log(`     - updatedAt: ${firstPhrase.updatedAt}`);
    console.log(`     - isDeleted: ${firstPhrase.isDeleted}`);
  }
  
  console.log('\n   Learning status:');
  console.log(`     - Completed IDs: ${migratedStatus?.completedIds?.length || 0}`);
  console.log(`     - Incorrect IDs: ${migratedStatus?.incorrectIds?.length || 0}`);
  console.log(`     - Quiz stats entries: ${Object.keys(migratedStatus?.quizStats || {}).length}`);
  
  if (migratedStatus?.completedIds && migratedStatus.completedIds.length > 0) {
    const firstCompletedId = migratedStatus.completedIds[0];
    console.log(`     - First completed ID: ${firstCompletedId} (UUID format: ${/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(firstCompletedId)})`);
  }
  
  console.log('\n   Migration map:');
  console.log(`     - Entries: ${Object.keys(result.migrationMap).length}`);
  if (Object.keys(result.migrationMap).length > 0) {
    const [oldId, newId] = Object.entries(result.migrationMap)[0];
    console.log(`     - Example: ${oldId.substring(0, 8)}... → ${newId}`);
  }
  
  const backup = await get('phraseList_backup_v1');
  console.log(`\n   Backup: ${backup ? 'Cleaned up ✓' : 'Still exists (unexpected)'}`);
  
  return true;
}

async function verifyIdempotency() {
  console.log('\n🔄 Testing idempotency (running migration again)...\n');
  
  const result = await runMigration();
  
  console.log('📈 Second migration result:');
  console.log(`   - Success: ${result.success}`);
  console.log(`   - Migrated count: ${result.migratedCount} (should be 0)`);
  console.log(`   - Already at v2: ${result.migratedCount === 0 ? '✓' : '✗'}\n`);
  
  return result.success && result.migratedCount === 0;
}

async function cleanup() {
  console.log('🧹 Cleaning up test data...\n');
  await clear();
  console.log('✅ IndexedDB cleared\n');
}

async function main() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  MIGRATION TEST SCRIPT');
  console.log('═══════════════════════════════════════════════════════\n');
  
  try {
    await setupLegacyData();
    
    const migrationSuccess = await testMigration();
    if (!migrationSuccess) {
      console.error('\n❌ Migration test FAILED\n');
      process.exit(1);
    }
    
    const idempotencySuccess = await verifyIdempotency();
    if (!idempotencySuccess) {
      console.error('\n❌ Idempotency test FAILED\n');
      process.exit(1);
    }
    
    await cleanup();
    
    console.log('═══════════════════════════════════════════════════════');
    console.log('  ✅ ALL TESTS PASSED');
    console.log('═══════════════════════════════════════════════════════\n');
    
  } catch (error) {
    console.error('\n❌ Test script error:', error);
    process.exit(1);
  }
}

main();
