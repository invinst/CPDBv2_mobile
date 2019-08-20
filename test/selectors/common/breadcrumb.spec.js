import { breadcrumbTextSelector, breadcrumbSelector } from 'selectors/common/breadcrumbs';


describe('breadcrumbs selectors', function () {
  describe('breadcrumbTextSelector', () => {
    it('should return breadcrumb text', () => {
      const state = {
        breadcrumbMapping: {
          '/trr/123/': 'TRR 123',
        },
      };

      breadcrumbTextSelector(state, { url: '/trr/123/' }).should.eql('TRR 123');
    });

    it('should return breadcrumb text for officer with tab name', () => {
      const state = {
        breadcrumbMapping: {
          '/officer/123/jerome-finnigan/': 'Jerome Finnigan',
        },
      };

      breadcrumbTextSelector(state, { url: '/officer/123/jerome-finnigan/coaccusals/' }).should.eql('Jerome Finnigan');
    });
  });

  describe('breadcrumbSelector', function () {
    it('should return breadcrumb', function () {
      breadcrumbSelector({ breadcrumb: 'abc' }).should.eql('abc');
    });
  });
});
