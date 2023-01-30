import { Point, Mode } from "./types";
import { getPos, getPointFromCick } from "./functions";
import { clear, drawXAxis, drawYAxis, drawPoint } from "./draw";
import { BACKGROUND_COLOR } from "./functions";
import { inRange as _inRange } from "lodash";

// Setup
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const bounding = canvas.getBoundingClientRect();
const canvas_left = bounding.left;
const canvas_top = bounding.top;

canvas.style.background = BACKGROUND_COLOR;

let width = window.innerWidth - canvas_left;
let height = window.innerHeight - canvas_top;

canvas.width = width;
canvas.height = height;

window.addEventListener("resize", () => {
  width = window.innerWidth - canvas_left;
  height = window.innerHeight - canvas_top;
  canvas.width = width;
  canvas.height = height;
  draw();
});

const context = canvas.getContext("2d");

let mode: Mode = Mode.MOVE;
const active_color = "#0d6efd";

// Setup

//Graphing Event Handlers
let start: Point | undefined;

canvas.addEventListener("mouseup", reset);
canvas.addEventListener("mouseleave", reset);
canvas.addEventListener("mousedown", (event: MouseEvent) => {
  start = getPos(event, canvas_left, canvas_top);
});
canvas.addEventListener("mousemove", (event: MouseEvent) => {
  if (start === undefined) return;

  if (mode === Mode.MOVE) {
    const pos = getPos(event, canvas_left, canvas_top);
    context.translate(pos.x - start.x, pos.y - start.y);
    draw();
    start = pos;
  }

  if (mode == Mode.DRAW) {
    const { x, y } = getPos(event, canvas_left, canvas_top);
    const p = getPointFromCick(x, y, context, width, height);
    drawPoint(context, width, height, p.x, p.y);
  }
});

function reset(): void {
  start = undefined;
  draw();
}

//Graphing Event Handlers

//Drag side bar
const panel = document.getElementById("panel");
const MAX_WIDTH = 500;
const MIN_WIDTH = 160;

let m_pos: number;
function resize(event: MouseEvent) {
  const dx = m_pos - event.x;
  m_pos = event.x;
  const current_width = Number.parseInt(getComputedStyle(panel, "").width);
  if (_inRange(current_width - dx, MIN_WIDTH, MAX_WIDTH))
    panel.style.width = current_width - dx + "px";
}

panel.addEventListener(
  "mousedown",
  function (event: MouseEvent) {
    const w = Number.parseInt(getComputedStyle(panel, "").width);
    if (_inRange(event.offsetX, w - 5, w + 5)) {
      m_pos = event.x;
      document.addEventListener("mousemove", resize, false);
    }
  },
  false
);
document.addEventListener(
  "mouseup",
  function () {
    document.removeEventListener("mousemove", resize, false);
  },
  false
);
//Drag side bar

//Side bar buttons:
const move_div = document.getElementById("move_btn") as HTMLDivElement;
const draw_div = document.getElementById("draw_btn") as HTMLDivElement;

function changeMode(): void {
  draw_div.style.backgroundColor = "";
  move_div.style.backgroundColor = "";

  if (mode == Mode.MOVE) {
    move_div.style.backgroundColor = active_color;
  }
  if (mode == Mode.DRAW) {
    draw_div.style.backgroundColor = active_color;
  }
}
move_div.addEventListener("click", () => {
  mode = Mode.MOVE;
  changeMode();
});
draw_div.addEventListener("click", () => {
  mode = Mode.DRAW;
  changeMode();
});

changeMode();
//Side bar buttons:

//Draw

function draw(): void {
  clear(context, width, height);
  drawXAxis(context, width, height);
  drawYAxis(context, width, height);
  drawPoint(context, width, height, 1, 1);
}

draw();
