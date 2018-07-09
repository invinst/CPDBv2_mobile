import React, { PropTypes } from 'react';
import { scaleLinear } from 'd3-scale';
import { curveLinearClosed, radialLine } from 'd3-shape';

import style from './radar-axis.sass';
import RadarAxisText from './radar-axis/radar-axis-text';


export default class RadarAxis extends React.Component {
  render() {
    const {
      radius, data, maxValue, showAxisTitle, textColor, strokeWidth,
      axisTitleFontSize, axisTitleFontWeight, showAxisValue
    } = this.props;
    if (!data)
      return <g/>;

    const angleSlice = Math.PI * 2 / data.length;

    const rScale = scaleLinear()
      .range([0, radius + strokeWidth])
      .domain([0, maxValue]);

    const radarLine = radialLine()
      .curve(curveLinearClosed)
      .radius(rScale(maxValue))
      .angle((d, i) => i * angleSlice - Math.PI);

    return (
      <g className={ style.radarAxis }>
        {
          (showAxisTitle || showAxisValue) && (
            <RadarAxisText
              radius={ radius }
              data={ data }
              textColor={ textColor }
              showAxisTitle={ showAxisTitle }
              showAxisValue={ showAxisValue }
              axisTitleFontSize={ axisTitleFontSize }
              axisTitleFontWeight={ axisTitleFontWeight }
            />
          )
        }

        <path
          className='radar-boundary-area'
          d={ radarLine(data.map(() => ({ value: maxValue }))) }
        />
      </g>
    );
  }
}

RadarAxis.defaultProps = {
  showAxisTitle: false,
  showAxisValue: false,
};

RadarAxis.propTypes = {
  radius: PropTypes.number,
  maxValue: PropTypes.number,
  data: PropTypes.array,
  textColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  showAxisTitle: PropTypes.bool,
  showAxisValue: PropTypes.bool,
  axisTitleFontSize: PropTypes.number,
  axisTitleFontWeight: PropTypes.number,
};
