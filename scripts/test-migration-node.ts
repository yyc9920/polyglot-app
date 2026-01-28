import { 
  migrateLegacyPhrase, 
  migrateIdReferences, 
  migrateLearningStatus 
} from '../src/lib/migration';
import type { LegacyPhrase, MigrationMap, LearningStatus } from '../src/types/schema';
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

function testPhraseMigration() {
  console.log('📝 Testing phrase migration...\n');
  
  const migrationMap: MigrationMap = {};
  const migratedPhrases = LEGACY_TEST_DATA.map(phrase => 
    migrateLegacyPhrase(phrase, migrationMap)
  );
  
  console.log(`✅ Migrated ${migratedPhrases.length} phrases`);
  console.log(`✅ Generated ${Object.keys(migrationMap).length} ID mappings\n`);
  
  console.log('First phrase before migration:');
  console.log(`  - ID: ${LEGACY_TEST_DATA[0].id} (content hash)`);
  console.log(`  - Has createdAt: false`);
  console.log(`  - Has updatedAt: false`);
  console.log(`  - Has isDeleted: false\n`);
  
  console.log('First phrase after migration:');
  console.log(`  - ID: ${migratedPhrases[0].id} (UUID)`);
  console.log(`  - UUID format valid: ${/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(migratedPhrases[0].id)}`);
  console.log(`  - Has createdAt: ${!!migratedPhrases[0].createdAt}`);
  console.log(`  - Has updatedAt: ${!!migratedPhrases[0].updatedAt}`);
  console.log(`  - isDeleted: ${migratedPhrases[0].isDeleted}\n`);
  
  console.log('Migration map sample:');
  const [oldId, newId] = Object.entries(migrationMap)[0];
  console.log(`  ${oldId} → ${newId}\n`);
  
  return { migratedPhrases, migrationMap };
}

function testLearningStatusMigration(migrationMap: MigrationMap) {
  console.log('📊 Testing learning status migration...\n');
  
  const legacyStatus: LearningStatus = {
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
  
  console.log('Before migration:');
  console.log(`  - Completed IDs: ${legacyStatus.completedIds.length}`);
  console.log(`  - First completed ID: ${legacyStatus.completedIds[0]}`);
  console.log(`  - Quiz stats keys: ${Object.keys(legacyStatus.quizStats || {}).length}\n`);
  
  const migratedStatus = migrateLearningStatus(legacyStatus, migrationMap);
  
  console.log('After migration:');
  console.log(`  - Completed IDs: ${migratedStatus.completedIds.length}`);
  console.log(`  - First completed ID: ${migratedStatus.completedIds[0]}`);
  console.log(`  - UUID format valid: ${/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(migratedStatus.completedIds[0])}`);
  console.log(`  - Quiz stats keys: ${Object.keys(migratedStatus.quizStats || {}).length}`);
  console.log(`  - Points preserved: ${migratedStatus.points === legacyStatus.points}\n`);
  
  return migratedStatus;
}

function testIdempotency(migrationMap: MigrationMap) {
  console.log('🔄 Testing idempotency...\n');
  
  const phrase = LEGACY_TEST_DATA[0];
  const firstMigration = migrateLegacyPhrase(phrase, migrationMap);
  const secondMigration = migrateLegacyPhrase(phrase, migrationMap);
  
  const sameId = firstMigration.id === secondMigration.id;
  console.log(`  - Same UUID on re-migration: ${sameId ? '✅' : '❌'}`);
  console.log(`  - First:  ${firstMigration.id}`);
  console.log(`  - Second: ${secondMigration.id}\n`);
  
  return sameId;
}

function main() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  MIGRATION LOGIC TEST (Node.js)');
  console.log('═══════════════════════════════════════════════════════\n');
  
  try {
    const { migratedPhrases, migrationMap } = testPhraseMigration();
    
    const migratedStatus = testLearningStatusMigration(migrationMap);
    
    const idempotent = testIdempotency(migrationMap);
    
    console.log('═══════════════════════════════════════════════════════');
    console.log('  VERIFICATION SUMMARY');
    console.log('═══════════════════════════════════════════════════════\n');
    
    const checks = [
      { name: 'Phrases migrated', pass: migratedPhrases.length === 3 },
      { name: 'UUIDs generated', pass: Object.keys(migrationMap).length === 3 },
      { name: 'Timestamps added', pass: !!migratedPhrases[0].createdAt && !!migratedPhrases[0].updatedAt },
      { name: 'isDeleted set', pass: migratedPhrases[0].isDeleted === false },
      { name: 'Learning status IDs migrated', pass: migratedStatus.completedIds.length === 2 },
      { name: 'Quiz stats migrated', pass: Object.keys(migratedStatus.quizStats || {}).length === 1 },
      { name: 'Idempotent migration', pass: idempotent },
    ];
    
    checks.forEach(check => {
      console.log(`  ${check.pass ? '✅' : '❌'} ${check.name}`);
    });
    
    const allPassed = checks.every(c => c.pass);
    
    console.log('\n═══════════════════════════════════════════════════════');
    if (allPassed) {
      console.log('  ✅ ALL CHECKS PASSED');
      console.log('═══════════════════════════════════════════════════════\n');
      console.log('Migration logic is working correctly!');
      console.log('The app will automatically migrate v1 data on first run.\n');
    } else {
      console.log('  ❌ SOME CHECKS FAILED');
      console.log('═══════════════════════════════════════════════════════\n');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n❌ Test error:', error);
    process.exit(1);
  }
}

main();
