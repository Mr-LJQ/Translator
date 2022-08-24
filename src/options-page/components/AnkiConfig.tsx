import React, { useMemo } from "react";

import { ConfigType } from "../types";
import { useStorageStore, useAnkiStore } from "../stores";
import { getConfigName, getDuplicateConfigName } from "../utils";
import { TagsItem } from "./TagsItem";
import { SelectItem } from "./SelectItem";
import { H3, Fieldset } from "../pure-components";
import {
  WORD_FIELDS_MAP,
  PHRASE_FIELDS_MAP,
  COMMON_CONFIG_MAP,
  SENTENCE_FIELDS_MAP,
} from "@/configuration";
import { extractEntry } from "@/utils";

interface Props {
  configType: ConfigType;
}

export const AnkiConfig = React.memo(function AnkiConfig(props: Props) {
  const configType = props.configType;
  const configName = getConfigName(configType);
  const duplicateConfigName = getDuplicateConfigName(configType);

  const config = useStorageStore((state) => state[configName]);
  const duplicateConfig = useStorageStore(
    (state) => state[duplicateConfigName]
  );
  const updateConfig = useStorageStore((state) => state.updateConfig);
  const updateDuplicateConfig = useStorageStore(
    (state) => state.updateDuplicateConfig
  );
  const modelValue = config.modelName;

  const version = useAnkiStore((state) => {
    return state.version;
  });
  const deckNames = useAnkiStore((state) => state.deckNames);
  const modelNames = useAnkiStore((state) => state.modelNames);
  const fieldNamesObject = useAnkiStore((state) => state.fieldNamesObject);
  const modelFieldNames =
    modelValue == null ? undefined : fieldNamesObject[modelValue];
  const disabled = version == null;
  const connected = version != null;

  const headerTitle = useMemo(
    function () {
      return {
        [ConfigType.Word]: "单词配置",
        [ConfigType.Phrase]: "短语配置",
        [ConfigType.Sentence]: "句子配置",
      }[configType];
    },
    [configType]
  );

  const modelFieldObject = useMemo(() => {
    return {
      [ConfigType.Word]: WORD_FIELDS_MAP,
      [ConfigType.Phrase]: PHRASE_FIELDS_MAP,
      [ConfigType.Sentence]: SENTENCE_FIELDS_MAP,
    }[configType];
  }, [configType]);

  const [deckName, deckText] = useMemo(() => {
    return extractEntry(COMMON_CONFIG_MAP, "deckName");
  }, []);

  const [modelName, modelText] = useMemo(() => {
    return extractEntry(COMMON_CONFIG_MAP, "modelName");
  }, []);

  const [tagsName, tagsText] = useMemo(() => {
    return extractEntry(COMMON_CONFIG_MAP, "tags");
  }, []);

  const args = {
    connected,
    configName,
    duplicateConfigName,
    updateConfig,
    updateDuplicateConfig,
  };
  return (
    <>
      <H3 className="col-span-4">{headerTitle}</H3>
      <Fieldset disabled={disabled}>
        <SelectItem
          {...args}
          name={deckName}
          text={deckText}
          options={deckNames}
          value={config[deckName] || ""}
          duplicateValue={!!duplicateConfig[deckName]}
          className="col-span-3"
        />
        <SelectItem
          {...args}
          name={modelName}
          text={modelText}
          options={modelNames}
          value={config[modelName] || ""}
          duplicateValue={!!duplicateConfig[modelName]}
          className="col-span-3"
        />
        <TagsItem
          name={tagsName}
          text={tagsText}
          configName={configName}
          value={config[tagsName] || ""}
          updateConfig={updateConfig}
        />
        {Object.entries(modelFieldObject).map(([name, text]) => {
          return (
            <SelectItem
              {...args}
              key={name}
              name={name}
              text={text}
              options={modelFieldNames}
              //@ts-ignore 是相互匹配的
              value={config[name] || ""}
              //@ts-ignore 是相互匹配的
              duplicateValue={!!duplicateConfig[name]}
              className="col-span-1"
            />
          );
        })}
      </Fieldset>
    </>
  );
});
