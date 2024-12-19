import { scaleLog } from "@visx/scale";
import { WordData } from "../types/word-cloud-types";

export class WordDataHelper {
  static fixedValueGenerator = () => 0.5;

  static countWordsFromArray(text: string[]): WordData[] {
    const freqMap: Record<string, number> = {};

    console.log("input text", text);

    for (const w of text) {
      if (!freqMap[w]) freqMap[w] = 0;
      freqMap[w] += 1;
    }

    console.log("freqMap", freqMap);

    return Object.keys(freqMap).map((word) => ({
      text: word,
      value: freqMap[word],
    }));
  }

  static countWordsFromString(text: string): WordData[] {
    const words: string[] = text.replace(/\./g, "").split(/\s/);

    return WordDataHelper.countWordsFromArray(words);
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
