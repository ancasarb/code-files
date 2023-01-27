const createTooltip = (data) => {
  const tooltipWidth = 100;
  const tooltipHeight = 190;
  const textColor = "#494e4f";
  const textLineHeight = 22;

  // Create the tooltip here

  const tooltip = innerChart.append("g").attr("class", "tooltip");
  tooltip
    .append("line")
    .attr("x1", 0)
    .attr("x2", 0)
    .attr("y1", -30)
    .attr("y2", innerHeight)
    .attr("stroke", textColor)
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "6 4");

  const firstYear = d3.min(data, (d) => d.year);
  const tooltipYear = tooltip
    .append("text")
    .attr("class", "tooltip-year")
    .attr("x", 0)
    .attr("y", innerHeight + 25)
    .style("font-size", "16px")
    .style("font-weight", 700)
    .style("fill", textColor)
    .attr("text-anchor", "middle")
    .text(firstYear);

  const tooltipContent = tooltip.append("g").attr(
    "transform",
    `translate(${(-1 * tooltipWidth) / 2}, ${-1 * margin.top + 30})`
  );
  const tooltipText = tooltipContent
    .append("text")
    .attr("class", "tooltip-content")
    .style("font-size", "14px")
    .style("font-weight", 500)
    .style("fill", textColor);
  const dataFirstYear = data.find((item) => item.year === firstYear);
  formatsInfo.forEach((format, i) => {
    tooltipText
      .append("tspan")
      .attr("class", `sales-${format.id}`)
      .attr("x", 0)
      .attr("y", i * textLineHeight).text(`${format.label}: 
     ${d3.format(",.1r")(dataFirstYear[format.id])}M$`);

    tooltipContent
      .append("circle")
      .attr("cx", -10)
      .attr("cy", i * textLineHeight - 5)
      .attr("r", 6)
      .attr("fill", format.color);
  });
};

const handleMouseEvents = (data) => {
  // Handle the mouse events here

  d3.selectAll(".areas-container path").on("mousemove", (e) => {
    const xPosition = d3.pointer(e)[0];
    d3.select(".tooltip").attr("transform", `translate(${xPosition}, 0)`);

    const year = Math.round(xScale.invert(xPosition));
    d3.select(".tooltip-year").text(year);
    const yearData = data.find((item) => item.year === year);
    formatsInfo.forEach((format) => {
      d3.select(`.sales-${format.id}`).text(
        `${format.label}:  ${d3.format(",.1r")(yearData[format.id])}M$`
      );
    });
  });
};
