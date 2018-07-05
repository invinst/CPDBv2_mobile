import React from 'react';
import { shallow } from 'enzyme';

import ComplaintCategory from 'components/complaint-page/complaint-category';

describe('ComplaintCategory component', function () {

  it('should render correctly', function () {
    const wrapper = shallow(
      <ComplaintCategory
        category='A category'
        subcategory='A subcategory'
      />
    );
    const category = wrapper.find('.category').text();
    const subcategory = wrapper.find('.subcategory').text();

    category.should.equal('A category');
    subcategory.should.equal('A subcategory');
  });

  it('should render unknown when there are no category or subcategory', function () {
    const wrapper = shallow(
      <ComplaintCategory
      />
    );
    const category = wrapper.find('.category').text();
    const subcategory = wrapper.find('.subcategory').text();

    category.should.equal('Unknown');
    subcategory.should.equal('Unknown');
  });

});
