import rough from 'roughjs';
import { JSDOM } from 'jsdom';

const getRoughContainer = () => {
  const dom = new JSDOM();
  const document = dom.window.document;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  return rough.svg(svg);
}

const getSvgString = (style, body, width, height) => (
  `<?xml version="1.0" encoding="UTF-8"?> \
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"> \
    ${style} \
    ${body} \
  </svg>`
);

export {
  getRoughContainer,
  getSvgString
};