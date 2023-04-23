import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import '../../App.css'

const OppositionParties = () => {
  const [data, setData] = useState([7538,4666,4403,4317,1628,1620,1608,1499,1305,862,512,502,428,398,377,241,167,166,164,164]);
  const svgRef = useRef();

  useEffect(() => {
    // get the data from the svg
    const svg = d3.select(svgRef.current);
    data.sort(function(b, a) {
      return a - b;
    });
    // SCALES
    const xScale = d3.scaleBand()
      .domain(data.map((val, idx) => idx))
      .range([0, 300])
      .padding(0.5);
      const sent = ['INC','Shiv Sena','DMK','YSRCP','BJD','JD(U)','AITC','TRS','NCP','BSP','TDP','CPI(M)','Independent','IUML','AIMEIM','CPI','RLP','LJSP','AIUDF','RSP']
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([150,0]);

    const colorScale = d3.scaleLinear()
      .domain([100, 1000, 10000])
      .range(["green", "orange", "red"])
      .clamp(true);

    // AXIS
    const xAxis = d3.axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(idx => sent[idx]);
    svg
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const yAxis = d3.axisLeft(yScale);
    svg
      .select(".y-axis")
      .style("transform", "translateX(50,0)")
      .attr('text-anchor','end')
      .call(yAxis);

    // draw bars
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("fill", colorScale)
      .attr("transform", "scale(1, -1)")
      .attr("x", (val, idx) => xScale(idx))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", function (event, value) {
        const index = svg.selectAll(".bar").nodes().indexOf(this);
        svg
          .selectAll(".tooltip")
          .data([value])
          .join((enter) => enter.append("text").attr("y", yScale(value) - 4))
          .attr("class", "tooltip")
          .text(value)
          .style('fill','black')
          .style('font-weight','bold')
          .attr("x", xScale(index) + xScale.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", yScale(value) - 8)
          .attr("opacity", 1);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("height", val => 150 - yScale(val));
  }, [data]);

  return (
    <div 
      className="box"
      style={{
        marginLeft:'5px',
        height:'250px',
        width:'400px',
        paddingLeft:'20px',
        textAlign:'center',
        marginTop: "2rem"
      }}
    >
        <h3>Top Opposition Parties by Questions</h3>
        <br></br>
        <br></br>
      <svg ref={svgRef} style={{ overflow: "visible" }}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br />
    </div>
  );
};

export default OppositionParties;