import indieFontFace from './indieFontFace';
const style = `
  <style> \
    ${indieFontFace} \
    svg { \
      border: 1px solid lightblue; \
      font-family: 'Indie Flower', cursive; \
    } \
    text { \
      fill: blue; \
      font-size: 36px; \
      text-anchor: middle; \
    } \
  </style>`;
export default style;