import classNames from "classnames";
export default {
  title: () => {
    return classNames(
      "title",
      "flex",
      "justify-center",
      "items-center",
      "font-quicksand",
      "text-th-white",
      "text-end",
      "text-4xl",
      "my-8",
      "relative",
      "w-auto",
      "tracking-widest"
    );
  },
  editIcon: () => {
    return classNames("w-5", "absolute", "-right-8", "bottom-2");
  },
  editableItemsBox: () => {
    return classNames(
      "h-6/10vh",
      "overflow-scroll",
      "w-full",
      "flex",
      "flex-col",
      "items-center",
      "hide-scrollbar"
    );
  },
  editItem: () => {
    return classNames(
      "EditItem",
      "border-b",
      "border-white",
      "flex",
      "items-center",
      "justify-between",
      "p-2",
      "text-2xl",
      "w-full"
    );
  },
  currentTimerName: () => {
    return classNames(
      "b-bottom",
      "flex",
      "items-center",
      "p-4",
      "text-center",
      "text-white",
      "uppercase",
      "w-full"
    );
  },
  timerValueBox: () => {
    return classNames(
      "border-white",
      "border",
      "flex",
      "items-center",
      "p-1",
      "rounded",
      "h-auto"
    );
  },
  timerValue: () => {
    return classNames("text-white", "tracking-widest");
  },
  deleteIcon: () => {
    return classNames("w-10");
  },
  editItemInput: () => {
    return classNames(
      "bg-th-primary",
      "text-white",
      "placeholder-white",
      "w-full"
    );
  },
};
