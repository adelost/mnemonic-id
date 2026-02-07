# Mnemonic id

[![npm](https://img.shields.io/npm/v/mnemonic-id)](https://www.npmjs.com/package/mnemonic-id)
![npm type definitions](https://img.shields.io/npm/types/mnemonic-id)

Generate memorable, human-readable ids that read like sentences.

Nobody remembers `a7xB9qL`. Everyone remembers the `eloquent-beaver` that `quotes-unknown-dinosaur`.

```ts
createNameId();  // -> hungry-hippo
createStoryId(); // -> eloquent-beaver-quotes-unknown-dinosaur
```

* Sentence structure: a subject *does something* to an object, not just adjective-animal
* 8 ready-made formats, from simple (`createNounId`) to unique (`createUniqueNameId`)
* Predictable max length per format, no surprises in your database columns
* Zero dependencies, ~4 KB gzipped

## Install

```console
$ npm install mnemonic-id
```


## Usage

Import in either way that suits your environment:
```ts
import { createNameId } from 'mnemonic-id';
createNameId();
```
```ts
import * as mnemonicId from 'mnemonic-id';
mnemonicId.createNameId();
```
```ts
const mnemonicId = require('mnemonic-id');
mnemonicId.createNameId();
```

Then select one of the existing id formats:

```ts
/** "noun", ≈ 10^2 permutations, 10 max length */
createNounId(); // -> narwhal

/** "adj+noun", ≈ 10^5 permutations, 19 max length */
createNameId(); // -> hungry-hippo

/** "adj+adj+noun", ≈ 10^8 permutations, 28 max length */
createLongNameId(); // -> hot-splendid-duck

/** "adj+noun+id", ≈ 10^16 permutations, 26 max length */
createUniqueNameId(); // -> dull-dugong-QkCHmf

/** "verb+adj+noun", ≈ 10^7 permutations, 29 max length */
createQuestId(); // -> finds-pretty-sheep

/** "adj+noun+verb+adj+noun", ≈ 10^12 permutations, 50 max length */
createStoryId(); // -> eloquent-beaver-quotes-unknown-dinosaur

/** "adj+adj+noun+verb+adj+adj+noun", ≈ 10^17 permutations, 66 max length */
createLongStoryId(); // -> wicked-evil-eel-helps-horrible-pretty-hamster

/** "number" of given length, 10^length - 10^(length-1) permutations */
createNumberId(10); // -> 6941634647  (= 10^10 - 10^9 permutations)

/** "id" of given length, = 62^length permutations */
createId(10); // -> uXOGTUiOoD  (= 62^10 ≈ 10^18 permutations)
```

Or customize your own:
```ts
createCustomId({
  adjectives: 2,
  subject: true,
  verb: true,
  object: true,
  numberSuffix: 4,
  idSuffix: 6,
  delimiter: '_',
  capitalize: true
}); // -> Talented_Bold_Pig_Hunts_Brawny_Supreme_Bumblebee_6343_VQ5EAZ
```

Most existing formats can also be customized:

```ts
createNameId({
  adjectives: 3, 
  capitalize: true,
  delimiter: '',
}); // -> OrdinaryCuddlyLaughingSquid
```

## Options

```ts
interface IdOpts {
  /** Number of adjectives given to object/subject */
  adjectives?: number;
  /** Creates subject in id sentence */
  subject?: boolean;
  /** Creates verb in id sentence */
  verb?: boolean;
  /** Creates object in id sentence */
  object?: boolean;
  /** Creates number of given length at end of id sentence */
  numberSuffix?: number;
  /** Creates id of given length at end of id sentence */
  idSuffix?: number;
  /** Delimiter to be used in id sentence */
  delimiter?: string;
  /** Capitalize each word in sentence */
  capitalize?: boolean;
  /** Conjugate verb to 3rd person, e.g. "find" -> "finds" (default: true) */
  thirdPerson?: boolean;
}
```

## Alternatives

Similar libraries:

* [human-id](https://www.npmjs.com/package/human-id)
* [project-name-generator](https://www.npmjs.com/package/project-name-generator)
* [unique-names-generator](https://www.npmjs.com/package/unique-names-generator)

## License

Licensed under MIT.
