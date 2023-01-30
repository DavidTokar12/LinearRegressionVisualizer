import { round as _round } from "lodash";
import { Point } from "./types";

export const NUMBER_SPACING = 50;
export const NUMBERS_SHITF = 15;

export const MAIN_COLOR = "#011627";
export const BACKGROUND_COLOR = "#FDFFFC";
export const POINT_COLOR = "#6F8AB7";

export function getPos(event: MouseEvent, left: number, top: number) {
  return {
    x: event.clientX - left,
    y: event.clientY - top,
  };
}
export function getPointFromCick(
  x: number,
  y: number,
  context: CanvasRenderingContext2D,
  width: number,
  height: number
): Point {
  const transformX = context.getTransform().e;
  const transformY = context.getTransform().f;

  const x_0 = _round(width / 2) + transformX;
  const y_0 = _round(height / 2) + transformY;
  const result_x = (x - x_0) / NUMBER_SPACING;
  const result_y = -(y - y_0) / NUMBER_SPACING;
  return { x: result_x, y: result_y };
}
