<script setup>

import {onMounted, ref, watch} from "vue";
import * as d3 from "d3";

const selected = ref()
const props = defineProps(['data', 'selectedItem'])
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
  emit('update:selectedItem', newSelection.name)
})

function onViewChange(view) {
  activeView.value = view
  generateTreeObject()
}

function generateTreeObject() {
  if (activeView.value === 0) {
    generateTreeObjectRound()
  } else {
    generateTreeObjectFlat()
  }
}

function generateTreeObjectRound() {
  // Specify the chart’s dimensions.
  const rect = document.getElementById('workbench').getBoundingClientRect()
  const width = rect.width;
  const height = rect.height;
  scrollableDiv.value = false;

  const cx = width * 0.5; // adjust as needed to fit
  const cy = height * 0.5; // adjust as needed to fit
  const radius = Math.min(width, height) / 2 - 75;

  // Make sure the plot is empty.
  d3.select("#plot").selectAll("*").remove();

  // Create a radial tree layout. The layout’s first dimension (x)
  // is the angle, while the second (y) is the radius.
  const tree = d3.tree()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

  // Sort the tree and apply the layout.
  const root = tree(d3.hierarchy(JSON.parse(JSON.stringify(props.data)))
      .sort((a, b) => d3.ascending(a.data.name, b.data.name)));

  // Creates the SVG container.
  const svg = d3.select("#plot")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-cx, -cy, width, height])
      .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");

  // Append links.
  svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 2)
      .selectAll()
      .data(root.links())
      .join("path")
      .attr("d", d3.linkRadial()
          .angle(d => d.x)
          .radius(d => d.y));

  // Append nodes.
  svg.append("g")
      .selectAll()
      .data(root.descendants())
      .join("circle")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
      .attr("fill", d => d.children ? "#555" : "#555")
      .attr("r", 3)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        selected.value = d.data
      });

  // Append images.
  // svg.append("g")
  //     .selectAll()
  //     .data(root.descendants())
  //     .join("image")
  //     .attr("xlink:href", d => "logos/" + d.data.name + ".png") // replace with your image URL
  //     .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},-20)`)
  //     .attr("width", 40) // set the width of the image
  //     .attr("height", 40) // set the height of the image
  //     .style("cursor", "pointer")
  //     .on("click", (event, d) => {
  //       selected.value = d.data
  //     });

  // Append labels.
  svg.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll()
      .data(root.descendants())
      .join("text")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >= Math.PI ? 180 : 0})`)
      .attr("dy", "0.31em")
      .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
      .attr("paint-order", "stroke")
      .attr("stroke", "white")
      .attr("fill", "currentColor")
      .style("font-size", "15px")
      .style("cursor", "pointer")
      .text(d => d.data.name)
      .on("click", (event, d) => {
        selected.value = d.data
      });

  return svg.node();
}

function generateTreeObjectFlat() {
  // Specify the chart’s dimensions.
  const rect = document.getElementById('workbench').getBoundingClientRect()
  const width = rect.width;

  const root = d3.hierarchy(JSON.parse(JSON.stringify(props.data)));
  const dx = 20;
  const dy = width / (root.height + 1);

  // Make sure the plot is empty.
  d3.select("#plot").selectAll("*").remove();

  // Create a tree layout.
  const tree = d3.tree().nodeSize([dx, dy]);

  // Sort the tree and apply the layout.
  root.sort((a, b) => d3.ascending(a.data.name, b.data.name));
  tree(root);

  // Compute the extent of the tree. Note that x and y are swapped here
  // because in the tree layout, x is the breadth, but when displayed, the
  // tree extends right rather than down.
  let x0 = Infinity;
  let x1 = -x0;
  root.each(d => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });

  // Compute the adjusted height of the tree.
  const height = x1 - x0 + dx * 2;
  if (height > rect.height) {
    scrollableDiv.value = true
  } else {
    scrollableDiv.value = false
  }

  // Creates the SVG container.
  const svg = d3.select("#plot")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-dy / 3, x0 - dx, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

  // Append links.
  svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 2)
      .selectAll()
      .data(root.links())
      .join("path")
      .attr("d", d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x));

  // Append nodes.
  const node = svg.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll()
      .data(root.descendants())
      .join("g")
      .attr("transform", d => `translate(${d.y},${d.x})`)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        selected.value = d.data
      });

  node.append("circle")
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 3)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        selected.value = d.data
      });

  node.append("text")
      .attr("dy", "0.31em")
      .style("font-size", "15px")
      .style("cursor", "pointer")
      .attr("x", d => d.children ? -6 : 6)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .text(d => d.data.name)
      .clone(true).lower()
      .attr("stroke", "white")
      .on("click", (event, d) => {
        selected.value = d.data
      });

  return svg.node();
}
</script>

<template>
  <div class="overlay">
    <p-buttonGroup>
      <p-button label="Round" rounded :outlined="activeView !== 0" :severity="activeView === 0 ? '' : 'secondary'" @click="onViewChange(0)"/>
      <p-button label="Flat" rounded :outlined="activeView !== 1" :severity="activeView === 1 ? '' : 'secondary'" @click="onViewChange(1)"/>
    </p-buttonGroup>
  </div>

  <div :class="scrollableDiv ? 'scrollable-div' : 'flex'">
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
