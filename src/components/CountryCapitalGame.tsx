import { useState } from "react";

declare global {
  interface Array<T> {
    shuffle(): T[];
  }
}

// knuth shuffle
Array.prototype.shuffle = function() {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }
  return this;
};

type CountryCapitalGameProps = {
  data: Record<string, string>;
};

type ButtonState = "SELECTED" | "WRONG" | "DEFAULT";

type Option = {
  value: string;
  state: ButtonState;
};

export default function CountryCapitalGame({ data }: CountryCapitalGameProps) {
  const [options, setOptions] = useState<Option[]>(
    [...Object.keys(data), ...Object.values(data)].shuffle().map((value) => {
      return {
        value,
        state: "DEFAULT",
      };
    })
  );

  const cardMap = options.map((option) => (
    <button
      className={option.state === "SELECTED" ? "selected" : ""}
      key={option.value}
      onClick={() =>
        setOptions(
          options.map((opt) => {
            return opt === option
              ? {
                  ...opt,
                  state: "SELECTED",
                }
              : opt;
          })
        )
      }
    >
      {option.value}
    </button>
  ));

  return <div className="container">{cardMap}</div>;
}
