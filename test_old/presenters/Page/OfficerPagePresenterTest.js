import should from 'should';

import f from 'utils/tests/f';

import OfficerPagePresenter from 'presenters/Page/OfficerPagePresenter';
import AllegationFactory from 'factories/AllegationFactory';
import OfficerPageDataFactory from 'factories/OfficerPageDataFactory';


describe('OfficerPagePresenter', () => {
  describe('#complaints', () => {
    it('should return complaints sorted by `incident_date`', () => {
      const allegation1 = f.create('Allegation', { 'incident_date': '2012-10-07T07:30:00' });
      const allegation2 = f.create('Allegation', { 'incident_date': '2012-11-07T07:30:00' });
      const allegation3 = f.create('Allegation', { 'incident_date': '' });

      const officerPageData = f.create('OfficerPageData', { 'complaints': [allegation3, allegation1, allegation2] });

      const presenter = OfficerPagePresenter(officerPageData);
      presenter.complaints.should.be.eql([allegation2, allegation1, allegation3]);

    });
  });

  describe('#officerDetail', () => {
    it('should return officer', () => {
      const officer = f.create('Officer');
      const officerPageData = f.create('OfficerPageData', { 'detail': officer });

      const presenter = OfficerPagePresenter(officerPageData);

      presenter.officerDetail.should.be.eql(officer);
    });
  });

  describe('#coAccused ', () => {
    it('should return co-accused officer', () => {
      const officers = f.createBatch(2, 'Officer');
      const officerPageData = f.create('OfficerPageData', { 'co_accused': officers });

      const presenter = OfficerPagePresenter(officerPageData);

      presenter.coAccused.should.be.eql(officers);
    });
  });

  describe('#distribution', () => {
    it('should return distribution list', () => {
      const distributions = [1, 3, 4];
      const officerPageData = f.create('OfficerPageData', { 'distribution': distributions });

      const presenter = OfficerPagePresenter(officerPageData);

      presenter.distribution.should.eql(distributions);
    });
  });

});
