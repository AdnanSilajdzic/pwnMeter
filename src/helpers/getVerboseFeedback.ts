import type { FeedbackType } from "@zxcvbn-ts/core";
import getPasswordMessage from "./getPasswordMessage";

export default function getVerboseFeedback(feedback: FeedbackType) {
  let warning;
  let suggestions;

  if (feedback.warning) {
    warning = getPasswordMessage(feedback.warning);
  } else {
    warning = null;
  }

  if (feedback.suggestions?.length) {
    suggestions = feedback.suggestions.map((suggestion: string) => {
      return getPasswordMessage(suggestion);
    });
  } else {
    suggestions = null;
  }

  return { warning, suggestions };
}
