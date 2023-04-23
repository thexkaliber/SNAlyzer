import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import '../../App.css';
const DemoSensitive = () => {
const [on, setOnState] = useState(false);
  const [data, setData] = useState([1046,489,422,14,1137,771]);
  const [senti, setSent] = useState(['Law and Justice','Minority Affairs','Panchayati Raj','Parliamentary Affairs','Social Justice and Empowerment','Tribal Affairs'])
  const [defaultData, setDefaultData] = useState(data);
  const [defaultSenti, setDefaultSent] = useState(senti);
  const svgRef = useRef();
  const toggle = () => {
    if (on) {
      setData(defaultData);
      setSent(defaultSenti);
    } else {
      setDefaultData(data);
      setDefaultSent(senti);
      setData([65547,1046,489,422,14,1137,771]);
      setSent(['Total','Law and Justice','Minority Affairs','Panchayati Raj','Parliamentary Affairs','Social Justice and Empowerment','Tribal Affairs']);
    }
    setOnState(o => !o);
  };
  useEffect(() => {

    // get the data from the svg
    const svg = d3.select(svgRef.current).attr('class','svgUpdate');
    data.sort(function(b, a) {
        return a - b;
      });
    // SCALES
    const xScale = d3.scaleBand()
      .domain(data.map((val, idx) => idx))
      .range([0, 300])
      .padding(0.5)
      
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([150,0])

    const colorScale = d3.scaleLinear()
      .domain([100, 1000, 10000])
      .range(["green", "orange", "red"])
      .clamp(true);

    // AXIS
    const xAxis = d3.axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(idx => senti[idx]);
    svg
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .transition()
      .duration(1000)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-15)")
      .style("text-anchor", "end");

    const yAxis = d3.axisLeft(yScale);
    svg
      .select(".y-axis")
      .style("transform", "translateX(50,0)")
      .transition()
      .duration(1000)
      .attr('text-anchor','end')
      .call(yAxis);

    // draw bars
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .merge(svg)
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

  let elements = document.getElementsByClassName('svgUpdate');
  if(elements.length > 1){
    elements[0].remove();
  }

  },[data, senti]);

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
        <h3>Sensitive Departments vs The Total</h3>
        <button className={"toggleButton " + ( on ? 'All' : 'Department')} on={on} onClick={toggle}>
            <span className="pin" />
          </button>
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

export default DemoSensitive;