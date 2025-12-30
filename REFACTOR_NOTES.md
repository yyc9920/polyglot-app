2025. 12. 30. (화) 09:39:56 KST

Refactoring complete.

1.  **LearnView.tsx**:
    *   Added `CheckCircle` (Green) and `AlertCircle` (Red) icons to the top-right corner of both the front and back of the flashcards. These icons appear if the item is marked as "Learned" or "To Review" respectively.
    *   Integrated `reviewMode` from context. When active, it filters the list to show only incorrect items.

2.  **BuilderView.tsx**:
    *   Refactored the "Stored Items" list. The header is now fixed above the scrollable list area, preventing items from scrolling "behind" the header in a way that causes visibility issues.
    *   Removed the "CSV from URL" section as this functionality has been promoted to a more robust "Content Sources" management in Settings.

3.  **SettingsView.tsx**:
    *   Added a **"Start Review Session"** button in the "Learning Progress" section. This button is enabled when there are incorrect items and switches the user to `LearnView` in review mode.
    *   Added a new **"Content Sources (CSV)"** section. Users can now add multiple CSV URLs. The application will automatically fetch and merge data from all these sources on startup (or when the list changes).
    *   The "Update from Saved" functionality in Builder has been effectively replaced by this multi-source management.

4.  **VocabContext.tsx**:
    *   Updated to manage `savedUrls` (array) instead of a single `savedUrl`.
    *   Added `reviewMode` state.
    *   Added migration logic to preserve any existing saved URL by moving it to the new array.
    *   Updated auto-fetch logic to handle multiple URLs.

Build verified successfully.

Created by gemini-cli.
