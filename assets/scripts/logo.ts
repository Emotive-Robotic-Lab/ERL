export { }

const canvas: HTMLCanvasElement = document.createElement("canvas");
const attachPoint = document.getElementsByClassName("js-acadia2021-logo")[0];
attachPoint.append(canvas);
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.setAttribute("style", "width: 100%; height: 100%; display: block;");
const TAU = Math.PI * 2;

function fract(v: number): number {
  return v - (v | 0);
}

function hash(x: number, y: number, z: number): number {
  const px = 50 * fract(x * 0.3183099 + 0.71);
  const py = 50 * fract(y * 0.3183099 + 0.113);
  const pz = 50 * fract(z * 0.3183099 + 0.419);
  return -1 + 2 * fract(px * py * pz * (px + py + pz));
}

function logo(ts: number): void {
  const desiredWidth = canvas.clientWidth * window.devicePixelRatio;
  const desiredHeight = canvas.clientHeight * window.devicePixelRatio;
  if (desiredWidth !== canvas.width || desiredHeight !== canvas.height) {
    canvas.width = desiredWidth;
    canvas.height = desiredHeight;
  }
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  const CX = WIDTH / 2;
  const CY = HEIGHT / 2;
  const rad = Math.max(250, Math.min(canvas.width, canvas.height) * 0.3);
  const grd = ctx.createRadialGradient(CX, CY, rad * 0.1, CX, CY, rad);
  grd.addColorStop(0, "#ffffff");
  grd.addColorStop(1, "#f9e141");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.strokeStyle = "#000048";
  for (let i = 0; i < 100; i++) {
    const a = 0.3;
    const fnStart = a;
    const start = rad * a + fnStart * ((1 - a) * rad);
    const b = 0.7;
    const fnEnd = (Math.cos(hash(i, 1, 5) + ts * 1e-3) + 1) * 0.5;
    const end = rad * b + fnEnd * ((1 - b) * rad);
    const theta = i / 100 * TAU;
    ctx.beginPath();
    ctx.lineTo(CX + start * Math.cos(theta), CY + start * Math.sin(theta));
    ctx.lineTo(CX + end * Math.cos(theta), CY + end * Math.sin(theta));
    ctx.stroke();
  }
  ctx.strokeStyle = "#000048";
  for (let i = 0; i < 100; i++) {
    const a = 0.3;
    const fnStart = (Math.sin(15 * hash(i, i, i) + ts * 1e-3) + 1.4) * 0.5;
    const start = rad * a + fnStart * ((1 - a) * rad);
    const b = 0.7;
    const fnEnd = (Math.cos(hash(i, 1, 5) + ts * 1e-3) + 1) * 0.5;
    const end = rad * b + fnEnd * ((1 - b) * rad);
    const theta = i / 100 * TAU;
    ctx.beginPath();
    ctx.moveTo(CX + start * Math.cos(theta), CY + start * Math.sin(theta));
    ctx.lineTo(CX + end * Math.cos(theta), CY + end * Math.sin(theta));
    ctx.stroke();
  }


  ctx.strokeStyle = "#ead9e8";
  for (let i = 0; i < 100; i++) {
    const a = 0.3;
    const fnStart = (Math.sin(20 * hash(i, i, i) + ts * 1e-3) + 1.5) * 0.5;
    const start = rad * a + fnStart * ((1 - a) * rad);
    const b = 0.7;
    const fnEnd = (Math.cos(hash(i, 1, 5) + ts * 1e-3) + 1) * 0.5;
    const end = rad * b + fnEnd * ((1 - b) * rad);
    const theta = i / 100 * TAU + 1 / 100 * 3.9;
    const endX = CX + end * Math.cos(theta);
    const endY = CY + end * Math.sin(theta);
    const decorationRad = 4;
    ctx.beginPath();
    ctx.moveTo(CX + start * Math.cos(theta), CY + start * Math.sin(theta));
    ctx.lineTo(endX, endY);
    ctx.stroke();
    const circleDecorationFill = ctx.createRadialGradient(endX, endY, decorationRad * 0.1, endX, endY, decorationRad * 0.5);
    circleDecorationFill.addColorStop(0, "#000000");
    circleDecorationFill.addColorStop(1, "#000000");
    ctx.fillStyle = circleDecorationFill;
    ctx.fillRect(endX - decorationRad * 0.5, endY - decorationRad * 0.5, decorationRad, decorationRad);
  }
  ctx.strokeStyle = "#402828";
  ctx.fillStyle = "#402828";
  for (let i = 0; i < 100; i++) {
    const a = 0.3;
    const fnStart = (Math.sin(10 * hash(i, i, i) + ts * 1e-3) + 1.5) * 0.8;
    const start = rad * a + fnStart * ((1 - a) * rad);
    const b = 0.7;
    const fnEnd = (Math.cos(hash(i, 1, 5) + ts * 1e-3) + 1) * 0.5;
    const end = rad * b + fnEnd * ((1 - b) * rad);
    const theta = i / 100 * TAU + 1 / 100 * 1.9;
    const startX = CX + start * Math.cos(theta);
    const startY = CY + start * Math.sin(theta);
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(CX + end * Math.cos(theta), CY + end * Math.sin(theta));
    ctx.stroke();
    const triSide = 5;
    ctx.beginPath();
    ctx.moveTo(startX + rotateX(0, triSide, theta), startY + rotateY(0, triSide, theta));
    ctx.lineTo(startX + rotateX(0, -triSide, theta), startY + rotateY(0, -triSide, theta));
    ctx.lineTo(startX + rotateX(-triSide, 0, theta), startY + rotateY(-triSide, 0, theta));
    ctx.closePath();
    ctx.fill();
  }
  requestAnimationFrame(logo);
}
requestAnimationFrame(logo);

function rotateX(x: number, y: number, theta: number): number {
  return x * Math.cos(theta) - y * Math.sin(theta);
}

function rotateY(x: number, y: number, theta: number): number {
  return x * Math.sin(theta) + y * Math.cos(theta);
}
