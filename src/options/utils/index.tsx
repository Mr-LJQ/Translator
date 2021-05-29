import { ChangeEvent, ReactElement, ReactNode, useCallback, useState } from 'react'   
import { postBackend } from '../../utils/index'

import { TabPaneKey, WordConfig } from '../../../types/index'
import { TabPaneProps } from '../../components/Tabs/index'

export async function getDeckAndModels() {
  const deckNames = await postBackend("getDeckNames");
  const modelNames = await postBackend("getModelNames");
  return {
    deckNames,
    modelNames,
  };
}

export function useFieldOptions () {
  const [fieldOptions,setFieldOptions] = useState<string[]>([])
  const updateFieldOptions = useCallback(async (event:ChangeEvent<HTMLSelectElement> | string) => {
    const modelName = typeof event === "string" ? event : event.target.value
    if (!modelName.trim()) return 
    const fields = await postBackend("getModelFieldNames",modelName)
    setFieldOptions(fields)
  },[])
  return [fieldOptions,updateFieldOptions] as [typeof fieldOptions,typeof updateFieldOptions]
}


export type Dispatch = {
  dispatch: typeof dispatch;
};

//因为WordConfig | PhraseConfig | SentenceConfig结构相同所以用WordConfig代表其它两种情况
type This = Record<keyof (WordConfig & Dispatch), any>
export function dispatch(
  this: This,
  action: { type: string; data: string }
) {
  const { type, data } = action;
  if (type === "tags" || type === "deckName" || type === "modelName") {
    this[type] = data;
  }
  this.matchedFields[type] = data;
}

export function tabPaneDataFactory(
  tabItem: ReactNode,
  children: ReactElement,
  key:TabPaneKey,
): TabPaneProps<TabPaneKey> {
  return {
    tabItem,
    children,
    key,
  };
}