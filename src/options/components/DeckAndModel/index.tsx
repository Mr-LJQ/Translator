import React, { ChangeEvent } from "react";
import "./index.less";

import Select from "../Select/index";

import { BasisAnkiConfig ,DeckAndModels} from "../../../../types/index";

interface Props {
  disabled: boolean;
  deckAndModels:DeckAndModels
  initValues:Pick<BasisAnkiConfig, "deckName" | "modelName">
  mappingTable: Pick<BasisAnkiConfig, "deckName" | "modelName">;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

function DeckAndModel(props: Props) {
  const { mappingTable, disabled, onChange,initValues,deckAndModels } = props;
  return (
    <div>
      {Object.entries(mappingTable).map(([name, title]) => {
        let options = null;
        switch (name) {
          case "deckName":
            options = deckAndModels.deckNames;
            break;
          case "modelName":
            options = deckAndModels.modelNames;
            break;
          default:
            throw new Error("存在未处理的属性...");
        }
        return (
          <Select
            key={name}
            name={name}
            title={title}
            options={options}
            disabled={disabled}
            onChange={onChange}
            initValue={initValues[name]}
          ></Select>
        );
      })}
    </div>
  );
}

export default DeckAndModel;
