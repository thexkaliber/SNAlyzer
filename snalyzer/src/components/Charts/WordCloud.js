import React, { useRef, useEffect} from "react";
import cloud from 'd3-cloud';
import * as d3 from 'd3';
import wordcloudjson from '../../r/snalyzer/labeled_data_models/wordcloud.json'
import '../../App.css'
const WordCloud = () => {
  const svgRef = useRef();

  useEffect(() => {
    const words = wordcloudjson.slice(0,50).map(function(d) {
      return {text: d.word, size: (d.count/100)*1.9};
    });

       const color = d3.scaleOrdinal(d3.schemeCategory10);
   
       var margin = {top: 10, right: 10, bottom: 10, left: 10},
           width = 400 - margin.left - margin.right,
           height = 400 - margin.top - margin.bottom;
   
       var svg = d3.select(svgRef.current).append("svg")
           .attr("width", width + margin.left + margin.right)
           .attr("height", height + margin.top + margin.bottom)
       .append("g")
           .attr("transform",
             "translate(" + margin.left + "," + margin.top + ")");
   
   
       var clouds = cloud()
       .size([width, height])
       .words(words)
       .padding(1)        //space between words function() { return ~~(Math.random() * 2) * 90; }
       .rotate(0)
       .fontSize(function(d) { return d.size; })      // font size of words
       .on("end", draw);
   clouds.start();
   
   function draw(words) {
     svg
       .append("g")
         .attr("transform", "translate(" + clouds.size()[0] / 2 + "," + clouds.size()[1] / 2 + ")")
         .selectAll("text")
           .data(words)
         .enter().append("text")
           .style("font-size", function(d) { return d.size; })
           .style("fill", d => color(d.size))
           .attr("text-anchor", "middle")
           .style("font-family", "Impact")
           .attr("transform", function(d) {
             return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
           })
           .text(function(d) { return d.text; });
        }
  });

  return (
    <div 
      className="box"
      style={{
        width:'400px',
        textAlign:'center',
        marginTop: "2rem",
        marginLeft:'5px'
      }}
    >
        <h3>Agenda Priorities</h3>
      <svg ref={svgRef} 
      style={{  
        overflow: "visible",
        width:'100%',
        height:'400px',
        }}
        >
      </svg>
      <br />
    </div>
  );
};

export default WordCloud;