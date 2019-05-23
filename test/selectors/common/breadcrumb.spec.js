import { breadcrumbTextSelector, breadcrumbSelector } from 'selectors/common/breadcrumbs';


describe('breadcrumbs selectors', function () {
  describe('breadcrumbTextSelector', () => {
    it('should return breadcrumb text', () => {
      const state = {
        breadcrumbMapping: {
          '/trr/123/': 'TRR 123'
        }
      };

      breadcrumbTextSelector(state, { url: '/trr/123/' }).should.eql('TRR 123');
    });

    it('should return breadcrumb text for officer with tab name', () => {
      const state = {
        breadcrumbMapping: {
          '/officer/123/jerome-finnigan/': 'Jerome Finnigan'
        }
      };

      breadcrumbTextSelector(state, { url: '/officer/123/jerome-finnigan/coaccusals/' }).should.eql('Jerome Finnigan');
    });

    it('should return breadcrumb text for pinboard', () => {
      const state = {
        breadcrumbMapping: {
          '/pinboard/6f540c04/': 'Pinboard'
        }
      };

      breadcrumbTextSelector(state, { url: '/pinboard/6f540c04/untitled-pinboard/' }).should.eql('Pinboard');
    });
  });

  describe('breadcrumbSelector', function () {
    it('should return breadcrumb', function () {
      breadcrumbSelector({ breadcrumb: 'abc' }).should.eql('abc');
    });
  });
});
