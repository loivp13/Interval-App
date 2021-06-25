import classNames from "classnames";
export default {
  buttonContainer: ({ hidden }) => {
    return classNames("flex", "justify-around", "transform", "duration-1000", {
      "-translate-y-full": hidden,
    });
  },
  unitTextContainer: ({ hidden }) => {
    return classNames(
      "flex",
      "justify-around",
      "w-full",
      "my-5",
      "sm:my-20",
      "transform",
      "duration-1000",
      "z-10",
      { "translate-y-full": hidden },
      { "sm:translate-y-2x-full": hidden }
    );
  },
  unitText: classNames("text-3xl", "sm:w-1/5", "text-center"),
};
