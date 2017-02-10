import React, { Component, PropTypes } from 'react';
import style from 'styles/FAQDetail.sass';


export default class FAQDetail extends Component {
  componentWillMount() {
    this.props.requestFAQ(this.props.id);
  }

  render() {
    const { faq } = this.props;

    if (!faq || !faq.loaded) {
      return null;
    }

    const { question, answer } = faq;

    const answerParagraphs = answer.map((value, index) => (
      <p key={ index }>{ value }</p>
    ));

    return (
      <div className={ style.faqDetail }>
        <h1 className='question'>{ question.join(' - ') }</h1>
        <div className='answer'>
          { answerParagraphs }
        </div>
      </div>
    );
  }
}

FAQDetail.propTypes = {
  children: PropTypes.object,
  faq: PropTypes.object,
  requestFAQ: PropTypes.func,
  id: PropTypes.number
};
