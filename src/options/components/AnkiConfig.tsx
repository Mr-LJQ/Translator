import React from "react";
import { pickEntry } from "../../utils/tools";

//组件
import { H3 } from "./H3";
import { Select } from "./Select";
import { Span } from "./Span";
import { Options } from "./Options";
import { Input } from "./Input";

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//类型
import type {SentenceFields,PhraseFields,WordFields,CardInfoFields} from "../field"
import type {WordConfig,PhraseConfig,SentenceConfig,} from "../../utils/extensions-api"

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//组件实现
interface Props<C, T> {
  config: C;
  title: string;
  disabled: boolean;
  deckNames: string[];
  modelNames: string[];
  modelFieldNames: string[];
  CardInfoFields: CardInfoFields;
  fields: T;
  updateConfig: (name: keyof C, value: string) => void;
}

type FieldData = Required<WordFields> | Required<PhraseFields> | Required<SentenceFields>
type Config = WordConfig | PhraseConfig | SentenceConfig

/**
 * 受控组件
 */
function AnkiConfig<C extends SentenceConfig,T extends Required<SentenceFields>>(props: Props<C,T>): JSX.Element 
function AnkiConfig<C extends PhraseConfig,T extends Required<PhraseFields>>(props: Props<C,T>): JSX.Element 
function AnkiConfig<C extends WordConfig,T extends Required<WordFields>>(props: Props<C,T>): JSX.Element 
function AnkiConfig<C extends Config,T extends FieldData>(props: Props<Config,FieldData>): JSX.Element {
  const {
    title,
    config,
    disabled,
    deckNames,
    modelNames,
    modelFieldNames,
    CardInfoFields,
    fields,
    updateConfig,
  } = props;

  const {
    tags: tagsValue,
    deckName: deckValue,
    modelName: modelValue,
  } = config;

  const [deckName, deckTitle] = pickEntry(CardInfoFields, "deckName");
  const [modelName, modelTitle] = pickEntry(CardInfoFields, "modelName");
  const [tagsName, tagsTitle] = pickEntry(CardInfoFields, "tags");

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
      {Object.entries(fields).map(([name, title]) => {
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
