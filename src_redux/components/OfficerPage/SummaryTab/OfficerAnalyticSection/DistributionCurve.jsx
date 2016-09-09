import React from 'react';
import HelperUtil from 'utils/HelperUtil';
import CollectionUtil from 'utils/CollectionUtil';
import OfficerUtil from 'utils/OfficerUtil';
import SvgUtil from 'utils/SvgUtil';
import style from 'styles/OfficerPage/SummaryTab/OfficerAnalyticSection/DistributionCurve.sass';


const DistributionCurve = React.createClass({
  propTypes: {
    officer: React.PropTypes.object,
    distribution: React.PropTypes.array
  },

  getAreaPoints(data, scaleX, scaleY) {
    // Area chart is drawn as a polygon with first point is 0,0
    const maxOfXAxis = data.length; // number of complaints
    const firstPoint = '0,0'; // first point of poly line should be 0, 0
    const lastPoint = HelperUtil.format('{x},{y}', { 'x': maxOfXAxis * scaleX, 'y': 0 });
    const points = [firstPoint, SvgUtil.arrayToPoints(data, scaleX, scaleY), lastPoint].join(' ');

    return points;
  },

  render() {
    // TODO: Splitting this ernomous `render()`
    const data = this.props.distribution;
    const defaultPadding = 36;
    const defaultWidth = 320;
    const defaultChartHeight = 122;
    const redLineDifferentToMaxOfData = 30;

    // we keep distribution chart the same even we switch the portrait
    const screenWidthSize = Math.min(document.body.clientHeight, document.body.clientWidth);
    const wrapperWidthSize = screenWidthSize;
    const scaleTo320 = screenWidthSize / defaultWidth;

    // Caculating max number of x and y axis
    const maxOfXAxis = data.length; // number of complaints
    const maxOfYAxis = CollectionUtil.getMax(data); // number of officers

    // by design, we have 36px padding in left and right
    const availableWidthForDistributionChart = screenWidthSize - defaultPadding - defaultPadding;
    const availableHeightForDistributionChart = defaultChartHeight * scaleTo320; // fixed by design
    const wrapperHeightSize = availableHeightForDistributionChart + defaultPadding + defaultPadding;

    // calculating the scale between data and drawing panel size
    const scaleX = availableWidthForDistributionChart / maxOfXAxis;
    const scaleY = availableHeightForDistributionChart / maxOfYAxis;

    const allegationsCount = HelperUtil.fetch(this.props.officer, 'allegations_count', 0);
    const x = allegationsCount;
    const lineX = x * scaleX;
    // it should be smaller than the max on of y a-xis a bit
    const lineY = maxOfYAxis * scaleY - redLineDifferentToMaxOfData;

    const areaChartPoints = this.getAreaPoints(data, scaleX, scaleY);
    const distributionCurveWrapperStyle = {
      'paddingTop': wrapperHeightSize,
      'width': wrapperWidthSize
    };

    const viewBox = HelperUtil.format('0 0 {width} {height}', {
      'width': wrapperWidthSize, 'height': wrapperHeightSize
    });
    const translate = HelperUtil.format('translate(36, {y})', { 'y': availableHeightForDistributionChart + 36 });
    const numberOfOfficerTextX = -wrapperHeightSize / 2;
    const fillClass = OfficerUtil.getColorLevelClass('fill', allegationsCount);
    const strokeClass = OfficerUtil.getColorLevelClass('stroke', allegationsCount);

    return (
      <div className={ style.distributionCurve }>
        <div className='distribution-curve-wrapper' style={ distributionCurveWrapperStyle }>
          <svg x='0px' y='0px' viewBox={ viewBox }>
            <g transform={ translate }>
              <g transform='scale(1, -1)'>
                <polygon
                  className='distribution-chart'
                  points={ areaChartPoints }/>
                <line className={ strokeClass } x1={ lineX } y1='0' x2={ lineX } y2={ lineY } />
                <ellipse className={ fillClass } ry='5' rx='5' cy={ lineY } cx={ lineX }/>
              </g>
            </g>

            <text textAnchor='middle' className={ fillClass } x={ lineX + defaultPadding } y='53'>
              { allegationsCount }
            </text>

            <g transform='rotate(-90)'>
              <text textAnchor='middle' className='legend' x={ numberOfOfficerTextX } y='18'>Number of Officers</text>
            </g>
            <text textAnchor='middle' className='legend' x={ wrapperWidthSize / 2 } y={ wrapperHeightSize - 14 }>
              Number of Complaints
            </text>
          </svg>
        </div>
      </div>
    );
  }
});

DistributionCurve.defaultProps = {
  officer: {},
  distribution: []
};

export default DistributionCurve;
