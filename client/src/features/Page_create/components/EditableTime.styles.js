import classNames from "classnames";
export default {
  timeValues: classNames("h-1/3", "scroll-child-start"),
  input: ({ colType }) => {
    return classNames(
      "bg-th-primary",
      "focus:bg-opacity-25",
      "focus:bg-white",
      "focus:outline-none",
      "font-bold",
      "h-full",
      "placeholder-gray-300",
      "pointer-events-none",
      "text-center",
      "w-full",
      colType
    );
  },
  timeCol: classNames(
    "cursor-pointer",
    "font-bold",
    "h-full",
    "hide-scrollbar ",
    "overflow-scroll",
    "scroll-mandatory-y",
    "text-5xl",
    "md:text-9xl",
    "text-center",
    "text-th-white",
    "w-2/5"
  ),
};
