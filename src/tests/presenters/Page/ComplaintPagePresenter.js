let f, ComplaintPagePresenter, HashUtil;
require('should');

f = require('utils/tests/f');
ComplaintPagePresenter = require('presenters/Page/ComplaintPagePresenter');
HashUtil = require('utils/HashUtil');


describe('ComplaintPagePresenter', () => {
  let categoryId, categoryHashId, category, officerAllegation, officerAllegations, data, allegation;

  beforeEach(() => {
    categoryId = 123;
    categoryHashId = HashUtil.encode(categoryId);
    category = f.create('Category', {'id': categoryId});
    officerAllegation = f.create('OfficerAllegation', {'cat': category});
    officerAllegations = f.createBatch(2, 'OfficerAllegation', officerAllegation);
    allegation = f.create('Allegation', {'officer_allegation_set': officerAllegations});
    data = f.create('ComplaintPageData', {'allegation': allegation});
  });

  describe('#accompliceOfficerAllegation', () => {
    it('should return accomplice officer allegation', () => {
      const presenter = ComplaintPagePresenter(data, categoryHashId);
      presenter.accompliceOfficerAllegation.should.have.length(0);
    });
  });

  describe('#againstOfficerAllegations', () => {
    it('should return against officer allegation', () => {
      const presenter = ComplaintPagePresenter(data, categoryHashId);
      presenter.againstOfficerAllegations.should.have.length(2);
    });
  });

  describe('#allegation', () => {
    it('should return allegation', () => {
      const allegation = f.create('Allegation');
      const data = f.create('ComplaintPageData', {'allegation': allegation});

      const presenter = ComplaintPagePresenter(data, '');
      presenter.allegation.should.be.equal(allegation);
    });
  });

  describe('#complainingWitnesses', () => {
    it('should return complaining Witnesses', () => {
      const witnesses = f.createBatch(2, 'ComplainingWitness');
      const data = f.create('ComplaintPageData', {'complaining_witnesses': witnesses});

      const presenter = ComplaintPagePresenter(data, '');
      presenter.complainingWitnesses.should.have.length(2);
    });
  });

  describe('#currentOfficerAllegation', () => {
    it('should return current officer allegation', () => {
      const presenter = ComplaintPagePresenter(data, categoryHashId);

      presenter.currentOfficerAllegation.should.be.eql(officerAllegation);
    });
  });

  describe('#officerAllegations', () => {
    it('should return officer allegations', () => {
      const presenter = ComplaintPagePresenter(data, categoryHashId);

      presenter.officerAllegations.should.have.length(2);
    });

    it('should return officer allegations sorted by allegations count', () => {
      let presenter;
      const officer1 = f.create('Officer', {'allegations_count': 1});
      const officer2 = f.create('Officer', {'allegations_count': 2});
      const officer3 = f.create('Officer', {'allegations_count': 3});
      const officerAllegation1 = f.create('OfficerAllegation', {'officer': officer1});
      const officerAllegation2 = f.create('OfficerAllegation', {'officer': officer2});
      const officerAllegation3 = f.create('OfficerAllegation', {'officer': officer3});
      allegation = f.create('Allegation', {
        'officer_allegation_set': [officerAllegation2, officerAllegation1, officerAllegation3]
      });
      data = {
        'allegation': allegation
      };

      presenter = ComplaintPagePresenter(data, categoryHashId);

      presenter.officerAllegations.should.be.eql([officerAllegation3, officerAllegation2, officerAllegation1]);
    });
  });

  describe('#isInvalidCategory', () => {
    it('should return true if there is current officer allegations', () => {
      const presenter = ComplaintPagePresenter(data, categoryHashId);
      presenter.isInvalidCategory.should.be.false();
    });
  });

  describe('#numberOfOfficerAllegations', () => {
    it('should return number of officerAllegations', () => {
      const presenter = ComplaintPagePresenter(data, categoryHashId);
      presenter.numberOfOfficerAllegations.should.be.equal(1);
    });
  });
});
