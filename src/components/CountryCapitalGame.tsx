import { useState } from "react";

declare global {
  interface Array<T> {
    shuffle(): T[];
  }
}

// fisher-yates/knuth shuffle
Array.prototype.shuffle = function () {
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
  const [selectedPlace, setSelectedPlace] = useState<Option>();

  const cardMap = options.map((option) => (
    <button
      className={
        option.state === "SELECTED"
          ? "selected"
          : option.state === "WRONG"
          ? "wrong"
          : ""
      }
      key={option.value}
      onClick={() => {
        if (!selectedPlace) {
          // if no place is selected yet, select it and set it's state to "SELECTED"
          setSelectedPlace(option);
          setOptions(
            options.map((opt) => {
              return opt === option
                ? {
                    ...opt,
                    state: "SELECTED",
                  }
                : opt;
            })
          );
        } else {
          // if a place is already selected, either
          if (
            option.value === data[selectedPlace.value] ||
            selectedPlace.value === data[option.value]
            ) {
            // remove both from the list if they match country <> capital
            setOptions(
              options.filter(
                (opt) =>
                  opt.value !== selectedPlace.value &&
                  opt.value !== option.value
              )
            );
            setSelectedPlace(undefined);
          } else {
            // set both backgrounds to red if they don't match
            setOptions(
              options.map((opt) => {
                return opt === option
                  ? {
                      ...opt,
                      state: "WRONG",
                    }
                  : opt;
              })
            );
          }
        }
      }}
    >
      {option.value}
    </button>
  ));

  if (options.length === 0) {
    return <div>Congratulations!</div>;
  }

  return <div className="container">{cardMap}</div>;
}
