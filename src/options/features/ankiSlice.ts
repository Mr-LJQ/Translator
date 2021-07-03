import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { postBackend } from "../../extensions_API/index"

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
    postBackend("getDeckNames"),
    postBackend("getModelNames"),
    postBackend("getVersion")])
  const modelFieldNames: State["modelFieldNames"] = {};
  (await Promise.all(modelNames.map((model) => {
    return postBackend("getModelFieldNames", model)
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