import React from "react";
import { HotKey } from "@/types";
const hotkeys: HotKey[] = ["altKey", "shiftKey", "ctrlKey"];
export const HotKeySelect = React.memo(function HotKeySelect(props: {
  hotKey: HotKey;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const { hotKey, handleChange } = props;
  return (
    <div
      title="切换用于取词的热键"
      className=" flex items-center justify-between p-1"
    >
      <label htmlFor="selectionHotkey" className="text-lg">
        取词热键
      </label>
      <select
        name="selectionHotkey"
        id="selectionHotkey"
        value={hotKey}
        onChange={handleChange}
        className=" 
          rounded
          h-8 w-20  
          cursor-pointer  
          focus:outline-none  
          focus:ring-2  
          focus:ring-offset-2  
          focus:ring-offset-slate-50 
        "
      >
        {hotkeys.map(function (hotKey: HotKey) {
          return (
            <option value={hotKey} key={hotKey}>
              {hotKey.slice(0, -3).replace(/^[a-z]/gi, function (letter) {
                return letter.toUpperCase();
              })}
            </option>
          );
        })}
      </select>
    </div>
  );
});
