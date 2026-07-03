// Type-level smoke tests for the module (import) entry point.
// Compiled by `pnpm run test:types` — no runtime, existence is the assertion.
import {
  on,
  getAttrs,
  setAttrs,
  getSectionIDs,
  generateRowID,
  removeRepeatingRow,
  getTranslationByKey,
  getTranslationLanguage,
  setDefaultToken,
  startRoll,
  finishRoll,
  type EventInfo,
} from '../src/index'

on('change:strength', (info: EventInfo) => {
  void info.sourceAttribute
  void info.sourceType
  // getAttrs supports the `_max` suffix; values are strings keyed by request.
  getAttrs(['strength', 'strength_max'], (values) => {
    const cur: string = values.strength
    const max: string = values.strength_max
    void max
    setAttrs(
      { strength_mod: Math.floor((Number(cur) - 10) / 2) },
      { silent: true },
      () => {}
    )
  })
})

on('sheet:opened', () => {
  getSectionIDs('inventory', (ids) => {
    ids.forEach((id) => removeRepeatingRow(`repeating_inventory_${id}`))
    const newId: string = generateRowID()
    setAttrs({ [`repeating_inventory_${newId}_qty`]: 1 })
  })
})

on('clicked:roll', (info) => void info.sourceAttribute)

const lang: string = getTranslationLanguage()
const label: string | false = getTranslationByKey('some_key')
void lang
void label

setDefaultToken({ bar1_value: 10, name: 'Hero', represents: null })

// Custom Roll Parsing.
on('clicked:attack', () => {
  startRoll('&{template:default} {{roll1=[[1d20]]}}', (results) => {
    const total: number = results.results.roll1.result
    const dice: number[] = results.results.roll1.dice
    const sides: number = results.results.roll1.rolls[0].sides
    void dice
    void sides
    finishRoll(results.rollId, { roll1: total % 4 })
  })
})
