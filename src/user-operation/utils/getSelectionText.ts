export function getSelectionText(): string | undefined {
  let selection = getSelection()
  return selection?.toString().trim()
}