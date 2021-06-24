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

//change Input permission
export function changeInputEditPermission(
  children,
  enableIndex,
  disableIndexes
) {
  children[enableIndex].children[0].classList.remove("pointer-events-none");
  for (let index of disableIndexes) {
    children[index].children[0].classList.add("pointer-events-none");
  }
}

// changes color text removing before and after
export const changeColorText = (
  children,
  addColorIndex,
  removeColorIndexes
) => {
  children[addColorIndex].children[0].classList.remove("placeholder-gray-300");

  children[addColorIndex].children[0].classList.add("placeholder-white");

  removeColorIndexes.forEach((index) => {
    if (children[index]) {
      children[index].children[0].classList.remove("placeholder-white");
      children[index].children[0].classList.add("placeholder-gray-300");
    }
  });
};

//limit characters to two
export function limitChar2(e) {
  e.preventDefault();
  let isMaxCharacter = e.target.value.length + 1 > 2;
  let currentValue = +(e.target.value + e.key);
  if (currentValue > 60) {
    console.log("damn");
    e.target.value = e.key;
    return;
  } else {
    e.target.value = e.target.value + e.key;
  }
  if (isMaxCharacter && !isNaN(e.key)) {
    console.log(e);

    e.target.value = e.target.value.substring(1, 3);
  }
}
