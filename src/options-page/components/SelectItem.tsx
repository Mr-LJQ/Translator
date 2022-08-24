import React, { ReactNode } from "react";
import classJoin from "classnames";
import { Handler } from "../stores";
import { Label } from "../pure-components";
import { ConfigName, DuplicateConfigName } from "../types";

interface Props {
  name: string;
  text: string;
  value: string;
  duplicateValue: boolean;
  className: string;
  connected: boolean;
  configName: ConfigName;
  options: string[] | undefined;
  duplicateConfigName: DuplicateConfigName;
  updateConfig: Handler["updateConfig"];
  updateDuplicateConfig: Handler["updateDuplicateConfig"];
}

export const SelectItem = React.memo(function SelectItem(props: Props) {
  const {
    configName,
    duplicateConfigName,
    name,
    text,
    value,
    options,
    className,
    connected,
    duplicateValue,
    updateConfig,
    updateDuplicateConfig,
  } = props;

  return (
    <>
      <Label className="col-span-1">
        {text}
        <input
          type="checkbox"
          className="ml-1 align-[-1px] focus:outline-none focus:ring-2 focus:ring-offset-slate-50 "
          title="用于判断是否重复添加，选中越多判断越严格(命中重复的概率更低，更多类似的卡片被添加)，反之则越宽松(命中重复的概率更高，更少类似的卡片被添加)，推荐使用默认配置。"
          checked={duplicateValue}
          onChange={(event) => {
            updateDuplicateConfig(
              duplicateConfigName,
              //@ts-ignore 能够正确匹配的
              name,
              event.target.checked
            );
          }}
        />
      </Label>
      <Select
        name={name}
        value={value}
        aria-label={text}
        connected={connected}
        className={className}
        options={options}
        onChange={(event) => {
          updateConfig(
            configName,
            //@ts-ignore 是能够正确匹配的
            name,
            event.target.value
          );
        }}
      />
    </>
  );
});

interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  value: string;
  options?: string[];
  connected: boolean;
}

export const Select = React.memo(function Select(props: SelectProps) {
  const { className, value, connected, ...other } = props;
  let options = props.options;
  const isNil = options == null || options.length === 0;

  if (isNil) {
    options = [""];
  } else {
    options = [""].concat(options!);
  }

  const containValue = options.includes(value);

  return (
    <select
      {...other}
      value={value}
      className={classJoin(
        `
          rounded
          border
          border-black
          focus:outline-none 
          focus:ring-2 
          focus:ring-offset-slate-50 
        `,
        className,
        {
          "prior:border-red-500": connected && !containValue,
        }
      )}
      title={
        connected && !containValue ? `[${value}]不存在，请重新选择` : undefined
      }
    >
      <Options options={options}>
        {!containValue && <option value={value}>{value}</option>}
      </Options>
    </select>
  );
});

function Options(props: { options?: string[]; children: ReactNode }) {
  const { options, children } = props;
  return (
    <>
      {children}
      {options &&
        options.map(function (value) {
          return (
            <option value={value} key={value}>
              {value}
            </option>
          );
        })}
    </>
  );
}
