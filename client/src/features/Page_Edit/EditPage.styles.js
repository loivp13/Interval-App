import classNames from "classnames";
export default {
  TimerItem: () => {
    return classNames(
      "TimerItem",
      "border-b",
      "border-th-white",
      "p-4",
      "pl-14",
      "relative"
    );
  },
  DeleteIcon: (hidden) => {
    return classNames(
      "DeleteIcon",
      "absolute",
      "w-12",
      "left-0",
      "top-1/2",
      "transform",
      "-translate-y-1/2",
      {
        hidden,
      }
    );
  },
  RearrangeIcon: (hidden) => {
    return classNames(
      "RearrangeIcon",
      "absolute",
      "w-6",
      "right-0",
      "top-1/2",
      "transform",
      "-translate-y-1/2",
      {
        hidden,
      }
    );
  },
};
