import { describe, it, expect } from 'vitest';
import * as mnemonicId from './index';

describe('mnemonicId', () => {
  describe('createId methods', () => {
    it('returns id in correct format', () => {
      expect(mnemonicId.createNounId()).toMatch(/^\w+$/);
      expect(mnemonicId.createNameId()).toMatch(/^\w+-\w+$/);
      expect(mnemonicId.createLongNameId()).toMatch(/^\w+-\w+-\w+$/);
      expect(mnemonicId.createUniqueNameId()).toMatch(/^\w+-\w+-\w+$/);
      expect(mnemonicId.createQuestId()).toMatch(/^\w+-\w+-\w+$/);
      expect(mnemonicId.createStoryId()).toMatch(/^\w+-\w+-\w+-\w+-\w+$/);
      expect(mnemonicId.createLongStoryId()).toMatch(/^\w+-\w+-\w+-\w+-\w+-\w+-\w+$/);
      expect(mnemonicId.createNumberId(10)).toMatch(/^\d{10}$/);
      expect(mnemonicId.createId(10)).toMatch(/^\w{10}$/);
      expect(
        mnemonicId.createCustomId({
          adjectives: 2,
          subject: true,
          verb: true,
          object: true,
          delimiter: '_',
          numberSuffix: 4,
          idSuffix: 6,
          capitalize: true,
        }),
      ).toMatch(/^\w+_\w+_\w+_\w+_\w+_\w+_\w+_\d{4}_\w{6}/);
      expect(mnemonicId.createCustomId()).toMatch('');
      expect(mnemonicId.createNumberId(-1)).toMatch('');
    });
  });

  describe('createId charset', () => {
    it('uses full alphanumeric charset (62 chars including W, w, y)', () => {
      const chars = new Set<string>();
      for (let i = 0; i < 10000; i++) {
        const id = mnemonicId.createId(1);
        chars.add(id);
      }
      expect(chars.has('W')).toBe(true);
      expect(chars.has('w')).toBe(true);
      expect(chars.has('y')).toBe(true);
    });
  });

  describe('thirdPerson option', () => {
    it('conjugates verbs to 3rd person by default', () => {
      const verbs = new Set<string>();
      for (let i = 0; i < 2000; i++) {
        const id = mnemonicId.createStoryId();
        const verb = id.split('-')[2];
        verbs.add(verb);
      }
      for (const verb of verbs) {
        expect(verb).toMatch(/s$/);
      }
    });

    it('uses base form verbs for quest ids', () => {
      const verbs = new Set<string>();
      for (let i = 0; i < 2000; i++) {
        const id = mnemonicId.createQuestId();
        const verb = id.split('-')[0];
        verbs.add(verb);
      }
      // Base form verbs — some end in s (e.g. "impress") but most don't
      const nonS = [...verbs].filter((v) => !v.endsWith('s'));
      expect(nonS.length).toBeGreaterThan(0);
    });
  });
});
