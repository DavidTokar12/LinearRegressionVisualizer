import {
  NUMBER_SPACING,
  NUMBERS_SHITF,
  MAIN_COLOR,
  POINT_COLOR,
} from "./functions";
import { Point } from "./types";
import { floor as _floor, round as _round, ceil as _ceil } from "lodash";

// TODO HOW TO EFFICIENTLY STORE AND CALCULATE POLINOMS

//TODO
// REDO WITH POINT FUNCTION
// ADD LINES TO NUMBERS
// COMBINE WITH DRAW Y AXIS
export function drawXAxis(
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const transformX = context.getTransform().e;
  const transformY = context.getTransform().f;
  const h = _round(height / 2);
  const w = _round(width / 2);
  //shift the whole thing to the right, so the midel line appears in the midle on initial load
  const shift = w % NUMBER_SPACING;
  //x axis
  context.lineWidth = 2;
  context.strokeStyle = MAIN_COLOR;
  context.beginPath();
  context.moveTo(-transformX, h);
  context.lineTo(width - transformX, h);
  context.stroke();
  //x axis

  const numberOfNumbers =
    _floor(width / NUMBER_SPACING) - (_floor(width / NUMBER_SPACING) % 2);
  const halfOfNumbers = -_ceil(numberOfNumbers / 2);
  const offsetX =
    transformX < 0
      ? _ceil(transformX / NUMBER_SPACING)
      : _floor(transformX / NUMBER_SPACING);
  context.lineWidth = 0.5;
  context.beginPath();
  for (let index = 0; index < numberOfNumbers + 2; index++) {
    const text = (halfOfNumbers + index - offsetX).toString();
    const x =
      NUMBER_SPACING * index -
      transformX +
      (transformX % NUMBER_SPACING) +
      shift;
    context.moveTo(x, -transformY);
    context.lineTo(x, height - transformY);
    context.fillText(text, x - NUMBERS_SHITF, h + 10);
  }
  context.stroke();
}

export function drawYAxis(
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const transformX = context.getTransform().e;
  const transformY = context.getTransform().f;

  const h = _round(height / 2);
  const w = _round(width / 2);

  const shift = h % NUMBER_SPACING;

  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(width / 2, -transformY);
  context.lineTo(width / 2, height - transformY);
  context.stroke();

  const numberOfNumbers =
    _floor(height / NUMBER_SPACING) - (_floor(height / NUMBER_SPACING) % 2);

  const halfOfNumbers = -_ceil(numberOfNumbers / 2);

  const offsetY =
    transformY < 0
      ? _ceil(transformY / NUMBER_SPACING)
      : _floor(transformY / NUMBER_SPACING);

  context.lineWidth = 0.5;

  context.beginPath();
  for (let index = 0; index < numberOfNumbers + 2; index++) {
    const text = (-1 * (halfOfNumbers + index - offsetY)).toString();
    const y =
      NUMBER_SPACING * index -
      transformY +
      (transformY % NUMBER_SPACING) +
      shift;

    context.moveTo(-transformX, y);
    context.lineTo(width - transformX, y);
    if (text !== "0") context.fillText(text, w + 10, y + NUMBERS_SHITF);
  }
  context.stroke();
}

/*
CLears the whole screen.
*/

export function clear(
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  context.save();
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, width, height);
  context.restore();
}

export function drawPoint(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  x: number,
  y: number
) {
  const midle_x = _round(width / 2);
  const midle_y = _round(height / 2);

  const cord_x = midle_x + x * NUMBER_SPACING;
  const cord_y = midle_y + -y * NUMBER_SPACING;

  context.beginPath();
  context.arc(cord_x, cord_y, 2, 0, 2 * Math.PI, true);
  context.fill();
}
