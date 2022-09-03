export function getSelectionText(): string | undefined {
  const selection = getSelection();
  return selection?.toString().trim();
}
