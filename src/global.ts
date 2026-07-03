/**
 * Ambient global declarations for sheet-worker scripts that use the functions
 * directly, without importing them (the usual sheet-worker authoring style).
 *
 * Enable by adding `"roll20-sheetworker-ts/global"` to your tsconfig `types`, or
 * with a triple-slash reference at the top of a script:
 *
 *   /// <reference types="roll20-sheetworker-ts/global" />
 *
 * For the import style (`import { on, getAttrs } from 'roll20-sheetworker-ts'`),
 * use the package's main entry point instead — you do not need this file.
 */
import type * as SW from './index'

declare global {
  const on: typeof SW.on
  const getAttrs: typeof SW.getAttrs
  const setAttrs: typeof SW.setAttrs
  const getSectionIDs: typeof SW.getSectionIDs
  const generateRowID: typeof SW.generateRowID
  const removeRepeatingRow: typeof SW.removeRepeatingRow
  const getTranslationByKey: typeof SW.getTranslationByKey
  const getTranslationLanguage: typeof SW.getTranslationLanguage
  const setDefaultToken: typeof SW.setDefaultToken
  const startRoll: typeof SW.startRoll
  const finishRoll: typeof SW.finishRoll
}

export {}
