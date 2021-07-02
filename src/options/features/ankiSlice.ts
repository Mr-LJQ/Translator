import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { postBackend } from "../../extensions_API/index"

const name = "anki"

interface State {
  deckNames: string[]
  modelNames: string[]
  ankiConnectionVersion: null | number
  modelFieldNames: { 
    [key:string]: string[]
  }
}

const initialState: State = {
  ankiConnectionVersion: null,
  deckNames: [],
  modelNames: [],
  modelFieldNames: {},
}

const getAnkiConnectionVersion = createAsyncThunk(name + "/getAnkiConnectionVersion", async () => {
  return postBackend("getVersion")
})

const getModelFieldNames = createAsyncThunk(name + "/getModelFieldNames", async (modelName: string) => {
  const modelFieldNames = await postBackend("getModelFieldNames", modelName)
  return { modelName, modelFieldNames }
})

const getModelNames = createAsyncThunk(name + "/getModelNames", async () => {
  return postBackend("getModelNames")
})

const getDeckNames = createAsyncThunk(name + '/getDeckNames', async () => {
  return postBackend("getDeckNames")
})

const ankiSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAnkiConnectionVersion.fulfilled, (state, action) => {
      state.ankiConnectionVersion = action.payload
    })
    builder.addCase(getDeckNames.fulfilled, (state, action) => {
      state.deckNames = action.payload
    })
    builder.addCase(getModelNames.fulfilled, (state, action) => {
      state.modelNames = action.payload
    })
    builder.addCase(getModelFieldNames.fulfilled, (state, action) => {
      const { modelName, modelFieldNames } = action.payload
      state.modelFieldNames[modelName] = modelFieldNames
    })
  }
})

export default ankiSlice.reducer
export {
  getDeckNames,
  getModelNames,
  getModelFieldNames,
  getAnkiConnectionVersion,
}