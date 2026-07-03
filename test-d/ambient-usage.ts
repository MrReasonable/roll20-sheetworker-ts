// Type-level smoke test for the ambient `global` entry point: the sheet-worker
// functions (loaded via test-d/tsconfig.json including ../src/global.ts) are
// usable here without importing them.

on('change:dexterity', (info) => {
  void info.sourceType
  getAttrs(['dexterity'], (values) => {
    setAttrs({ dexterity_mod: Math.floor((Number(values.dexterity) - 10) / 2) })
  })
})

on('sheet:opened', () => {
  const id = generateRowID()
  setAttrs({ [`repeating_skills_${id}_name`]: 'Stealth' })
})

void getTranslationLanguage()
void getTranslationByKey('key')

on('clicked:save', () => {
  startRoll('{{roll1=[[1d20]]}}', (results) => {
    finishRoll(results.rollId, { roll1: results.results.roll1.result })
  })
})
