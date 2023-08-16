import { FC, FormEvent, SetStateAction, ComponentState, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ReactComponent as Chevron } from "../assets/chevron-down-solid.svg";
import { ReactComponent as Plus } from "../assets/plus-solid.svg";
import { ReactComponent as Trash } from "../assets/trash-can-solid.svg";
import { Labels } from "../App";

interface Props {
  legend: string;
  state: ComponentState;
  setter: SetStateAction<any>;
  labels: Labels[];
  index: number;
  add: () => any;
}

const Form: FC<Props> = ({ legend, state, setter, labels, index, add }) => {
  const [open, setOpen] = useState(false);
  const [animated] = useAutoAnimate({ duration: 500 });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const data = Array.from(
      event.currentTarget.getElementsByTagName("input")
    ).map((element) => element.type !== "submit" && element.value);
    const formData = { ...state[index] };

    for (let i = 0; i < data.length; i++) {
      data[i] && (formData[Object.keys(state[index])[i]] = data[i]);
    }

    const newState = [...state];

    newState.splice(index, 1, formData);

    setter(newState);
  };

  const addForm = () => {
    setter([...state, add()]);
  };

  const deleteForm = () => {
    const newState = [...state];
    newState.splice(index, 1);
    setter(newState);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`border border-black ${
        open ? "rounded-lg" : "rounded-t-lg"
      } relative`}
    >
      <div className="flex justify-between bg-slate-200 w-100 p-2 rounded-t-lg">
        <legend>{legend}</legend>
        <div className="flex gap-2">
          {legend !== "Contact information" && (
            <>
              {state.length > 1 && (
                <button
                  type="button"
                  onClick={deleteForm}
                  aria-label="remove form"
                  title={`Remove ${legend}`}
                  className="justify-self-end"
                >
                  <Trash />
                </button>
              )}
              <button
                type="button"
                onClick={addForm}
                aria-label={`add ${legend}`}
                title={`Add ${legend}`}
                className="justify-self-end"
              >
                <Plus />
              </button>
            </>
          )}
          <button
            aria-label={open ? "close form" : "open form"}
            title={open ? "close" : "open"}
            type="button"
            className={`transition-rotate duration-500 rounded-full ${
              open ? "transform rotate-180" : ""
            }`}
            onClick={() => setOpen((prev) => !prev)}
          >
            <Chevron height="25" />
          </button>
        </div>
      </div>
      <div ref={animated} className="px-2">
        {open &&
          labels &&
          labels.map(({ key, label }, i) => {
            const userReadableLabel = label
              .split(/(?=[A-Z])/)
              .map((string) => string[0].toLocaleUpperCase() + string.slice(1))
              .join(" ");

            return (
              <fieldset key={key} className="my-2 flex justify-between">
                <label htmlFor="label">{userReadableLabel}</label>
                <input
                  type="text"
                  name={label}
                  placeholder={userReadableLabel}
                  defaultValue={Object.values(state[index])[i] as string}
                  className="ms-2 px-2 bg-slate-200 rounded-full"
                />
              </fieldset>
            );
          })}
        <div className="flex justify-between">
          {open && (
            <input
              type="submit"
              value="save"
              className="border bg-slate-300 rounded-full px-4 m-2"
            />
          )}
        </div>
      </div>
    </form>
  );
};
export default Form;
