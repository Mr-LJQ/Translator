import React,{ ChangeEvent, useCallback, useMemo, useState } from "react";
import classnames from "classnames"


interface Props {
  name: string;
  title: string;
  options: string[];
  containerClass?: string;
  titleClass?:string;
  selectClass?:string;
  initValue?:string
  disabled?:boolean
  onChange?:(event:ChangeEvent<HTMLSelectElement>) => void
}

function Select(props: Props) {
  const { name, options, title ,initValue,disabled,onChange} = props;
  let {titleClass,containerClass,selectClass} = props

  titleClass = useMemo(()=>classnames(titleClass,"select-title"),[titleClass])
  containerClass = useMemo(()=>classnames(containerClass,"select-container"),[containerClass])
  selectClass = useMemo(()=>classnames(selectClass,"select-main"),[selectClass])

  const [value, setValue] = useState(initValue);
  const handleChange = useCallback((event) => {
    setValue(event.target.value)
    onChange && onChange(event)
  },[onChange])
  return (
    <div className={containerClass}>
      <span className={titleClass}>{title}</span>
      <select 
        disabled={disabled}
        className={selectClass}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options.length === 0 ?
          <option key="default" value={value}>{value}</option> :
          <option key="default" value=""> </option>
        }
        {options.map((item) => {
          return <option key={item} value={item}>{item}</option>;
        })}
      </select>
    </div>
  );
}

export default Select