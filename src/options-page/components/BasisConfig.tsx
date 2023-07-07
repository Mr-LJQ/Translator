import React, { useMemo, useCallback } from "react";

import { useStorageStore } from "../stores";
import { Fieldset, H3, Label, Select, Input } from "../pure-components";
import { extractEntry } from "@/utils";
import {
  ANKI_CONNECTION_MAP,
  DEFAULT_ANKI_CONNECTION_URL,
} from "@/configuration";

export const BasisConfig = React.memo(function BasisConfig() {
  return (
    <>
      <H3 className="col-span-4">通用</H3>
      <Fieldset>
        <ConnectionMethod />
        <ConnectionURL />
      </Fieldset>
    </>
  );
});

const ConnectionMethod = React.memo(function ConnectionMethod() {
  const value = useStorageStore((state) => state.ankiConnectionMethod);
  const [name, text] = useMemo(function () {
    return extractEntry(ANKI_CONNECTION_MAP, "ankiConnectionMethod");
  }, []);

  const id = "basis-config-".concat(text);
  return (
    <>
      <Label className="col-span-1" htmlFor={id}>
        {text}
      </Label>
      <Select
        id={id}
        name={name}
        value={value}
        className="col-span-3"
        onChange={() => {
          //暂时没有其它连接anki的方法
          return void 0;
        }}
      >
        <option value={value}>{value}</option>
      </Select>
    </>
  );
});

const ConnectionURL = React.memo(function ConnectionURL() {
  const value = useStorageStore((state) => state.ankiConnectionURL);
  const update = useStorageStore((state) => state.updateOtherConfig);

  const [name, text] = useMemo(function () {
    return extractEntry(ANKI_CONNECTION_MAP, "ankiConnectionURL");
  }, []);

  const handleChange = useCallback(
    function (event: React.ChangeEvent<HTMLInputElement>) {
      update(name, event.target.value);
    },
    [update, name]
  );
  const handleClick = useCallback(
    function () {
      return update(name, DEFAULT_ANKI_CONNECTION_URL);
    },
    [update, name]
  );
  const id = "basis-config-".concat(text);
  return (
    <>
      <Label className="col-span-1" htmlFor={id}>
        {text}
      </Label>
      <div className="col-span-3 flex">
        <Input
          id={id}
          name={name}
          type="text"
          value={value}
          className="flex-1 mr-2"
          onChange={handleChange}
        />
        {useMemo(() => {
          return (
            <button
              type="button"
              className=" 
                px-2  
                rounded  
                border-none 
                text-white 
                bg-green-light  
                hover:bg-green-dark  
                focus:outline-none  
                focus:ring-2  
                focus:ring-green-800 
                cursor-pointer 
              "
              onClick={handleClick}
            >
              重置
            </button>
          );
        }, [handleClick])}
      </div>
    </>
  );
});
