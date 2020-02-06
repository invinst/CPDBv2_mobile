import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map, find, isEqual } from 'lodash';
import { Muuri } from 'utils/muuri';

import { OfficerCardWithUndo as OfficerCard } from '../cards/officer-card';
import { CRCardWithUndo as CRCard } from '../cards/cr-card';
import { TRRCardWithUndo as TRRCard } from '../cards/trr-card';
import styles from './pinned-grid.sass';
import { getPageYBottomOffset, scrollByBottomOffset } from 'utils/navigation-util';

const CARD_MAP = {
  'OFFICER': OfficerCard,
  'CR': CRCard,
  'TRR': TRRCard,
};


export default class PinnedGrid extends Component {
  constructor(props) {
    super(props);

    this.rendered = false;
    this.updateOrder = this.updateOrder.bind(this);
    this.removeItemInPinboardPage = this.removeItemInPinboardPage.bind(this);
  }

  componentDidMount() {
    this.initGrid();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.bottomOffset = this.rendered ? getPageYBottomOffset() : null;
    this.rendered = true;
  }

  componentDidUpdate(prevProps) {
    const { items } = this.props;
    items.forEach(item => {
      if (!find(prevProps.items, { id: item.id })) {
        this.gridMuuri.add(this.itemElements[item.id]);
      }
    });

    this.bottomOffset && scrollByBottomOffset(this.bottomOffset);
  }

  componentWillUnmount() {
    this.gridMuuri.destroy();
  }

  initGrid() {
    this.gridMuuri = new Muuri(this.grid, {
      itemClass: 'pinned-grid-item',
      dragEnabled: true,
    });

    this.gridMuuri.on('dragEnd', this.updateOrder);
  }

  updateOrder() {
    const { orderPinboard, type, items } = this.props;
    const newIds = this.gridMuuri.getItems().map(item => item.getElement().getAttribute('data-id'));
    const currentIds = map(items, item => item.id);

    if (!isEqual(newIds, currentIds)) {
      orderPinboard({ type, ids: newIds });
    }
  }

  removeItemInPinboardPage(item) {
    this.gridMuuri.remove(this.itemElements[item.id]);

    setTimeout(
      () => this.props.removeItemInPinboardPage(item),
      200
    );
  }

  render() {
    const { type, items } = this.props;
    const Card = CARD_MAP[type];
    this.itemElements = {};

    return (
      <div className={ styles.pinnedGrid } ref={ grid => this.grid = grid }>
        {
          map(items, item => (
            <div
              key={ item.id }
              className='pinned-grid-item'
              data-id={ item.id }
              ref={ element => this.itemElements[item.id] = element }
            >
              <div className='item-content'>
                <Card
                  item={ item }
                  removeItemInPinboardPage={ this.removeItemInPinboardPage }
                />
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

PinnedGrid.propTypes = {
  type: PropTypes.string,
  items: PropTypes.array,
  removeItemInPinboardPage: PropTypes.func,
  orderPinboard: PropTypes.func,
};

PinnedGrid.defaultProps = {
  items: [],
};
