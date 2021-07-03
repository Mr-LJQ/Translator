//依赖
import React from "react";
import { extractEntry } from "../../utils/index";

//类型
import {
  SentenceFieldData,
  PhraseFieldData,
  WordFieldData,
  SentenceConfig,
  PhraseConfig,
  OtherConfig,
  WordConfig,
} from "../../../types/index";

//组件
import { H3 } from "../components/H3";
import { Select } from "../components/Select";
import { Span } from "../components/Span";
import { Options } from "../components/Options";
import { Input } from "../components/Input";

interface Props<C, T> {
  config: C;
  title: string;
  disabled: boolean;
  deckNames: string[];
  modelNames: string[];
  modelFieldNames: string[];
  otherMappingTable: Required<OtherConfig>;
  fieldMappingTable: T;
  updateConfig: (name: keyof C, value: string) => void;
}

type FieldData = Required<WordFieldData> | Required<PhraseFieldData> | Required<SentenceFieldData>
type Config = WordConfig | PhraseConfig | SentenceConfig

/**
 * 受控组件
 */
function AnkiConfig(props: Props<PhraseConfig,Required<PhraseFieldData>>): JSX.Element;
function AnkiConfig(props: Props<WordConfig,Required<WordFieldData>>): JSX.Element;
function AnkiConfig(props: Props<SentenceConfig,Required<SentenceFieldData>>): JSX.Element 
function AnkiConfig(props: Props<Config,FieldData>): JSX.Element {
  const {
    title,
    config,
    disabled,
    deckNames,
    modelNames,
    modelFieldNames,
    otherMappingTable,
    fieldMappingTable,
    updateConfig,
  } = props;
  const {
    tags: tagsValue,
    deckName: deckValue,
    modelName: modelValue,
  } = config;

  const [deckName, deckTitle] = extractEntry(otherMappingTable, "deckName");
  const [modelName, modelTitle] = extractEntry(otherMappingTable, "modelName");
  const [tagsName, tagsTitle] = extractEntry(otherMappingTable, "tags");

  return (
    <fieldset
      disabled={disabled}
      className="grid grid-cols-4 gap-1 text-black text-base "
    >
      <H3 className="col-span-4">{title}</H3>
      <SelectItem
        title={deckTitle}
        name={deckName}
        value={deckValue}
        options={deckNames}
        className="col-span-3"
        onChange={(event) => {
          updateConfig(deckName, event.target.value);
        }}
      />
      <SelectItem
        title={modelTitle}
        name={modelName}
        value={modelValue}
        options={modelNames}
        className="col-span-3"
        onChange={(event) => {
          updateConfig(modelName, event.target.value);
        }}
      />
      <InputItem
        title={tagsTitle}
        name={tagsName}
        value={tagsValue}
        onChange={(event) => {
          updateConfig(tagsName, event.target.value);
        }}
      />
      {Object.entries(fieldMappingTable).map(([name, title]) => {
        return (
          <SelectItem
            key={name}
            title={title}
            name={name}
            value={config[name]}
            options={modelFieldNames}
            onChange={(event) => {
              updateConfig(name, event.target.value);
            }}
          />
        );
      })}
    </fieldset>
  );
}

export default AnkiConfig;

interface SelectItemProps {
  title: string;
  name: string;
  value?: string;
  className?: string;
  options: string[];
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

function SelectItem(prop: SelectItemProps) {
  const { title, name, value, options, onChange, className } = prop;
  return (
    <>
      <Span>{title}</Span>
      <Select
        className={className}
        name={name}
        value={value}
        onChange={onChange}
      >
        <Options options={options}>
          <option value=""></option>
        </Options>
      </Select>
    </>
  );
}

interface InputItemProps {
  title: string;
  name: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function InputItem(props: InputItemProps) {
  const { title, name, value, onChange } = props;
  return (
    <>
      <Span>{title}</Span>
      <Input
        className="col-span-3"
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
      />
    </>
  );
}
