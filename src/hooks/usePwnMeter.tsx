import { matcherPwnedFactory } from "@zxcvbn-ts/matcher-pwned";
import { zxcvbnAsync, zxcvbnOptions, type ZxcvbnResult } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import { useDeferredValue, useEffect, useState } from "react";
import getVerboseFeedback from "../helpers/getVerboseFeedback";

type propsTypes = {
  callback?: Function;
  disablePwnd?: boolean;
  debounce?: boolean;
  debounceTime?: number;
  disableTooltip?: boolean;
  hideWarning?: boolean;
};

const usePwnMeter = (props: propsTypes) => {
  // initialize pwnmeter options
  useEffect(() => {
    // Only add the matcher if it doesn't already exist
    if (!zxcvbnOptions.matchers?.pwned && !props.disablePwnd) {
      const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions);
      zxcvbnOptions.addMatcher("pwned", matcherPwned);
    }
    const options = {
      dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnEnPackage.dictionary,
      },
      graphs: zxcvbnCommonPackage.adjacencyGraphs,
      useLevenshteinDistance: true,
    };
    zxcvbnOptions.setOptions(options);
  }, []);

  const usePasswordStrength = (password: string) => {
    const [result, setResult] = useState<ZxcvbnResult | null>(null);
    const deferredPassword = useDeferredValue(password);

    useEffect(() => {
      zxcvbnAsync(deferredPassword).then((response) => {
        props.callback && props.callback({ ...response, verboseFeedback: getVerboseFeedback(response.feedback) });
        setResult(response);
      });
    }, [deferredPassword]);

    return result;
  };

  return { usePasswordStrength };
};

export default usePwnMeter;
