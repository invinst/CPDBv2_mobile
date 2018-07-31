import React, { PropTypes } from 'react';

import style from './radar-axis.sass';
import { roundedPercentile } from 'utils/calculation';


export default class RadarAxis extends React.Component {
  renderTitleTexts(title, value, xText, yText, extraPadding, fontSize, fontWeight) {
    const { showAxisTitle, showAxisValue, textColor } = this.props;
    const textStyle = {
      fontSize: `${fontSize}px`,
      fontWeight: fontWeight,
      fill: textColor,
      stroke: 'none'
    };

    const words = title.split(' ');
    const firstPhrase = words.slice(0, -1).join(' ');
    const secondPhrase = words[words.length - 1];
    const phrases = showAxisTitle ? firstPhrase ? [firstPhrase, secondPhrase] : [secondPhrase] : [];
    const axisTitles = phrases.map((phrase, idx) => (
      <tspan
        key={ `text-${title}-${idx}` }
        className='radar-axis-title'
        style={ textStyle }
        x={ xText }
        y={ yText }
        dy={ `${extraPadding + idx * 1.25}em` }
      >
        { phrase }
      </tspan>
    ));
    const valueTitle = showAxisValue ? (
      <tspan
        key={ `text-value-${title}` }
        className='radar-axis-value'
        style={ textStyle }
        x={ xText }
        y={ yText }
        dy={ `${extraPadding + phrases.length * 1.3}em` }
      >
        { roundedPercentile(value) }
      </tspan>
    ) : null;
    return [...axisTitles, valueTitle];
  }

  render() {
    const { radius, data, axisTitleFontSize, axisTitleFontWeight } = this.props;
    const angleSlice = Math.PI * 2 / data.length;
    const labelFactor = 1.1;

    return (
      <g>
        {
          data.map((item, i) => {
            const xText = radius * labelFactor * Math.cos(angleSlice * i + Math.PI / 2);
            const yText = radius * labelFactor * Math.sin(angleSlice * i + Math.PI / 2);
            const extraPadding = +xText.toFixed(4) === 0 ? 1.1 : 1.4;

            return (
              <text
                key={ `axis--${i}` }
                className={ style.radarAxis }
                textAnchor={ +xText.toFixed(4) === 0 ? 'middle' : xText > 0 ? 'start' : 'end' }
                dy='0.35em'
                x={ xText }
                y={ yText }
              >
                {
                  this.renderTitleTexts(
                    item.axis,
                    item.value,
                    xText,
                    yText,
                    extraPadding,
                    axisTitleFontSize,
                    axisTitleFontWeight
                  )
                }
              </text>
            );
          })
        }
      </g>
    );
  }
}

RadarAxis.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    'axis': PropTypes.string,
    'value': PropTypes.number,
  })),
  textColor: PropTypes.string,
  radius: PropTypes.number,
  axisTitleFontSize: PropTypes.number,
  axisTitleFontWeight: PropTypes.number,
  showAxisTitle: PropTypes.bool,
  showAxisValue: PropTypes.bool,
};
