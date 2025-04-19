/**
 * Roll20 Sheet Worker Scripts TypeScript definitions
 * Generated from https://help.roll20.net/hc/en-us/articles/360037773513-Sheet-Worker-Scripts
 */

/** Information passed to event handlers */
interface EventInfo {
    /** Full name of the attribute triggering the event (lowercased, may include RowID) */
    sourceAttribute: string;
    /** Who triggered the event ("player" or "sheetworker") */
    sourceType: 'player' | 'sheetworker';
    /** Previous value (for change events) */
    previousValue?: string;
    /** New value (for change events) */
    newValue?: string;
    /** For remove events: object of removed attributes */
    removedInfo?: Record<string, string>;
  }
  
  /** Event listener for sheet worker events */
  declare function on(event: `change:${string}` | `remove:repeating_${string}` | `change:_reporder:${string}` | `clicked:${string}`, callback: (eventInfo: EventInfo) => void): void;
  /** Fired when a sheet is opened */
  declare function on(event: 'sheet:opened', callback: () => void): void;
  /** Generic fallback for other events */
  declare function on(event: string, callback: (...args: unknown[]) => void): void;
  
  /**
   * Retrieves values of attributes asynchronously.
   * @param attributes Array of attribute names (supports "_max" suffix)
   * @param callback Called with a map of attribute names to their values
   */
  declare function getAttrs<K extends string>(attributes: K[], callback: (values: Record<K, string>) => void): void;
  
  /**
   * Sets values of attributes asynchronously.
   * @param values Map of attribute names to new values
   * @param options Optional settings (e.g., { silent: true })
   * @param callback Called when attributes have been updated
   */
  declare function setAttrs(values: Record<string, string | number>, options?: { silent?: boolean }, callback?: () => void): void;
  
  /**
   * Gets the IDs of all rows in a repeating section.
   * @param section Name of the section (without "repeating_" prefix)
   * @param callback Called with an array of Row IDs
   */
  declare function getSectionIDs(section: string, callback: (ids: string[]) => void): void;
  
  /** Generates a new unique Row ID for repeating sections */
  declare function generateRowID(): string;
  /**
   * Removes an entire repeating section row and its attributes.
   * @param rowID Full Row ID (e.g., "repeating_skills_-KbjuRm...")
   */
  declare function removeRepeatingRow(rowID: string): void;
  
  /**
   * Retrieves a localized translation string by key.
   * @param key Translation key
   * @returns The translation string, or false if not found
   */
  declare function getTranslationByKey(key: string): string | false;
  /** Returns the current sheet translation language code (e.g., "en") */
  declare function getTranslationLanguage(): string;
  
  /**
   * Sets default token attributes on compendium drop.
   * @param values Map of token attribute names to values
   */
  declare function setDefaultToken(values: Record<string, string | number | boolean | null>): void;
