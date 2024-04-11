const truncateText = (text: string) => {
  const shouldTruncate = text.length > 34;
  const endsWithQuote = text[text.length - 1] === '"' && text.length - 1 <= 34;

  let displayText = text;
  if (shouldTruncate && !endsWithQuote) {
    displayText = `${text.substring(0, 34)}...`;
  } else if (shouldTruncate) {
    displayText = text.substring(0, 34);
  }

  return displayText;
};

export default truncateText;
