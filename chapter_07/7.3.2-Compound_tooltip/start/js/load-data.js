// Load data
d3.csv("js/../data/data.csv", d3.autoType).then(data => {
  defineScales(data);
  drawStreamGraph(data);
  createTooltip(data);
  handleMouseEvents(data);
});