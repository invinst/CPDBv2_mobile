import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Image from 'components/shared/image';

describe('Image component', function () {
  before(function () { sinon.useFakeTimers(); });

  it('should be renderable', function () {
    shallow(
      <Image />
    ).should.be.ok();
  });

  it('should render image with given src if loaded successful', function () {
    const sampleImage = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

    const instance = mount(
      <Image src={ sampleImage } fallback='fallback' />
    );

    instance.setState({
      loaded: true,
      error: false,
    });

    instance.find('img').prop('src').should.eql(sampleImage);
  });

  it('should render image with fallback source if loaded fail', function () {
    const instance = mount(
      <Image src={ 'invalid image' } fallback='fallback' />
    );

    instance.setState({
      loaded: true,
      error: true,
    });

    instance.find('img').prop('src').should.eql('fallback');
  });
});
