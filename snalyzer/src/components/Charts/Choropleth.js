import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from 'topojson-client';
import india_map from './india.json';
import Papa from 'papaparse';
import '../../App.css';

const Choropleth = () => {
  const svgRef = useRef();
  const [data, setData] = useState([]);
 
  useEffect(() => {
    Papa.parse('/uploads/data.csv',{
      header:true,
      download: true,
      skipEmptyLines:true,
      complete: function (results) {
          const columnArray = [];
          const valuesArray = [];
  
          results.data.map((d) => {
              columnArray.push(Object.keys(d));
              valuesArray.push(Object.values(d));
          });
          setData(results.data)
      }
  
  })

  const color = d3.scaleOrdinal(d3.schemeBlues[9]);
  topojson.feature(india_map, india_map.objects.states)
  const chorodata = new Map(data.map(function(d) { return [d.State, +d.Values]; })) //Check this
  let path = d3.geoPath()
    // .projection(null);


    const width = 550;
    const height = 500;
    const margin = 30;

    
    const svg = d3.select(svgRef.current)
        .append("svg")
        .attr('class','svgMaps')
        .attr("viewBox", [-margin, 0, width + margin, height + margin])
        .attr('height',height + 'px')
        .attr('width',width + 'px');


    svg
        .append("g")
        .attr("id", "map")
        .selectAll("path")
        .data(topojson.feature(india_map, india_map.objects.states).features)
        .join("path")
        .attr("class", "county")
        .attr("stroke", color(20000))
        .attr("title", d => d.id + ": " + chorodata.get((d.id)))
        .attr("fill", function(d){
          if(chorodata.get(d.id) > 0){
                return color(chorodata.get(d.id))
              }
              else{
                return d3.color("black");
              }
            })
        .attr("d", path);
 
  
    svg
        .selectAll("path")
        .on("touchmove mousemove mouseover", function(event, d) {
    d3.select(this)
        .attr("fill", "red")
        .raise();
})   
    .on("touchend mouseleave", function() {
    d3.select(this)
        .attr("fill", d => color(chorodata.get(d.id)))
        .lower();
});

  let elements = document.getElementsByClassName('svgMaps');
  if(elements.length > 1){
    elements[0].remove();
  }

  })
  return (
    <div 
      className="box"
      style={{ 
        width:'max-content',
        height:'100vh',
        paddingLeft:'25px',
        marginTop:'10px', 
        marginBottom: '10px'
      }}
    >
        <h3>Choropleth of India</h3>
        <br></br>
        <div ref={svgRef} class="svgMapContainer"></div>
      <br />
    </div>
  );
};

export default Choropleth;