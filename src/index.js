import "@babel/polyfill";
import { XMLSerializer } from 'w3c-xmlserializer';
import { getRoughContainer, getSvgString } from './utils';
import style from './style';

const serializer = new XMLSerializer.interface();
const rc = getRoughContainer();

// circle and label positions
const POSITIONS = [
  { x: 220, y: 220, r: 200, labelX: 150, labelY: 110 },
  { x: 380, y: 220, r: 200, labelX: 460, labelY: 105 },
  { x: 300, y: 310, r: 200, labelX: 300, labelY: 450 },
];

// an intersection label position and callout path
const INTERSECTION = {
  path: [[300, 250], [250, 170], [300, 60]],
  position: { x: 300, y: 50 }
}

// colors
const BORDER_COLORS = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']
const FILL_COLORS = ['#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']
const FILL_STYLES = ['dashed', 'dots', 'zigzag-line', 'cross-hatch'];

const pickRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

const createText = (text, x, y) => {
  return `<text x="${x}" y="${y}" class="small">${text}</text>`
}

const createCircle = ({ x, y, r }) => {
  const circle = rc.circle(x, y, r, {
    stroke: pickRandom(BORDER_COLORS),
    strokeWidth: 2,
    fill: pickRandom(FILL_COLORS),
    fillStyle: pickRandom(FILL_STYLES),
  });;
  return serializer.serializeToString(circle);
}

const createIntersection = (text) => {
  const line = rc.curve(INTERSECTION.path, {
    stroke: 'blue',
    strokeWidth: 3,
    roughness: 1.2,
  });
  const { x, y } = INTERSECTION.position;
  const lineString = serializer.serializeToString(line);
  const label = createText(text, x, y);
  return `${lineString} ${label}`;
}

exports.handler = async function (event) {
  const { labels = 'join,table A,table B' } = event.queryStringParameters || {};
  const [xLabel, ...circleLabels] = labels.split(',');
  // add circles and set labels
  const venn = circleLabels.map((label, index) => {
    const { labelX, labelY, ...circlePosition } = POSITIONS[index];
    const circle = createCircle(circlePosition);
    const text = createText(label, labelX, labelY);
    return `${circle}  ${text}`;
  });

  // intersection callout and label
  const intersection = createIntersection(xLabel);
  const body = getSvgString(style, `${venn.join(' ')} ${intersection}`, 600, 500);
  return {
    statusCode: 200,
    headers: { 'Content-type': 'image/svg+xml' },
    body
  }
}
