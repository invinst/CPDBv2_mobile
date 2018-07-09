import { breadcrumbTextSelector } from 'selectors/common/breadcrumbs';


describe('breadcrumbTextSelector', () => {
  it('should return breadcrumb text', () => {
    const state = {
      breadcrumbMapping: {
        'trr/123/': 'TRR 123'
      }
    };

    breadcrumbTextSelector(state, { url: 'trr/123/' }).should.eql('TRR 123');
  });
});
