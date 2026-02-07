import verbs from './words/verbs';
import animals from './words/noun';
import adjectives from './words/adjectives';

export interface IdOpts {
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
  /** Conjugate verb to 3rd person (e.g. "find" -> "finds") */
  thirdPerson?: boolean;
}

/** Returns id in format "noun" (e.g. "narwhal"), ≈ 10^2 permutations, 10 max length */
export function createNounId(opts: IdOpts = {}): string {
  return createCustomId({
    subject: true,
    ...opts,
  });
}

/** Returns id in format "adj+noun" (e.g. "hungry-hippo"), ≈ 10^5 permutations, 19 max length */
export function createNameId(opts: IdOpts = {}): string {
  return createCustomId({
    adjectives: 1,
    subject: true,
    ...opts,
  });
}

/** Returns id in format "adj+adj+noun" (e.g. "hot-splendid-duck"), ≈ 10^8 permutations, 28 max length */
export function createLongNameId(opts?: IdOpts): string {
  return createCustomId({
    adjectives: 2,
    subject: true,
    ...opts,
  });
}

/** Returns id in format "adj+noun+id" (e.g. "dull-dugong-QkCHmf"), ≈ 10^16 permutations, 26 max length */
export function createUniqueNameId(opts: IdOpts = {}): string {
  return createNameId({
    idSuffix: 6,
    ...opts,
  });
}

/** Returns id in format "verb+adj+noun" (e.g. "find-pretty-sheep"), ≈ 10^7 permutations, 28 max length */
export function createQuestId(opts: IdOpts = {}): string {
  return createCustomId({
    adjectives: 1,
    verb: true,
    object: true,
    ...opts,
  });
}

/** Returns id in format "adj+noun+verb+adj+noun" (e.g. "eloquent-beaver-quote-unknown-dinosaur"), ≈ 10^12 permutations, 48 max length */
export function createStoryId(opts: IdOpts = {}): string {
  return createCustomId({
    adjectives: 1,
    subject: true,
    verb: true,
    object: true,
    ...opts,
  });
}

/** Returns id in format "adj+adj+noun+verb+adj+adj+noun" (e.g. "wicked-evil-eel-help-horrible-pretty-hamster"), ≈ 10^17 permutations,
 * 64 max length */
export function createLongStoryId(opts: IdOpts = {}): string {
  return createStoryId({
    adjectives: 2,
    ...opts,
  });
}

/** Returns number of given length, = 10^length - 10^(length-1) permutations */
export function createNumberId(length: number): string {
  const choices = '0123456789';
  let out = '';
  if (length > 0) {
    out += choices[randomInt(1, choices.length)];
  }
  for (let i = 1; i < length; i += 1) {
    out += choices[randomInt(0, choices.length)];
  }
  return out;
}

/** Returns id of given length, = 62^length permutations */
export function createId(length: number): string {
  const choices = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += choices[randomInt(0, choices.length)];
  }
  return out;
}

/** Returns customized id based on given options */
export function createCustomId(opts: IdOpts = {}): string {
  opts = {
    adjectives: 0,
    subject: false,
    verb: false,
    object: false,
    delimiter: '-',
    numberSuffix: 0,
    idSuffix: 0,
    ...opts,
  };
  let parts = [];
  if (opts.subject) {
    if (opts.adjectives) {
      for (let i = 0; i < opts.adjectives; i += 1) {
        parts.push(randomFromList(adjectives));
      }
    }
    parts.push(randomFromList(animals));
  }
  if (opts.verb) {
    const verb = randomFromList(verbs);
    parts.push(opts.thirdPerson ? toThirdPerson(verb) : verb);
  }
  if (opts.object) {
    parts.push(
      createCustomId({
        adjectives: opts.adjectives,
        subject: true,
        delimiter: opts.delimiter,
        capitalize: opts.capitalize,
      }),
    );
  }
  if (opts.numberSuffix) {
    const id = createNumberId(opts.numberSuffix);
    parts.push(id);
  }
  if (opts.idSuffix) {
    const id = createId(opts.idSuffix);
    parts.push(id);
  }
  if (opts.capitalize) {
    parts = parts.map(capitalize);
  }
  return parts.join(opts.delimiter);
}

function randomFromList<T>(list: T[]): T {
  return list[randomInt(0, list.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function toThirdPerson(verb: string): string {
  if (verb.endsWith('y') && !'aeiou'.includes(verb[verb.length - 2])) {
    return verb.slice(0, -1) + 'ies';
  }
  if (/(?:s|sh|ch|x|z)$/.test(verb)) {
    return verb + 'es';
  }
  return verb + 's';
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
