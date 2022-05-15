import React from "react";
import { pickEntry } from "../../utils/tools";

//组件
import { H3 } from "./H3";
import { Span } from "./Span";
import { Input } from "./Input";
import { Select } from "./Select";
import { Options } from "./Options";
//数据
import {initialStorage} from "../../utils/extensions-api";

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//类型

import type {AnkiConnectionFields} from "../field"

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//组件实现

interface Props {
  title: string;
  disabled: boolean;
  config: AnkiConnectionFields;
  fields: Required<AnkiConnectionFields>;
  updateConfig: (name: keyof AnkiConnectionFields, value: string) => void;
}

//默认的 anki connection url
const defaultUrl = initialStorage.ankiConnectionURL || "http://127.0.0.1:8765";
const defaultMethod = initialStorage.ankiConnectionMethod || "";

/**
 * 受控组件
 */
function BasisConfig(props: Props) {
  const { updateConfig, fields, disabled, title, config } = props;
  const { ankiConnectionURL, ankiConnectionMethod } = config;

  const [methodName, methodTitle] = pickEntry(
    fields,
    "ankiConnectionMethod"
  );
  const [urlName, urlTitle] = pickEntry(fields, "ankiConnectionURL");

  return (
    <fieldset
      disabled={disabled}
      className="grid grid-cols-4 gap-1 text-black text-base "
    >
      <H3 className="col-span-4">{title}</H3>

      <Span>{methodTitle}</Span>
      <Select
        className="col-span-3"
        name={methodName}
        value={ankiConnectionMethod || defaultMethod}
        onChange={() => void 0} //暂时没有其它连接anki的方法
      >
        <Options options={["AnkiConnection"]}></Options>
      </Select>

      <Span>{urlTitle}</Span>
      <div className="col-span-3 flex">
        <Input
          className="flex-1"
          type="text"
          name={urlName}
          value={ankiConnectionURL || defaultUrl}
          onChange={(event) => {
            updateConfig(urlName, event.target.value);
          }}
        />
        <button
          type="button"
          className="bg-green-light border-none cursor-pointer focus:outline-none hover:bg-green-dark mr-2 px-1 rounded text-white"
          onClick={() => updateConfig(urlName, defaultUrl)}
        >
          重置
        </button>
      </div>
    </fieldset>
  );
}

export default BasisConfig;
