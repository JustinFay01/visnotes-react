import { scaleLog } from "@visx/scale";
import { WordData } from "../types/word-cloud-types";

type CountWordOptions = {
  removeAllSpecialCharacters?: boolean;
  removeCharacters?: string[];
  removeNumbers?: boolean;
  ignoreCase?: boolean;
  capitalize?: boolean;
};

export class WordDataHelper {
  static fixedValueGenerator = () => 0.5;

  static countWordsFromArray(
    text: string[],
    options?: CountWordOptions
  ): WordData[] {
    const freqMap: Record<string, number> = {};

    if (options?.removeAllSpecialCharacters) {
      text = text.map((w) => w.replace(/[^a-zA-Z0-9]/g, ""));
    }

    if (options?.removeCharacters) {
      text = text.map((w) => {
        for (const c of options.removeCharacters!) {
          w = w.replace(c, "");
        }
        return w;
      });
    }

    if (options?.removeNumbers) {
      text = text.map((w) => w.replace(/[0-9]/g, ""));
    }

    if (options?.ignoreCase) {
      text = text.map((w) => w.toLowerCase());
    }

    if (options?.capitalize) {
      text = text.map((w) => w.charAt(0).toUpperCase() + w.slice(1));
    }

    for (const w of text) {
      if (!freqMap[w]) freqMap[w] = 0;
      freqMap[w] += 1;
    }

    return Object.keys(freqMap).map((word) => ({
      text: word,
      value: freqMap[word],
    }));
  }

  static countWordsFromString(
    text: string,
    options?: CountWordOptions
  ): WordData[] {
    const words: string[] = text.replace(/\./g, "").split(/\s/);

    return WordDataHelper.countWordsFromArray(words, options);
  }

  static getRotationDegree() {
    const rand = Math.random();
    const degree = rand > 0.5 ? 60 : -60;
    return rand * degree;
  }

  static fontScale = (words: WordData[]) => {
    return scaleLog({
      domain: [
        Math.min(...words.map((w) => w.value)),
        Math.max(...words.map((w) => w.value)),
      ],
      range: [10, 100],
    });
  };

  //fontSizeSetter = (datum: WordData) => fontScale(datum.value);
}
