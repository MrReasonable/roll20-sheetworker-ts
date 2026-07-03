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

/**
 * A single die within a dice roll group. (The CRP docs show `results` as a
 * plain number array, but the roll server returns die objects — verified
 * against the official Roll20 character sheets.)
 */
export interface DieResult {
  /** The value rolled on this die. */
  v: number;
  /** True if the die was dropped (e.g. by keep/drop modifiers). */
  d?: boolean;
}

/** A single modifier applied to a roll (keep/drop, exploding, reroll, …). */
export interface RollMod {
  /** The modifier name. */
  name: string;
  [key: string]: unknown;
}

/** Modifiers applied to a dice or grouped roll. */
export interface RollMods {
  /** Ordered list of applied modifiers. */
  mod?: RollMod[];
  /** Success-count comparison and threshold. */
  success?: { comp: string; point: number };
  /** Failure-count comparison and threshold. */
  fail?: { comp: string; point: number };
  [key: string]: unknown;
}

/** A dice roll (`type: "R"`) — e.g. the `4d20` in `4d20+2d4`. */
export interface DiceRoll {
  type: 'R';
  /** Number of dice rolled (the `4` in `4d20`). */
  dice: number;
  /** Number of sides per die (the `20` in `4d20`). */
  sides: number;
  /** The individual die results. */
  results: DieResult[];
  /** Modifiers applied to this roll. */
  mods?: RollMods;
}

/** A math term (`type: "M"`) — an operator or constant, e.g. `"+"` or `"2"`. */
export interface MathTerm {
  type: 'M';
  /** The literal expression. */
  expr: string;
}

/** A grouped roll (`type: "G"`) — e.g. `{1d20,1d12}kh1`. */
export interface GroupedRoll {
  type: 'G';
  /** The nested roll groups. */
  rolls: RollGroup[][];
  /** Modifiers applied to the group. */
  mods?: RollMods;
}

/** An inline comment (`type: "C"`). */
export interface RollComment {
  type: 'C';
  /** The comment text. */
  text: string;
}

/** A label (`type: "L"`) — the text following a `[[ … ]]` roll. */
export interface RollLabel {
  type: 'L';
  /** The label text. */
  text: string;
}

/**
 * One entry in a roll's `rolls` breakdown — a discriminated union on `type`.
 * Kinds verified against the official Roll20 character sheets:
 * `"R"` dice · `"M"` math · `"G"` group · `"C"` comment · `"L"` label.
 */
export type RollGroup =
  | DiceRoll
  | MathTerm
  | GroupedRoll
  | RollComment
  | RollLabel;

/** The roll-server result for one named roll field in a template. */
export interface RollResult {
  /** The total result of the roll, as calculated by the roll server. */
  result: number;
  /** Ordered array of the values of all dice in this roll. */
  dice: number[];
  /** The original expression, e.g. `"4d20+2d4"`. */
  expression: string;
  /** Per-sub-roll breakdown (each part of the expression is rolled separately). */
  rolls: RollGroup[];
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
