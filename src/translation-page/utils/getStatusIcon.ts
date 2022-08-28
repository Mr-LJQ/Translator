import {Status} from '../types'
import { warning } from "@/utils";

const enum StatusIcon {
  Add = "ri-add-line",
  Loading = "ri-loader-line",
  Disconnect = "ri-link-unlink-m",
  Error = "ri-error-warning-line",
  Success = "ri-check-line",
  Forgotten = "ri-question-line",
  LearnNow = "ri-timer-flash-line",
  Duplicate = "ri-file-copy-2-line",
  ConfigError = "ri-settings-3-line",
}

export function getStatusIcon(state: Status) {
  const result = {
    [Status.Add]: StatusIcon.Add,
    [Status.Loading]: StatusIcon.Loading,
    [Status.Error]: StatusIcon.Error,
    [Status.Success]: StatusIcon.Success,
    [Status.LearnNow]: StatusIcon.LearnNow,
    [Status.Duplicate]: StatusIcon.Duplicate,
    [Status.Forgotten]: StatusIcon.Forgotten,
    [Status.Disconnect]: StatusIcon.Disconnect,
    [Status.ConfigError]: StatusIcon.ConfigError,
  }[state];
  warning(result !== undefined,`状态 ${state} 不存在对应的图标字符`)
  return result
}