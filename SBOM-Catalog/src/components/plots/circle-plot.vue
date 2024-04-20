<script setup>

import {onMounted, ref, watch} from "vue";
import * as d3 from 'd3';
import data from '../../assets/data.json';

const selected = ref()
const props = defineProps(['data'])
const emit = defineEmits(['update:selectedItem'])
const activeView = ref(1)
const scrollableDiv = ref(false)

onMounted(() => {
  generateTreeObject()
})

watch (props, () => {
  generateTreeObject()
})

watch(selected, (newSelection) => {
  emit('update:selectedItem', newSelection)
})

function onViewChange(view) {
  activeView.value = view
  generateTreeObject()
}

function generateTreeObject() {
  // Specify the chart’s dimensions.
  const rect = document.getElementById('workbench').getBoundingClientRect()
  const width = rect.width > rect.height ? rect.height : rect.width;
  const height = rect.height < rect.width ? rect.height : rect.width;
  const data = JSON.parse(JSON.stringify(props.data))

  // Make sure the plot is empty.
  d3.select("#plot").selectAll("*").remove();

  // Create the color scale.
  const color = d3.scaleLinear()
      .domain([0, 5])
      .range(["rgba(16,185,129,0.04)", "rgba(16,185,129,0.27)"])
      .interpolate(d3.interpolateHcl);

  // Compute the layout.
  const pack = data => d3.pack()
      .size([width, height])
      .padding(3)
      (d3.hierarchy(data)
          .sum(d => d.value)
          .sort((a, b) => b.value - a.value));

  const root = pack(data);

  // Create the SVG container.
  const svg = d3.select("#plot")
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
      .attr("width", width)
      .attr("height", height)
      .attr("style", `max-width: 100%; height: auto; display: block; margin: 0 -14px; background: transparent; cursor: pointer;`);

  // Define the pattern and image for each node
const defs = svg.append("defs");
root.descendants().forEach((d) => {
  const pattern = defs.append("pattern")
      .attr("id", "pattern" + d.data.name) // use the node's name to create a unique id
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "1")
      .attr("width", "1");

    // Add a circle as the background.
    pattern.append("circle")
        .attr("cx", d.r) // center the circle
        .attr("cy", d.r) // center the circle
        .attr("r", d.r) // make the radius half the size of the pattern
        .attr("fill", "white"); // set the fill color to white

  const imageSize = d.r * 2; // calculate the size of the image based on the radius of the circle

  pattern.append("image")
      .attr("xlink:href", "logos/" + d.data.name + ".png") // construct the image URL from the node's name
      .attr("height", imageSize) // set the size of the image
      .attr("width", imageSize) // set the size of the image
      .attr("x", 0) // center the image horizontally
      .attr("y", 0); // center the image vertically
});

// Append the nodes.
  const node = svg.append("g")
    .selectAll("circle")
    .data(root.descendants().slice(1))
    .join("circle")
    .attr("fill", (d) => d.children ? color(d.depth) : "white") // use the corresponding pattern
    // .attr("pointer-events", d => {selected.value = d.data.name})
    .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
    .on("mouseout", function() { d3.select(this).attr("stroke", null); })
    .on("click", (event, d) => {
      selected.value = d.data.name; // set the selected ref to the name of the clicked element
      if (focus !== d && d.children) {
        zoom(event, d);
      }
      event.stopPropagation();
    })

// Append the text labels.
const label = svg.append("g")
    .style("font", "30px sans-serif")
    .style("font-weight", "bold")
    .attr("stroke-width", 5)
    .attr("paint-order", "stroke")
    .attr("stroke", "rgb(241,241,241)")
    .attr("fill", "currentColor")
    .style("font-size", "30px")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(root.descendants())
    .join("text")
    .style("fill-opacity", d => d.parent === root ? 1 : 0)
    .style("display", d => d.parent === root ? "inline" : "none")
    .text(d => d.data.name);


  // Create the zoom behavior and zoom immediately in to the initial focus node.
  svg.on("click", (event) => zoom(event, root));
  let focus = root;
  let view;
  zoomTo([focus.x, focus.y, focus.r * 2]);

  function zoomTo(v) {
    const k = width / v[2];
    view = v;

    label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("r", d => d.r * k);

    // Create a new pattern for each zoom level.
    root.descendants().forEach((d) => {
      const pattern = defs.append("pattern")
          .attr("id", "pattern" + d.data.name + k) // use the node's name and the zoom level to create a unique id
          .attr("x", "0")
          .attr("y", "0")
          .attr("height", "1")
          .attr("width", "1");

      // Add a circle as the background.
      pattern.append("circle")
          .attr("cx", d.r * k) // center the circle
          .attr("cy", d.r * k) // center the circle
          .attr("r", d.r * k) // make the radius half the size of the pattern
          .attr("fill", "white"); // set the fill color to white

      const imageSize = d.r * 2 * k; // calculate the size of the image based on the radius of the circle and the zoom level

      pattern.append("image")
          .attr("xlink:href", "logos/" + d.data.name + ".png") // construct the image URL from the node's name
          .attr("height", imageSize) // set the size of the image
          .attr("width", imageSize) // set the size of the image
          .attr("x", 0) // center the image horizontally
          .attr("y", 0); // center the image vertically
    });

    // Update the fill attribute of the circles to use the new pattern.
    node.attr("fill", (d) => d.children ? color(d.depth) : "url(#pattern" + d.data.name + k + ")"); // use the corresponding pattern
  }

  function zoom(event, d) {
    focus = d;

    const transition = svg.transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });

    label
        .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  return svg.node();
}

</script>

<template>
  <div class="flex w-full justify-content-center">
    <svg id="plot" style="width:100%; height:100%"/>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
}
</style>
