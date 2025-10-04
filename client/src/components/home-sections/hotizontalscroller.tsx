// Import stylesheets
import "./style.css";

// get all horizontalScroll elements and add listeners to them

const horizontalScrollEls: Array<HTMLElement> = Array.from(
  document.querySelectorAll(".horizontalScroll")
);

horizontalScrollEls.forEach(horizontalScrollEl => {
  horizontalScrollEl.addEventListener("wheel", scrollHorizontally, false);

  horizontalScrollEl.addEventListener("mousemove", autoScroll);
});

/** BASIC SCROLLING FUNCTIONALLITY */

function scrollHorizontally(e: WheelEvent) {
  const element = e.currentTarget as HTMLElement;
  if (elementBorderReached(e)) {
    console.log("scrolling reached border of element");
    return;
  }

  e.preventDefault();
  element.scrollLeft += e.deltaY;
  console.log(`scrolled`, element.scrollLeft);
}

function elementBorderReached(e: WheelEvent) {
  const element = e.currentTarget as HTMLElement;
  const direction = getWheelYDirection(e);
  console.log(`scrolling to the`, direction);

  if (direction === "left" && element.scrollLeft === 0) {
    return true;
  }

  if (direction === "right") {
    const elementWidth = element.scrollWidth;
    const rightBorderPosition = Math.ceil(
      element.scrollLeft + element.clientWidth
    );
    if (rightBorderPosition >= elementWidth) {
      return true;
    }
  }

  return false;
}

function getWheelYDirection(e: WheelEvent): "left" | "right" {
  const change = Math.sign(e.deltaY);
  return change > 0 ? "right" : "left";
}

/** AUTO SCROLL WHEN MOUSE IS NEAR THE VISIBLE BORDER */

let continueAnimatingLeft = false;
let continueAnimatingRight = false;
function autoScroll(e: MouseEvent) {
  const element = e.currentTarget as HTMLElement;
  const { left, right } = isMouseCloseToElementBorder(e);

  if (left) {
    continueAnimatingLeft = true;
    scrollLeft(element);
  } else {
    continueAnimatingLeft = false;
  }

  if (right) {
    continueAnimatingRight = true;
    scrollRight(element);
  } else {
    continueAnimatingRight = false;
  }
}

function scrollLeft(element: HTMLElement) {
  if (element.scrollLeft > 0 && continueAnimatingLeft) {
    element.scrollLeft -= 1;
    requestAnimationFrame(() => scrollLeft(element));
  }
}

function scrollRight(element: HTMLElement) {
  if (
    Math.ceil(element.scrollLeft + element.clientWidth) < element.scrollWidth &&
    continueAnimatingRight
  ) {
    element.scrollLeft += 1;
    requestAnimationFrame(() => scrollRight(element));
  }
}

function isMouseCloseToElementBorder(e: MouseEvent) {
  const { x, y } = getRelativePositionBasedOnVisibleSize(e);

  const isClose = { left: false, right: false };

  if (x < 5) {
    isClose.left = true;
  } else if (x > 95) {
    isClose.right = true;
  }
  return isClose;
}

function getRelativePositionBasedOnVisibleSize(event: MouseEvent) {
  const element = event.currentTarget as HTMLElement;
  const visibleWidth = element.clientWidth;
  const visibleHeight = element.clientHeight;

  let offsetX = event.offsetX;
  let offsetY = event.offsetY;

  // offset is based on the complete element width
  // so we have to subtract the part the element was already scrolled
  const visibleOffsetX = Math.abs(offsetX - element.scrollLeft);
  const visibleOffsetY = Math.abs(offsetY - element.scrollTop);

  let x = Math.round((visibleOffsetX / visibleWidth) * 100);
  const y = Math.round((visibleOffsetY / visibleHeight) * 100);

  return { x, y };
}

function getRelativePositionBasedOnElmentSize(event: MouseEvent) {
  const element = event.currentTarget as HTMLElement;
  const elementWidth = element.scrollWidth;
  const elementHeight = element.scrollHeight;

  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  const x = Math.round((mouseX / elementWidth) * 100);
  const y = Math.round((mouseY / elementHeight) * 100);
  return { x, y };
}
