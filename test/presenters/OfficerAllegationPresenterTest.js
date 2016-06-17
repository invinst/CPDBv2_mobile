import f from 'utils/tests/f';
import u from 'utils/HelperUtil';
import HashUtil from 'utils/HashUtil';
import OfficerAllegationPresenter from 'presenters/OfficerAllegationPresenter';
import AppConstants from 'constants';
import moment from 'moment';

import factories from 'factories/OfficerAllegationFactory';
import should from 'should';


describe('OfficerAllegationPresenter', () => {
  describe('#category', () => {
    it('should return category', () => {
      const allegationCategory = 'allegationCategory';
      const category = f.create('Category', { 'category': allegationCategory });
      const officerAllegation = f.create('OfficerAllegation', { 'cat': category });

      const presenter = OfficerAllegationPresenter(officerAllegation);
      presenter.category.should.be.equal(allegationCategory);
    });

    it('should return Unknown if there is no category', () => {
      const allegation = f.create('OfficerAllegation', { 'cat': null });
      const presenter = OfficerAllegationPresenter(allegation);

      presenter.category.should.be.equal('Unknown');
    });
  });

  describe('#allegationName', () => {
    it('should return allegation name', () => {
      const allegationName = 'allegationCategory';
      const category = f.create('Category', { 'allegation_name': allegationName });
      const officerAllegation = f.create('OfficerAllegation', { 'cat': category });

      const presenter = OfficerAllegationPresenter(officerAllegation);
      presenter.allegationName.should.be.equal(allegationName);
    });

    it('should return empty if there is no category', () => {
      const officerAllegation = f.create('OfficerAllegation', { 'cat': null });
      const presenter = OfficerAllegationPresenter(officerAllegation);

      presenter.allegationName.should.be.equal('');
    });
  });

  describe('#startDateDisplay', () => {
    it('should return start investigation date', () => {
      const date = '2012-01-19';
      const expectedDate = 'Jan 19, 2012';
      const officerAllegation = f.create('OfficerAllegation', { 'start_date': date });

      const presenter = OfficerAllegationPresenter(officerAllegation);

      presenter.startDateDisplay.should.be.equal(expectedDate);
    });
  });

  describe('#endDateDisplay', () => {
    it('#endDateDisplay: should return end investigation date', () => {
      const date = '2012-01-19';
      const expectedDate = 'Jan 19, 2012';
      const officerAllegation = f.create('OfficerAllegation', { 'end_date': date });

      const presenter = OfficerAllegationPresenter(officerAllegation);
      presenter.endDateDisplay.should.be.equal(expectedDate);
    });
  });

  describe('#startInvestigatingAt(incidentDate)', () => {
    it('should return true if start date is same with incident date', () => {
      const date = '2012-01-19';
      const officerAllegation = f.create('OfficerAllegation', { 'start_date': date });
      const incidentDate = moment('2012-01-19', AppConstants.SIMPLE_SERVER_DATE_FORMAT);
      const presenter = OfficerAllegationPresenter(officerAllegation);

      presenter.startInvestigatingAt(incidentDate).should.be.equal(true);
    });

    it('should return true if start date is same with incident date', () => {
      const date = '2012-01-20';
      const officerAllegation = f.create('OfficerAllegation', { 'start_date': date });
      const incidentDate = moment('2012-01-19', AppConstants.SIMPLE_SERVER_DATE_FORMAT);
      const presenter = OfficerAllegationPresenter(officerAllegation);

      presenter.startInvestigatingAt(incidentDate).should.be.equal(false);
    });
  });

  describe('#haveEnoughDataForTimeline(incidentDate)', () => {
    it('should return true if have start date', () => {
      const date = '2012-01-20';
      const officerAllegation = f.create('OfficerAllegation', { 'start_date': date });
      const presenter = OfficerAllegationPresenter(officerAllegation);

      presenter.haveEnoughDataForTimeline(null).should.be.equal(true);
    });

    it('should return true if have incident date', () => {
      const officerAllegation = f.create('OfficerAllegation', { 'start_date': null });
      const presenter = OfficerAllegationPresenter(officerAllegation);

      presenter.haveEnoughDataForTimeline(moment()).should.be.equal(true);
    });

    it('should return false if there is no incident date and no start date',
      () => {
        const officerAllegation = f.create('OfficerAllegation', { 'start_date': null });
        const presenter = OfficerAllegationPresenter(officerAllegation);

        presenter.haveEnoughDataForTimeline(null).should.be.equal(false);
      }
    );
  });

  describe('#isOpenInvestigation', () => {
    it('should return true final outcome class is open-investigation', () => {
      const officerAllegation = f.create('OfficerAllegation', { 'final_outcome_class': 'open-investigation' });
      const presenter = OfficerAllegationPresenter(officerAllegation);

      presenter.isOpenInvestigation.should.be.equal(true);
    });

    it('should return false final outcome class is not open-investigation', () => {
      const officerAllegation = f.create('OfficerAllegation', { 'final_outcome_class': 'not-sustained' });
      const presenter = OfficerAllegationPresenter(officerAllegation);

      presenter.isOpenInvestigation.should.be.equal(false);
    });
  });

  describe('#finalStatus', () => {
    it('should return `Open Investigation` final outcome class is open-investigation', () => {
      const officerAllegation = f.create('OfficerAllegation', { 'final_outcome_class': 'open-investigation' });
      const presenter = OfficerAllegationPresenter(officerAllegation);

      presenter.finalStatus.should.be.equal('Open Investigation');
    });

    it('should return `Investigation Closed` with status of investigation', () => {
      const officerAllegation = f.create('OfficerAllegation', { 'final_finding': 'ex' });
      const presenter = OfficerAllegationPresenter(officerAllegation);

      presenter.finalStatus.should.be.equal('Investigation Closed (Exonerated)');
    });
  });

  describe('#finalFinding', () => {
    it('should return `Unknown` if empty', () => {
      const officerAllegation = f.create('OfficerAllegation', { 'final_finding': '' });
      const presenter = OfficerAllegationPresenter(officerAllegation);

      presenter.finalFinding.should.be.equal('Unknown');
    });

    it('should return `Unknown` if it\'s not the finding that we known', () => {
      const officerAllegation = f.create('OfficerAllegation', { 'final_finding': 'somethingnotavailable' });
      const presenter = OfficerAllegationPresenter(officerAllegation);

      presenter.finalFinding.should.be.equal('Unknown');
    });

    it('should return the display of the finding code if we know them', () => {
      const officerAllegation = f.create('OfficerAllegation', { 'final_finding': 'un' });
      const presenter = OfficerAllegationPresenter(officerAllegation);

      presenter.finalFinding.should.be.equal('Unfounded');
    });
  });

  describe('#url', () => {
    it('should return the correct url of complaint page', () => {
      const categoryId = 1;
      const categoryHashId = HashUtil.encode(1);
      const allegationName = 'this is allegation name';
      const category = f.create('Category', { id: categoryId, 'allegation_name': allegationName });
      const crid = '123';

      const officerAllegation = f.create('OfficerAllegation', { 'final_finding': 'un', 'cat': category });
      const presenter = OfficerAllegationPresenter(officerAllegation);

      const expectedUrl = u.format('/complaint/123/this-is-allegation-name/{categoryHashId}', {
        'categoryHashId': categoryHashId
      });
      presenter.url(crid).should.be.eql(expectedUrl);
    });

    it('should return no-category with null hash id if there no category', () => {
      const categoryHashId = HashUtil.encode(0);
      const crid = '123';

      const officerAllegation = f.create('OfficerAllegation', { 'final_finding': 'un', 'cat': null });
      const presenter = OfficerAllegationPresenter(officerAllegation);

      const expectedUrl = u.format('/complaint/123/no-category/{categoryHashId}', {
        'categoryHashId': categoryHashId
      });
      presenter.url(crid).should.be.eql(expectedUrl);
    });
  });
});
