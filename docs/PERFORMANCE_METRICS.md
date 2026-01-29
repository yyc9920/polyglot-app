# Performance Baselines & Instrumentation

## Overview
This document tracks the performance metrics for critical paths in the application. Metrics are collected using `PerformanceMonitor` (src/lib/performance.ts).

## Critical Thresholds

| Metric | Target | Warning | Critical |
|--------|--------|---------|----------|
| **App Startup (TTI)** | < 1000ms | > 1500ms | > 3000ms |
| **Sync Merge (5k items)** | < 50ms | > 200ms | > 1000ms |
| **Local Read (PhraseList)**| < 50ms | > 100ms | > 500ms |

## Benchmark Results (2026-01-29)

### 1. Sync Logic (FSRS Merge)
*Measured using `src/performance.test.ts` on Node.js environment.*

*   **Scenario A:** 5k local items + 1k cloud updates
    *   Result: ~10ms
    *   Status: ✅ PASS

*   **Scenario B (Heavy):** 5k local items + 5k cloud items (50% overlap)
    *   Result: ~20ms
    *   Status: ✅ PASS

### 2. Storage Operations
*Measured on Mobile Device (Pixel 6, Chrome)*

*   **Initial Load (IndexedDB):** ~120ms (for 200 items)
*   **Write Latency (IndexedDB):** ~15ms

## Instrumentation Points

The following critical paths are instrumented:

1.  **`StorageService.readLocal`**: Measures time to read from IndexedDB.
2.  **`StorageService.writeLocal`**: Measures time to persist to IndexedDB.
3.  **`StorageService.writeToCloud`**: Measures time to serialize and push to Firestore.
4.  **`PhraseContext:uniquePhrases`**: Measures deduplication logic cost.
5.  **`PhraseContext:mergePhrasesWithFSRS`**: Measures the full sync merge cost.

## How to Measure

### Run Benchmarks
```bash
pnpm test src/performance.test.ts
```

### Runtime Metrics
Open the browser console and filter for `[Performance]`.
