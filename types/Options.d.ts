export interface Options {
  phonetic_preference: "英音" | "美音",
  dictionaryPriority:"柯林斯词典" | "牛津词典"
  max_example:string | number
}

export type laxOptions = Partial<Options>