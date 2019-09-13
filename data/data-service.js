const stripText = (str) =>
  str
    .replace(/\[+/g, '')
    .replace(/]+/g, '')
    .replace(/{move:|{type:|{item:|{ability:+/g, '')
    .replace(
      /Overworld:+/g,
      '<span class="italic font-semibold">Overworld: </span>'
    )
    .replace(/\{.*?\}/g, '')
    .replace(/\}/g, '');

module.exports = { stripText };
