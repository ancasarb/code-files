d3.csv("js/../data/weekly_temperature.csv", d3.autoType).then(data => {
  console.log("temperature data", data);
  
  drawLineChart(data);
  createTooltip();
  handleMouseEvents();
});