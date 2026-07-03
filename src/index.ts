/**
 * Roll20 Sheet Worker Scripts — TypeScript definitions.
 *
 * Sourced from the official Sheet Worker Scripts documentation:
 *   https://help.roll20.net/hc/en-us/articles/360037773513-Sheet-Worker-Scripts
 *
 * Verified against the current (live) version of the above on 2026-07-03.
 */

/** Information passed to sheet-worker event handlers. */
export interface EventInfo {
  /** Full name of the attribute triggering the event (lowercased, may include a RowID). */
  sourceAttribute: string;
  /** Who triggered the event. */
  sourceType: 'player' | 'sheetworker';
  /** Previous value (for change events). */
  previousValue?: string;
  /** New value (for change events). */
  newValue?: string;
  /** For remove events: an object of the removed attributes. */
  removedInfo?: Record<string, string>;
}

/**
 * Registers a listener for a sheet-worker event. Fires for attribute changes,
 * repeating-row removal, reorder changes, and button clicks.
 */
export declare function on(
  event:
    | `change:${string}`
    | `remove:repeating_${string}`
    | `change:_reporder:${string}`
    | `clicked:${string}`,
  callback: (eventInfo: EventInfo) => void
): void;
/** Fires once when the character sheet is opened. */
export declare function on(event: 'sheet:opened', callback: () => void): void;
/** Generic fallback for any other event string. */
export declare function on(
  event: string,
  callback: (...args: unknown[]) => void
): void;

/**
 * Asynchronously retrieves attribute values. Supports the `_max` suffix, e.g.
 * `getAttrs(['strength', 'strength_max'], cb)`. Values are always strings.
 * @param attributes Attribute names (without the `attr_` prefix).
 * @param callback Receives a map of the requested attribute names to their values.
 */
export declare function getAttrs<K extends string>(
  attributes: K[],
  callback: (values: Record<K, string>) => void
): void;

/**
 * Asynchronously sets attribute values.
 * @param values Map of attribute names (without `attr_` prefix) to new values.
 * @param options `{ silent: true }` prevents propagation of change events.
 * @param callback Called once the attributes have been set.
 */
export declare function setAttrs(
  values: Record<string, string | number>,
  options?: { silent?: boolean },
  callback?: () => void
): void;

/**
 * Gets the Row IDs currently present in a repeating section.
 * @param section Section name (without the `repeating_` prefix).
 * @param callback Receives the array of Row IDs.
 */
export declare function getSectionIDs(
  section: string,
  callback: (ids: string[]) => void
): void;

/**
 * Synchronously returns a new random Row ID. Passing this to `setAttrs()` for an
 * attribute in a repeating section creates a new row with that ID.
 */
export declare function generateRowID(): string;

/**
 * Removes an entire repeating-section row and all of its attributes.
 * @param rowID Full Row ID, e.g. `repeating_skills_-KbjuRm...`.
 */
export declare function removeRepeatingRow(rowID: string): void;

/**
 * Retrieves a localized translation string by key.
 * @returns The translation string, or `false` if the key is not found.
 */
export declare function getTranslationByKey(key: string): string | false;

/** Returns the current sheet translation language code (e.g. `"en"`). */
export declare function getTranslationLanguage(): string;

/**
 * Sets the default token's attributes when a sheet is dropped from the compendium.
 * @param values Map of token attribute names to values.
 */
export declare function setDefaultToken(
  values: Record<string, string | number | boolean | null>
): void;
