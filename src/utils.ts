export function createChatTitle(initialMessage: string): string {
  const titleLength = 20;
  if (!initialMessage || initialMessage.trim() === "") {
    return "New Chat";
  }

  return initialMessage.length > titleLength
    ? `${initialMessage.substring(0, titleLength)}`
    : initialMessage;
}
