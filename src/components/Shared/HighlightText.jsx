import React from 'react';


const HighlightText = React.createClass({
  propTypes: {
    fullText: React.PropTypes.string,
    textToFind: React.PropTypes.string
  },

  render() {
    const fullText = this.props.fullText.toString();
    const textToFind = this.props.textToFind.toString();
    const highlightFrom = fullText.toLowerCase().indexOf(textToFind.toLowerCase());
    let textBefore, textAfter, textToHighlight;

    if (highlightFrom >= 0) {

      textBefore = fullText.substring(0, highlightFrom);
      textAfter = fullText.substring(highlightFrom + textToFind.length);
      textToHighlight = fullText.substring(highlightFrom, highlightFrom + textToFind.length);
      return (
        <div className='inline'> { textBefore }<span className='highlight'>{ textToHighlight }</span>{ textAfter }</div>
      );
    }
    return (
      <span>{ fullText }</span>
    );
  }
});

export default HighlightText;
