import React from "react";

import { FieldSet } from "./Fieldset";
import { InputItem } from "./InputItem";
import { SelectItem } from "./SelectItem";

import { extractEntry } from "../../utils";

import initialStorage from "../../extensions_API/initialStorage";

import { BasisConfig as BasisConfigType } from "../../../types";

interface Props {
  title: string;
  disabled: boolean;
  config: BasisConfigType;
  mappingTable: Required<BasisConfigType>;
  updateConfig: (name: keyof BasisConfigType, value: string) => void;
}

//默认的 anki connection url
const ankiConnectionURL =
  initialStorage.ankiConnectionURL || "http://127.0.0.1:8765";
const ankiConnectionMethod = initialStorage.ankiConnectionMethod || "";

function BasisConfig(props: Props) {
  const { updateConfig, mappingTable, disabled, title, config } = props;

  const [methodName, methodTitle] = extractEntry(
    mappingTable,
    "ankiConnectionMethod"
  );
  const [urlName, urlTitle] = extractEntry(mappingTable, "ankiConnectionURL");

  return (
    <FieldSet disabled={disabled} title={title}>
      <SelectItem
        name={methodName}
        title={methodTitle}
        value={config.ankiConnectionMethod}
        className="col-span-3"
        options={["AnkiConnection"]}
        onChange={() => void 0}//暂时没有其它连接anki的方法
      />
      <InputItem
        title={urlTitle}
        name={urlName}
        value={config.ankiConnectionURL}
        className="col-span-3"
        onChange={(event) => {
          updateConfig(urlName, event.target.value);
        }}
      >
        <button
          type="button"
          className="justify-self-end mr-2 w-12 text-center text-white bg-green-light border-none cursor-pointer rounded hover:bg-green-dark"
          onClick={() => updateConfig(urlName, ankiConnectionURL)}
        >
          重置
        </button>
      </InputItem>
    </FieldSet>
  );
}

export default BasisConfig;
