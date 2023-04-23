import React, { useRef, useEffect} from "react";
import * as d3 from "d3";
import '../../App.css'

const MinistryFrequency = () => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = {top: 20, right: -110, bottom: 40, left: 290},
    width = 700 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
    const color =  d3.scaleOrdinal().range(["#EFB605", "#E9A501", "#E48405", "#E34914", "#DE0D2B", "#CF003E", "#B90050", "#A30F65", "#8E297E", "#724097", "#4F54A8", "#296DA4", "#0C8B8C", "#0DA471", "#39B15E", "#7EB852"]);


// append the svg object to the body of the page
const svg = d3.select(svgRef.current)
  .append("svg")
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Parse the Data
d3.csv("/ministry_count.csv").then(function(data) {
    data.sort(function(b, a) {
        return a.Value - b.Value;
      });
// Add X axis
  const x = d3.scaleLinear()
    .domain([0, 5000])
    .range([ 0, width]);

  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style('overflow','visible')
      .style('font-weight','bold')
      .style("text-anchor", "end");

  // Y axis
  const y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(d => d.Ministry))
    .padding(.15)
  svg.append("g")
    .call(d3.axisLeft(y))


  //Bars
  svg.selectAll(".bar")
    .data(data)
    .join("rect")
    .attr("x", x(0) )
    .attr("y", d => y(d.Ministry))
    .attr("width", d => x(d.Value))
    .attr("height", y.bandwidth())
    .attr("fill", d => color(d.Value))
    .on("mouseenter", function (event, d) {
        const index = svg.selectAll(".bar").nodes().indexOf(this);
        svg
          .selectAll(".tooltip")
          .data([d.Value])
          .join((enter) => enter.append("text").attr("y", event.y))
          .attr("class", "tooltip")
          .text(d.Value)
          .style('fill','black')
          .style('font-weight','bold')  
          .attr("x", x(d.Value) + 70 )
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", event.y)
          .attr("opacity", 1);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()

})
  },);

  return (
    <div 
      className="box"
      style={{
        width:'845px',
        paddingLeft:'25px',
        textAlign:'center',
        marginTop: "2rem"
      }}
    >
        <h3>Ministry Reference</h3>
        <br></br>
        <br></br>
      <svg ref={svgRef} 
      style={{  
        overflow: "visible",
        width:'110%',
        height:'100vh',
        }}
        >
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br />
    </div>
  );
};

export default MinistryFrequency;