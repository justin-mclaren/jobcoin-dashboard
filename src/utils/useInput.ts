import { FormEvent, useState } from "react";

export const useInput = (initialValue: String) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event: FormEvent) => {
        setValue(event.target.value);
      },
    },
  };
};
