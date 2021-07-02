import React,{useEffect} from "react";
import { useSelector, useDispatch } from "../features/hooks";

import { SelectItem } from "./SelectItem";
import { InputItem } from "./InputItem";
import { FieldSet } from "./Fieldset";

import {
  SentenceFieldData,
  PhraseFieldData,
  WordFieldData,
  SentenceConfig,
  PhraseConfig,
  OtherConfig,
  WordConfig,
} from "../../../types/index";

import { extractEntry } from "../../utils/index";
import { getModelFieldNames, getModelNames } from "../features/ankiSlice";

interface Props {
  title: string;
  disabled: boolean;
  config: WordConfig | PhraseConfig | SentenceConfig;
  otherMappingTable: Required<OtherConfig>;
  fieldMappingTable:
    | Required<WordFieldData>
    | Required<PhraseFieldData>
    | Required<SentenceFieldData>;

  updateConfig: (
    name: keyof (WordConfig | PhraseConfig | SentenceConfig),
    value: string
  ) => void;
}

function AnkiConfig(props: Props) {
  const {
    title,
    config,
    disabled,
    otherMappingTable,
    fieldMappingTable,
    updateConfig,
  } = props;
  const {
    tags: tagsValue,
    deckName: deckValue,
    modelName: modelValue,
  } = config;

  const dispatch = useDispatch();
  useEffect(() => {
    modelValue && dispatch(getModelFieldNames(modelValue))
  },[modelValue])

  const anki = useSelector((state) => state.anki);
  const deckNames = anki.deckNames;
  const modelNames = anki.modelNames;
  const modelFieldNames = modelValue ? anki.modelFieldNames[modelValue] || [] : [];
  console.log(anki.modelFieldNames,modelValue)
  const [deckName, deckTitle] = extractEntry(otherMappingTable, "deckName");
  const [modelName, modelTitle] = extractEntry(otherMappingTable, "modelName");
  const [tagsName, tagsTitle] = extractEntry(otherMappingTable, "tags");

  return (
    <FieldSet disabled={disabled} title={title}>
      <SelectItem
        name={deckName}
        title={deckTitle}
        value={deckValue}
        options={deckNames}
        className="col-span-3"
        onChange={(event) => {
          updateConfig(deckName, event.target.value);
        }}
      />
      <SelectItem
        name={modelName}
        title={modelTitle}
        value={modelValue}
        options={modelNames}
        className="col-span-3"
        onChange={(event) => {
          updateConfig(modelName, event.target.value);
        }}
      />
      <InputItem
        name={tagsName}
        title={tagsTitle}
        value={tagsValue}
        className="col-span-3"
        onChange={(event) => {
          updateConfig(tagsName, event.target.value);
        }}
      />
      {Object.entries(fieldMappingTable).map(([name, title]) => {
        return (
          <SelectItem
            key={name}
            name={name}
            title={title}
            value={config[name]}
            options={modelFieldNames}
            onChange={(event) => {
              updateConfig(name, event.target.value);
            }}
          />
        );
      })}
    </FieldSet>
  );
}

export default AnkiConfig;


