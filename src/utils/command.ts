////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//前端与后端，前端与iframe,后端与弹窗，后端与配置页面之间的交互需要通过command进行
//为了让command更加便于管理，所以在该文件中统一进行相应的配置

//View

export enum Command{
  AddNote = "ADD_NOTE",
  UpdateNote = "UPDATE_NOTE",
  RelearnNote = "RELEARN_NOTE",
  HistoryIndex = "HISTORY_INDEX",
  TranslateText= "TRANSLATE_TEXT",
}

//Iframe

export enum Command {
  PauseAudio = "PAUSE_AUDIO",
  ShowTranslation = "SHOW_TRANSLATION",
  OpenSelection = "OPEN_SELECTION",
  HiddenChinese = "HIDDEN_CHINESE",
  BackHistory = "BACK_HISTORY",
  ForwardHistory = "FORWARD_HISTORY",
}

//Messenger

export enum Command {
  Callback = "CALLBACK",
}

//FrontEnd

export enum Command{
}

//BackEnd
export enum Command {
  SwitchSearchBar = "SWITCH_SEARCH_BAR",
  ShowInjectTranslation = "SHOW_INJECT_TRANSLATION",
  ShowIframe = "SHOW_IFRAME"
}
//Options
export enum Command{
  GetVersion = "GET_VERSION",
  GetDeckNames = "GET_DECK_NAMES",
  GetModelNames = "GET_MODEL_NAMES",
  GetModelFieldNames = "GET_MODEL_FIELD_NAMES",
}
//Action

//Inject
export enum Command{
  TranslateInjectText = "TRANSLATE_INJECT_TEXT",
}