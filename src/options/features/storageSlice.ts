import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getStorageItems, TabPaneKey } from '../../utils/extensions-api'

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//类型
import type {SentenceConfig,Storage,WordConfig,PhraseConfig} from "../../utils/extensions-api"
import type {AnkiConnectionFields} from "../field"

const name = "storage"

const initialState: Storage = {}

export const fetchStorage = createAsyncThunk(name + "/fetchStorage", async () => {
  return getStorageItems([
    "wordConfig",
    "phraseConfig",
    "sentenceConfig",
    "ankiConnectionMethod",
    "ankiConnectionURL",
    "activeTabPane",
  ])
})

const storageSlice = createSlice({
  name,
  initialState,
  reducers: {
    updateWordConfig(state, action: PayloadAction<{ name: keyof WordConfig, value: string }>) {
      const { name, value } = action.payload
      if (!state.wordConfig) state.wordConfig = {}
      state.wordConfig[name] = value
    },
    updatePhraseConfig(state, action: PayloadAction<{ name: keyof PhraseConfig, value: string }>) {
      const { name, value } = action.payload
      if (!state.phraseConfig) state.phraseConfig = {}
      state.phraseConfig[name] = value
    },
    updateSentenceConfig(state, action: PayloadAction<{ name: keyof SentenceConfig, value: string }>) {
      const { name, value } = action.payload
      if (!state.sentenceConfig) state.sentenceConfig = {}
      state.sentenceConfig[name] = value
    },
    updateBasisConfig(state, action: PayloadAction<{ name: keyof AnkiConnectionFields, value: string }>) {
      const { name, value } = action.payload
      state[name] = value
    },
    updateActiveTabPane(state,action: PayloadAction<TabPaneKey>) {
      state["activeTabPane"] = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchStorage.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const { updateBasisConfig, updatePhraseConfig, updateSentenceConfig, updateWordConfig,updateActiveTabPane } = storageSlice.actions
export default storageSlice.reducer
