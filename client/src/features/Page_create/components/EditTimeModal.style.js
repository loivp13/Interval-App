import classNames from "classnames";
export default {
  buttonContainer: ({ hidden }) => {
    return classNames("flex", "justify-around", "transform", "duration-1000", {
      "-translate-y-full": hidden,
    });
  },
  unitTextContainer: ({ hidden }) => {
    return classNames(
      "duration-1000",
      "flex",
      "justify-around",
      "my-5",
      "relative",
      "sm:my-20",
      "transform",
      "w-full",
      "z-10",
      { "sm:translate-y-2x-full": hidden },
      { "translate-y-full": hidden }
    );
  },
  unitText: classNames("text-3xl", "sm:w-1/5", "text-center"),
};
