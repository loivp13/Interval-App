//Check if columns should center
export const checkShouldRecenterColumn = (
  clientHeight,
  scrollTop,
  scrollHeight
) => {
  if (scrollHeight - (scrollTop + clientHeight) < 5) {
    return { type: "centerOffset1", shouldRecenterColumn: true };
  } else if (scrollTop === 0) {
    return { type: "center", shouldRecenterColumn: true };
  } else {
    return { type: "", shouldRecenterColumn: false };
  }
};
// changes color text removing before and after
export const changeColorText = (
  children,
  addColorIndex,
  removeColorIndexes
) => {
  children[addColorIndex].style.color = "white";
  removeColorIndexes.forEach((index) => {
    if (children[index]) {
      children[index].style.color = "";
    }
  });
};

//create scrollListeners
export const createEventScrollListener = (
  timeUnit,
  calcSecChange,
  calcMinChange,
  scrollTopSecRef,
  scrollTopMinRef
) => {
  return function (e) {
    let { clientHeight, scrollTop, scrollHeight, children } = e.target;

    let childBoxHeight = clientHeight / 3;
    let centerIndex =
      timeUnit === "sec" ? children.length / 2 + 1 : children.length / 2;

    if (timeUnit === "sec") {
      calcSecChange(scrollTop, childBoxHeight, children, centerIndex);
    } else {
      calcMinChange(scrollTop, childBoxHeight, children, centerIndex);
    }
    let { type, shouldRecenterColumn } = checkShouldRecenterColumn(
      clientHeight,
      scrollTop,
      scrollHeight,
      children
    );

    if (shouldRecenterColumn) {
      type === "centerOffset1"
        ? (e.target.scrollTop =
            scrollTopSecRef.current - (2 * clientHeight) / 3)
        : (e.target.scrollTop = scrollTopMinRef.current + clientHeight / 3);
    }
  };
};
