import * as d3 from 'd3';

const drag = (simulation) => {
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
  return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
};

export const runForceGraph = (container, data) => {
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  const links = data.links.map((d) => Object.create(d));
  const nodes = data.nodes.map((d) => Object.create(d));

  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      'link',
      d3.forceLink(links).id((d) => d.name),
    )
    .force('charge', d3.forceManyBody().strength())
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(50));

  const svg = d3.select(container).append('svg').attr('viewBox', [0, 0, width, height]);

  const link = svg
    .append('g')
    .attr('stroke', '#999')
    .attr('stroke-opacity', 0.6)
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke-width', (d) => Math.sqrt(d.value));

  var node = svg
    .append('g')
    .attr('class', 'nodes')
    .selectAll('g')
    .data(nodes)
    .enter()
    .append('g')
    .call(drag(simulation));

  var circle = node.append('circle').attr('r', 5).attr('fill', color);

  var label = node
    .append('text')
    .text(function (d) {
      return d.name;
    })
    .attr('x', 6)
    .attr('y', 3)
    .attr('text-anchor', 'start');

  node.append('title').text(function (d) {
    return d.name;
  });

  simulation.on('tick', () => {
    link
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);
    node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    circle.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    label
      .attr('x', function (d) {
        return d.x + 10;
      })
      .attr('y', function (d) {
        return d.y + 5;
      });
  });

  return {
    destroy: () => {
      simulation.stop();
    },
    nodes: () => {
      return svg.node();
    },
  };
};
