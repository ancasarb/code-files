// Append a SVG container
const svg = d3
  .select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")
  .style("border", "1px solid black");

d3.csv("js/../data/data.csv", (d) => {
  return {
    technology: d.technology,
    count: +d.count,
  };
}).then((data) => {
  console.log(data);
});
