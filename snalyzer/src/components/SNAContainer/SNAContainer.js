import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import useResizeObserver from "./useResizeObserver";
import './SNAContainer.css';
import '../../App.css';


function SNAContainer(props) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  console.log(props)
  useEffect(() => {
    var data =  require(`../../r/snalyzer/labeled_data_models/${props.data}.json`)

    if (!dimensions) return;

    const color = d3.scaleOrdinal(d3.schemePaired);
    let height = dimensions.height;
    let width = dimensions.width;
    let radius = 10;
    function ticked(d) {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      nodes
        .attr("cx", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });
    }

    const simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3.forceLink().id(function (d) {
          return d.id;
        })
      )
      .force("charge", d3.forceManyBody().strength(-30))
      .force("collide", d3.forceCollide(30))
      .force(
        "center",
        d3.forceCenter(dimensions.width / 2, dimensions.height / 2)
      );

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("class","svgCharts")
      .attr("height", dimensions.height)
      .attr("width", dimensions.width);

    const tooltip = d3
      .select("body")
      .append("div") // the tooltip always "exists" as its own html div, even when not visible
      .style("position", "absolute") // the absolute position is necessary so that we can manually define its position later
      .style("visibility", "hidden") // hide it from default at the start so it only appears on hover
      .style("background-color", "white")
      .attr("class", "tooltip")
    
    const tooltip_in = function(event, d) { // pass event and d to this function so that it can access d for our data
        return tooltip
          .html("<h4>Name: " + d.id + "</h4><h4>Party: " + d.party +"</h4><h4>State: "+ d.state +"</h4><h4>Constituency: " + d.constituency + "</h4>") // add an html element with a header tag containing the name of the node.  This line is where you would add additional information like: "<h4>" + d.name + "</h4></br><p>" + d.type + "</p>"  Note the quote marks, pluses and </br>--these are necessary for javascript to put all the data and strings within quotes together properly.  Any text needs to be all one line in .html() here
          .style("visibility", "visible") // make the tooltip visible on hover
          .style("top", event.pageY + "px") // position the tooltip with its top at the same pixel location as the mouse on the screen
          .style("left", event.pageX + "px"); // position the tooltip just to the right of the mouse location
      }

    const tooltip_in_links = function(event, d) { 
        return tooltip
          .html("<h4>Topic: " + d.topic + "</h4><h4>Label: " + d.label +"</h4><h4>Score: "+ d.score + "</h4>")
          .style("visibility", "visible") 
          .style("top", event.pageY + "px")
          .style("left", event.pageX + "px"); 
      }
      
    const tooltip_out = function() {
        return tooltip
          .transition()
          .duration(50) // give the hide behavior a 50 milisecond delay so that it doesn't jump around as the network moves
          .style("visibility", "hidden"); // hide the tooltip when the mouse stops hovering
      }

    const link = svg
      .append("g")
      .attr("class", "links")
      .selectAll("links")
      .data(data.links)
      .enter()
      .append("line")
      .attr("stroke", function(d){if (d.value===1){return "orange"} if (d.value===2){return "#1F77B4"} if(d.value===3){return "green"}})
      .attr("stroke-width", 2)
      .on("mouseover", tooltip_in_links) 
      .on("mouseout", tooltip_out)
      .on("mouseleave", evt => {
        link.attr("display", "block");
      });


    const nodes = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("r", 7)
      .attr("fill", (d) => color(d.group))
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      )
      .on("mouseenter", (evt, d) => {
        link
          .attr("display", "none")
          .filter(l => l.source.id === d.id || l.target.id === d.id)
          .attr("display", "block");
      })
      .on("mouseover", tooltip_in) 
      .on("mouseout", tooltip_out)
      .on("mouseleave", evt => {
        link.attr("display", "block");
      });

    simulation.nodes(data.nodes).on("tick", ticked);

    simulation.force("link").links(data.links);

    function dragstarted(d, event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d, event) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(d, event) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    let elements = document.getElementsByClassName('svgCharts');
    if(elements.length > 1){
        elements[0].remove();
    }

  },[props, dimensions]);



  // In render, we just need to create the container graph
  // The only important thing is we need to set ref
  // So that we can access the container in useEffect Hook
  return (
    <div
      className="fadeUp"
      ref={wrapperRef}
      style={{ marginBottom: "2rem", height: "100vh", width: "100%" }}
    >
      <g>
      <div ref={svgRef} class="svgChartContainer" />
      </g>
    </div>
  );
}

export default SNAContainer;
