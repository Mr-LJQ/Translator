import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { postBackend } from "../../utils/extensions-api"

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//类型
import { Command } from "../../utils/command"

const name = "anki"

interface State {
  deckNames: string[]
  modelNames: string[]
  ankiConnectionVersion: null | number
  modelFieldNames: {
    [key: string]: string[]
  }
}

const initialState: State = {
  ankiConnectionVersion: null,
  deckNames: [],
  modelNames: [],
  modelFieldNames: {},
}

const fetchAnki = createAsyncThunk(name + "/fetchAnki", async () => {
  const [deckNames, modelNames, ankiConnectionVersion] = await Promise.all([
    postBackend(Command.GetDeckNames),
    postBackend(Command.GetModelNames),
    postBackend(Command.GetVersion)
  ])
  const modelFieldNames: State["modelFieldNames"] = {};
  (await Promise.all(modelNames.map((model) => {
    return postBackend(Command.GetModelFieldNames, model)
  }))).forEach((fieldNames, index) => {
    return modelFieldNames[modelNames[index]] = fieldNames
  })
  return { deckNames, modelNames, ankiConnectionVersion, modelFieldNames }
})

const ankiSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAnki.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export default ankiSlice.reducer
export {
  fetchAnki
}