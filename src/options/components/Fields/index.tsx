import React, { ChangeEvent } from "react";

import {
  NoteWordData,
  NotePhraseData,
  NoteSentenceData,
} from "../../../../types/index";

import Select from "../Select/index";

interface Props {
  disabled: boolean;
  fieldOptions: string[];
  initValues?:NoteWordData | NoteSentenceData | NotePhraseData
  mappingTable: NotePhraseData | NoteWordData | NoteSentenceData;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

function Fields(props: Props) {
  const { mappingTable, fieldOptions, disabled, onChange,initValues } = props;
  return (
    <div className="fields-container">
      {Object.entries(mappingTable).map(([name, title]) => {
        return (
          <Select
            key={name}
            name={name}
            title={title}
            onChange={onChange}
            disabled={disabled}
            options={fieldOptions}
            selectClass="min_width_49"
            containerClass="min_width_49"
            initValue={initValues && initValues[(name as keyof (NoteWordData | NotePhraseData | NoteSentenceData))]}
          />
        );
      })}
    </div>
  );
}

export default Fields;
