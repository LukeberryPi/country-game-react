import { useState } from "react";

type CountryCapitalGameProps = {
  data: Record<string, string>;
};

type ButtonState = "SELECTED" | "WRONG" | "DEFAULT";

type Option = {
  value: string;
  state: ButtonState;
};

export default function CountryCapitalGame({ data }: CountryCapitalGameProps) {
  const initialState: Option[] = [...Object.keys(data), ...Object.values(data)]
    .shuffle()
    .map((value) => {
      return {
        value,
        state: "DEFAULT",
      };
    });

  const [options, setOptions] = useState<Option[]>(initialState);
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
                : {
                    ...opt,
                    state: "DEFAULT",
                  };
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
                return opt.value === option.value ||
                  opt.value === selectedPlace.value
                  ? {
                      ...opt,
                      state: "WRONG",
                    }
                  : opt;
              })
            );
            setSelectedPlace(undefined);
          }
        }
      }}
    >
      {option.value}
    </button>
  ));

  const gameOver = options.length === 0;

  const restartGame = () => {
    setOptions(initialState);
  };

  if (gameOver) {
    return (
      <div className="end">
        <p>Congratulations!</p>
        <button onClick={restartGame}>Restart game</button>
      </div>
    );
  }

  return <main className="container">{cardMap}</main>;
}
