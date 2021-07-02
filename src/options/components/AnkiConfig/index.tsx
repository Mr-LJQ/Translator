import React, { ChangeEvent, useCallback, useState } from "react";

import Header from "../../components/Header/index";
import Fields from "../../components/Fields/index";

import {
  BasisAnkiConfig,
  DeckAndModels,
  NotePhraseData,
  NoteSentenceData,
  NoteWordData,
  PhraseConfig,
  SentenceConfig,
  WordConfig,
} from "../../../../types/index";

import DeckAndModel from "../../components/DeckAndModel/index";
import { Dispatch, useFieldOptions } from "../../utils/index";

interface Props {
  headerTitle: string;
  connectedAnki: boolean;
  deckAndModels: DeckAndModels;
  BasisAnkiMappingTable: Required<BasisAnkiConfig>;
  cachedConfig: (WordConfig | PhraseConfig | SentenceConfig) & Dispatch;
  mappingTable:
    | Required<NoteWordData>
    | Required<NotePhraseData>
    | Required<NoteSentenceData>;
}

function AnkiConfig(props: Props) {
  const {
    headerTitle,
    mappingTable,
    cachedConfig,
    connectedAnki,
    deckAndModels,
    BasisAnkiMappingTable: { tags, ...other },
  } = props;
  const { deckName, modelName, matchedFields } = cachedConfig;

  const [fieldOptions, updateFieldOptions] = useFieldOptions();

  if (connectedAnki) {
    updateFieldOptions(modelName)
  }

  const [tagsValue, setTagsValue] = useState(cachedConfig.tags);

  const updateCached = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      cachedConfig.dispatch({ type: name, data: value });
    },
    []
  );

  const tagChangeHandle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      updateCached(event);
      setTagsValue(value);
    },
    []
  );

  const deckAndModelChangeHandle = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      updateFieldOptions(event);
      updateCached(event);
    },
    []
  );

  return (
    <section>
      <Header>{headerTitle}</Header>
      <DeckAndModel
        initValues={{
          deckName,
          modelName,
        }}
        deckAndModels={deckAndModels}
        mappingTable={other}
        onChange={deckAndModelChangeHandle}
        disabled={!connectedAnki}
      ></DeckAndModel>
      <Fields
        onChange={updateCached}
        disabled={!connectedAnki}
        initValues={matchedFields}
        mappingTable={mappingTable}
        fieldOptions={fieldOptions}
      />
      <div className="tags-container">
        <span className="tags-title">{tags}</span>
        <input
          type="text"
          name="tags"
          value={tagsValue}
          onChange={tagChangeHandle}
          className="tags-select"
          disabled={!connectedAnki}
        />
      </div>
    </section>
  );
}

export default AnkiConfig;
