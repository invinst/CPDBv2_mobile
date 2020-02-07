import React from 'react';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';

export function mountWithRouter(node, options) {
  return mount(<MemoryRouter>{ node }</MemoryRouter>, options);
}
