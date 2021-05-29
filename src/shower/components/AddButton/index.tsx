import React, { ReactNode } from "react";
import classnames from "classnames";
import "./index.less";

interface Props {
  status: number;
  loadingIcon?: ReactNode;
  statusText?: string;
  statusIcons?: ReactNode[];
  onClick: (...args: any[]) => void;
}

const defaultIcons = ["➕", "✔", "✖","✄", "↻", ]

function AddButton(props: Props) {
  const {
    status,
    statusText = "添加到Anki",
    statusIcons = defaultIcons,
    loadingIcon = "...",
    onClick,
  } = props;
  return (
    <span
      title={statusText}
      className={classnames("add_note", {
        add_note_success: status === 1 || status === -1,
        add_note_error: status === 2 || status === 3,
        add_note_relearn: status === 4,
      })}
      onClick={onClick}
    >
      {status === -1 ? loadingIcon : statusIcons[status]}
    </span>
  );
}

export default AddButton;
