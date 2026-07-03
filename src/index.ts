/**
 * Roll20 Sheet Worker Scripts — TypeScript definitions.
 *
 * Sourced from the official Roll20 documentation:
 *   - Sheet Worker Scripts:
 *     https://help.roll20.net/hc/en-us/articles/360037773513-Sheet-Worker-Scripts
 *   - Custom Roll Parsing (startRoll / finishRoll):
 *     https://help.roll20.net/hc/en-us/articles/4403865972503-Custom-Roll-Parsing-for-Character-Sheets
 *
 * Verified against the current (live) versions of the above on 2026-07-03.
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

/* --- Custom Roll Parsing --- */

/** A single sub-roll within an expression (e.g. the `4d20` part of `4d20+2d4`). */
export interface SubRoll {
  /** Number of dice rolled (the `4` in `4d20`). */
  dice: number;
  /** Number of sides per die (the `20` in `4d20`). */
  sides: number;
  /** The result of each individual die. */
  results: number[];
}

/** The roll-server result for one named roll field in a template. */
export interface RollResult {
  /** The total result of the roll, as calculated by the roll server. */
  result: number;
  /** Ordered array of the results of all dice in this roll. */
  dice: number[];
  /** The original expression, e.g. `"4d20+2d4"`. */
  expression: string;
  /** Breakdown of each sub-roll (each part of the expression is rolled separately). */
  rolls: SubRoll[];
}

/** The object passed to the `startRoll` callback. */
export interface StartRollResults {
  /** Unique identifier for this roll; pass it to `finishRoll`. */
  rollId: string;
  /** Roll results keyed by the roll-field names used in the template. */
  results: Record<string, RollResult>;
}

/**
 * Initiates a roll for custom parsing. The roll waits (up to 5 seconds) for a
 * matching `finishRoll()` before posting to chat.
 * @param roll The roll string (generally a roll-template string).
 * @param callback Receives the roll-server results.
 */
export declare function startRoll(
  roll: string,
  callback?: (results: StartRollResults) => void
): void;

/**
 * Finishes a roll started by `startRoll()`, optionally supplying computed
 * results. Reference computed values in a template as `computed::<rollname>`.
 * @param rollId The `rollId` from the `startRoll` callback.
 * @param computedResults Map of roll-field names to computed values.
 */
export declare function finishRoll(
  rollId: string,
  computedResults?: Record<string, string | number>
): void;
