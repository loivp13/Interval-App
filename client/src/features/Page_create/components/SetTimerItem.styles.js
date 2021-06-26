import classNames from "classnames";

export default {
  highlightMin: ({ time }) => {
    return classNames(
      {
        "text-th-white": time === "min",
        "text-th-secondary": time !== "min",
      },
      "p-1"
    );
  },
  highlightSec: ({ time }) => {
    return classNames(
      {
        "text-th-white": time === "sec",
        "text-th-secondary": time !== "sec",
      },
      "p-1"
    );
  },
  setTimerItem: ({ hidden }) => {
    return classNames(
      "SetTimerItem",
      "flex",
      "justify-around",
      "items-center",
      "font-quicksand",
      "border-b",
      "border-th-white",
      "py-8",
      " md:py-10",
      " w-full",
      { hidden }
    );
  },
};
