import {
  FC,
  FormEvent,
  SetStateAction,
  ComponentState,
  useState,
  useEffect,
  useRef,
} from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ReactComponent as Chevron } from "../assets/chevron-down-solid.svg";
import { Labels } from "../App";

interface Props {
  legend: string;
  state: ComponentState;
  setter: SetStateAction<any>;
  labels: Labels[];
}

const Form: FC<Props> = ({ legend, state, setter, labels }) => {
  const [open, setOpen] = useState(false);
  const [animated] = useAutoAnimate({ duration: 300 });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const data = Array.from(
      event.currentTarget.getElementsByTagName("input")
    ).map((element) => element.type !== "submit" && element.value);
    const formData = { ...state };

    for (let i = 0; i < data.length; i++) {
      data[i] && (formData[Object.keys(state)[i]] = data[i]);
    }

    setter(formData);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`border border-black rounded-md p-2 relative`}
    >
      <button
        aria-label="chevron"
        type="button"
        className={`absolute right-10 transition-rotate duration-300 rounded-full ${
          open ? "transform rotate-180" : ""
        }`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Chevron height="25" />
      </button>
      <legend>{legend}</legend>
      <div ref={animated}>
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
                  defaultValue={Object.values(state)[i] as string}
                  className="ms-2 px-2 bg-slate-200 rounded-full"
                />
              </fieldset>
            );
          })}
        {open && (
          <input
            type="submit"
            value="save"
            className="border bg-cyan-300 rounded-full px-4 m-2"
          />
        )}
      </div>
    </form>
  );
};
export default Form;
