//依赖
import React from "react";
import { extractEntry } from "../../utils";

//数据
import initialStorage from "../../extensions_API/initialStorage";

//类型
import { BasisConfig as BasisConfigType } from "../../../types";

//组件
import { H3 } from "../components/H3";
import { Span } from "../components/Span";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Options } from "../components/Options";

interface Props {
  title: string;
  disabled: boolean;
  config: BasisConfigType;
  mappingTable: Required<BasisConfigType>;
  updateConfig: (name: keyof BasisConfigType, value: string) => void;
}

//默认的 anki connection url
const defaultUrl = initialStorage.ankiConnectionURL || "http://127.0.0.1:8765";
const defaultMethod = initialStorage.ankiConnectionMethod || "";

/**
 * 受控组件
 */
function BasisConfig(props: Props) {
  const { updateConfig, mappingTable, disabled, title, config } = props;
  const { ankiConnectionURL, ankiConnectionMethod } = config;

  const [methodName, methodTitle] = extractEntry(
    mappingTable,
    "ankiConnectionMethod"
  );
  const [urlName, urlTitle] = extractEntry(mappingTable, "ankiConnectionURL");

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
