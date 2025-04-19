# 🎲 Roll20 SheetWorker TypeScript Definitions

[![npm version](https://img.shields.io/npm/v/roll20-sheetworker-ts.svg)](https://www.npmjs.com/package/roll20-sheetworker-ts)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/MrReasonable/roll20-sheetworker-ts/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![GitHub issues](https://img.shields.io/github/issues/MrReasonable/roll20-sheetworker-ts.svg)](https://github.com/MrReasonable/roll20-sheetworker-ts/issues)

Comprehensive TypeScript type definitions for Roll20's SheetWorker API, enabling type-safe character sheet development.

## Introduction

This package provides TypeScript definitions for Roll20's SheetWorker API, allowing you to develop character sheet scripts with full TypeScript support including autocompletion, type checking, and better documentation.

## Installation

```bash
# NPM
npm install roll20-sheetworker-ts --save-dev

# Yarn
yarn add roll20-sheetworker-ts --dev

# PNPM
pnpm add roll20-sheetworker-ts -D
```

## Usage

Import the types in your TypeScript files:

```typescript
import { on, getAttrs, setAttrs } from 'roll20-sheetworker-ts';

// Your SheetWorker code with full TypeScript support
on('sheet:opened', () => {
  getAttrs(['strength'], (values) => {
    const strength = parseInt(values.strength) || 0;
    setAttrs({
      strength_mod: Math.floor((strength - 10) / 2)
    });
  });
});
```

## Features

- ✅ Complete type definitions for Roll20 SheetWorker functions
- 🔍 IntelliSense/autocompletion support in compatible editors
- 🛡️ Type checking to catch errors before runtime
- 📚 Detailed documentation comments for all API methods

## API Coverage

This package includes TypeScript definitions for:

- Event handling (`on`, `onRender`, etc.)
- Attribute manipulation (`getAttrs`, `setAttrs`, etc.)
- Roll handling (`getSectionIDs`, `generateRowID`, etc.)
- Sandbox communication methods
- And more!

## Contributing

Contributions are welcome! If you find missing or incorrect definitions, please open an issue or submit a pull request on the [GitHub repository](https://github.com/MrReasonable/roll20-sheetworker-ts).

## License

This project is licensed under the [MIT License](https://github.com/MrReasonable/roll20-sheetworker-ts/blob/main/LICENSE).

## Resources

- [Roll20 API Documentation](https://wiki.roll20.net/Sheet_Worker_Scripts)
- [Roll20 Character Sheet Development](https://wiki.roll20.net/Building_Character_Sheets)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
