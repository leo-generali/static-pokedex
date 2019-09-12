module.exports = (string) => {
  return string
    .toLowerCase()
    .replace(/(?:^|\s|-)\S/g, (x) => x.toUpperCase())
    .replace(/[_-]/g, ' ');
};
