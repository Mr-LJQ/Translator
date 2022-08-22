import React, { useCallback } from "react";
import { Handler } from "../stores";
import { ConfigName } from "../types";
import { Label, Input } from "../pure-components";

interface Props {
  value: string;
  name: string;
  text: string;
  configName: ConfigName;
  updateConfig: Handler["updateConfig"];
}

export const TagsItem = React.memo(function TagsInput(props: Props) {
  const { configName, value, name, text, updateConfig } = props;

  const handleChange = useCallback(
    function (event: React.ChangeEvent<HTMLInputElement>) {
      //@ts-ignore 能够正确匹配的
      updateConfig(configName, name, event.target.value);
    },
    [updateConfig, name, configName]
  );
  const id = `${configName}-${name}`;

  return (
    <>
      <Label htmlFor={id} className="col-span-1">
        {text}
      </Label>
      <Input
        id={id}
        type="text"
        name={name}
        value={value}
        className="col-span-3"
        onChange={handleChange}
      />
    </>
  );
});
