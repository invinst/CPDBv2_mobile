import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { isEmpty, orderBy } from 'lodash';
import moment from 'moment';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import 'rc-slider/assets/index.css';
import cx from 'classnames';

import styles from './social-graph.sass';

const DEFAULT_GRAPH_WIDTH = 800;
const DEFAULT_GRAPH_HEIGHT = 500;
const DEFAULT_PADDING = 1.5;
const MAX_RADIUS = 20;
const COLLIDE_ALPHA = 0.5;
const NUMBER_OF_LINK_GROUP_COLORS = 6;
const DEFAULT_NODE_COLOR = '#ADADAD';


export default class SocialGraph extends Component {
  constructor(props) {
    super(props);
    this.width = DEFAULT_GRAPH_WIDTH;
    this.height = DEFAULT_GRAPH_HEIGHT;

    this.setInitialData();

    this.resizeGraph = this.resizeGraph.bind(this);
    this.tick = this.tick.bind(this);
    this.connectedNodes = this.connectedNodes.bind(this);
    this.collide = this.collide.bind(this);
  }

  componentDidMount() {
    this.svg = d3.select(ReactDOM.findDOMNode(this.refs.chart)).append('svg:svg');
    this.node = this.svg.selectAll('.node');
    this.link = this.svg.selectAll('.link');
    this.tip = d3Tip()
      .attr('class', cx(styles.socialGraphTip, 'test--graph-tooltip'))
      .direction('e')
      .offset([0, 2])
      .html(this.graphTooltip);
    this.svg.call(this.tip);
    this.drawGraph();
  }

  componentDidUpdate(prevProps) {
    const { coaccusedData, timelineIdx } = this.props;

    if (prevProps.coaccusedData !== coaccusedData) {
      this.drawGraph();
    } else {
      if (prevProps.timelineIdx !== timelineIdx) {
        this.filterAndRestart();
      }
    }
  }

  graphTooltip(graphNode) {
    return `<span>${graphNode.fname}</span>`;
  }

  setInitialData() {
    this.data = {
      linkedByIndex: {},
    };
  }

  drawGraph() {
    const { officers, listEvent, startTimelineFromBeginning, stopTimeline } = this.props;
    if (isEmpty(officers))
      return;

    stopTimeline();

    if (this.force)
      this.force.stop();

    this.setInitialData();
    const numOfEvents = listEvent.length;
    const curDate = moment(listEvent[numOfEvents - 1], 'YYYY-MM-DD').toDate();

    this.recalculateNodeLinks(curDate);

    // Compute the distinct nodes from the links.
    this.force = d3.layout.force()
      .size([this.width, this.height])
      .nodes(this.data.nodes)
      .friction(0.3)
      .links(this.data.links)
      .on('tick', this.tick);

    this.resizeGraph();
    d3.select(window).on('resize', this.resizeGraph);

    this.data.linkedByIndex = {};
    this.data.links.forEach((link) => {
      this.data.linkedByIndex[link.source.id + ',' + link.target.id] = 1;
    });
    this.data.nodes.forEach((node) => {
      this.data.linkedByIndex[node.id + ',' + node.id] = 1;
    });

    this.restart();
    startTimelineFromBeginning();
  }

  resizeGraph() {
    const chartDiv = d3.select(ReactDOM.findDOMNode(this.refs.chart)).node();
    this.width = chartDiv.clientWidth;
    this.height = chartDiv.clientHeight;

    const graphViewPortRadius = Math.min(this.width, this.height) / 2;
    const linkDistance = Math.sqrt((Math.PI * Math.pow(graphViewPortRadius, 2) / this.data.nodes.length));

    this.force.charge(-10 * linkDistance)
      .gravity(10 / linkDistance)
      .linkDistance(linkDistance);

    this.svg.attr('width', this.width).attr('height', this.height);
    this.force.size([this.width, this.height]);
  }

  _resetNodes() {
    const { officers } = this.props;
    if (!this.data.nodes) {
      let nodes = [];
      let officerHash = {};
      officers.forEach((officer, index) => {
        const officerData = {
          id: index,
          uid: officer.id,
          fname: officer.fullName,
          color: officer.visualTokenBackground,
          degree: 0,
        };
        nodes.push(officerData);
        officerHash[officer.id] = index;
      });

      this.data.nodes = nodes;
      this.data.officerHash = officerHash;
    } else {
      this.data.nodes.forEach((graphNode) => {
        graphNode.degree = 0;
      });
    }
  }

  _recalculateLinks(curDate) {
    const { coaccusedData } = this.props;
    let nodesData = {};
    coaccusedData.forEach((row) => {
      const rowDate = moment(row.incidentDate, 'YYYY-MM-DD').toDate();
      if (rowDate <= curDate) {
        const objKey = row.officerId1 + '_' + row.officerId2;
        if (nodesData[objKey]) {
          nodesData[objKey].weight = row.accussedCount;
        } else {
          const officerIndex1 = this.data.officerHash[row.officerId1];
          const officerIndex2 = this.data.officerHash[row.officerId2];
          nodesData[objKey] = {
            source: officerIndex1,
            target: officerIndex2,
            weight: row.accussedCount,
          };
        }
        nodesData[objKey]['className'] = (rowDate.getTime() === curDate.getTime()) ? 'current-link' : '';
      }
    });

    this.data.links = Object.values(nodesData);
  }

  _recalculateNodeDegrees() {
    const orderedLinks = orderBy(this.data.links, ['weight', 'source', 'target']);
    const linksCount = this.data.links.length;

    orderedLinks.forEach((link, index) => {
      this.data.nodes[link.source].degree += 1;
      this.data.nodes[link.target].degree += 1;

      link.colorGroup = Math.ceil((index + 1) * NUMBER_OF_LINK_GROUP_COLORS / linksCount);
    });
  }

  _updateLinkSourceAndTarget() {
    this.data.links.forEach((link) => {
      link.source = this.data.nodes[link.source];
      link.target = this.data.nodes[link.target];
    });
  }

  recalculateNodeLinks(curDate) {
    this._resetNodes();
    this._recalculateLinks(curDate);
    this._recalculateNodeDegrees();
    this._updateLinkSourceAndTarget();
  }

  _restartNodes() {
    this.toggleNode = 0;
    this.node = this.node.data(this.data.nodes);
    this.node.enter().insert('circle', '.cursor')
      .attr('class', 'node')
      .call(this.force.drag)
      .on('mouseover', this.tip.show)
      .on('mouseout', this.tip.hide)
      .on('dblclick', this.connectedNodes);

    this.node.attr('r', (d) => this.nodeRadius(d))
      .style('fill', (d) => d.color || DEFAULT_NODE_COLOR);

    this.node.exit().remove();
  }

  nodeRadius(node) {
    return Math.min((node.degree / 2 + 2), MAX_RADIUS);
  }

  _restartLinks() {
    this.force.links(this.data.links)
      .linkStrength((d) => 1 / (Math.min(d.source.degree, d.target.degree) + 1));
    this.link = this.link.data(this.data.links);

    this.link.enter().insert('line', '.node').attr('class', 'link');

    this.link.attr('class', (d) => `link link-group-color-${d.colorGroup} ${d.className}`);

    this.link.exit().remove();
  }

  restart() {
    this._restartNodes();
    this._restartLinks();
    this.force.start();
  }

  tick(e) {
    // bounded graph
    this.node.attr('cx', (d) => {
      const nodeRadius = this.nodeRadius(d);
      return d.x = Math.max(nodeRadius, Math.min(this.width - nodeRadius, d.x || 0));
    }).attr('cy', (d) => {
      const nodeRadius = this.nodeRadius(d);
      return d.y = Math.max(nodeRadius, Math.min(this.height - nodeRadius, d.y || 0));
    });

    this.node.each(this.collide());

    this.link.attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);
  }

  connectedNodes(currentNode) {
    const neighboring = (a, b) => {
      return this.data.linkedByIndex[a.index + ',' + b.index];
    };

    if (this.toggleNode === 0) {
      //Reduce the opacity of all but the neighbouring nodes
      this.node.style('opacity', function (otherNode) {
        return neighboring(currentNode, otherNode) | neighboring(otherNode, currentNode) ? 1 : 0.1;
      });
      this.link.style('opacity', function (otherNode) {
        return currentNode.index === otherNode.source.index | currentNode.index === otherNode.target.index ? 1 : 0.1;
      });
      this.toggleNode = 1;
      currentNode.fixed = false;
    } else {
      //Put them back to opacity=1
      this.node.style('opacity', 1);
      this.link.style('opacity', 1);
      this.toggleNode = 0;
    }
  }

  filterAndRestart() {
    const { listEvent, timelineIdx } = this.props;
    const dateObj = moment(listEvent[timelineIdx], 'YYYY-MM-DD');
    const curDate = dateObj.toDate();

    this.recalculateNodeLinks(curDate);
    this.restart();
  }

  collide() {
    const quadtree = d3.geom.quadtree(this.data.nodes);
    return (currentNode) => {
      let r = this.nodeRadius(currentNode) + MAX_RADIUS,
        nx1 = currentNode.x - r,
        nx2 = currentNode.x + r,
        ny1 = currentNode.y - r,
        ny2 = currentNode.y + r;
      quadtree.visit((quad, x1, y1, x2, y2) => {
        if (quad.point && (quad.point !== currentNode)) {
          let x = currentNode.x - quad.point.x,
            y = currentNode.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = (currentNode.degree / 2 + 3) + (quad.point.degree / 2 + 3) + DEFAULT_PADDING;
          if (l && r && l < r) {
            l = (l - r) / l * COLLIDE_ALPHA;
            currentNode.x -= x *= l;
            currentNode.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  }

  render() {
    const { officers } = this.props;

    return (
      <div ref='chart' className={ styles.socialGraph }>
        { isEmpty(officers) && <img className='loading-img' src='/img/loading-large.svg' /> }
      </div>
    );
  }
}

SocialGraph.propTypes = {
  officers: PropTypes.array.isRequired,
  coaccusedData: PropTypes.array.isRequired,
  listEvent: PropTypes.array.isRequired,
  timelineIdx: PropTypes.number,
  startTimelineFromBeginning: PropTypes.func,
  stopTimeline: PropTypes.func,
};

SocialGraph.defaultProps = {
  startTimelineFromBeginning: () => {},
  stopTimeline: () => {},
};
