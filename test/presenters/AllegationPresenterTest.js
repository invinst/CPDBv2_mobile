import 'should';
import f from 'utils/tests/f';

import AllegationPresenter from 'presenters/AllegationPresenter';


describe('AllegationPresenter', () => {
  describe('#crid', () => {
    it('should return crid', () => {
      const allegation = f.create('Allegation');

      const presenter = AllegationPresenter(allegation);
      presenter.crid.should.be.equal(allegation['crid']);
    });

    it('should return Unknown if there is no crid', () => {
      const allegation = f.create('Allegation', { 'crid': '' });
      const presenter = AllegationPresenter(allegation);

      presenter.crid.should.be.equal('Unknown');
    });
  });

  describe('#incidentDate', () => {
    it('should return moment incident date', () => {
      const date = '2012-01-19T09:11:00';
      const allegation = f.create('Allegation', { 'incident_date': date });
      const presenter = AllegationPresenter(allegation);

      presenter.incidentDate.date().should.be.equal(19);
      presenter.incidentDate.month().should.be.equal(0);
      presenter.incidentDate.year().should.be.equal(2012);
    });
  });

  describe('#incidentDateDisplay', () => {
    it('should return incident date present', () => {
      const date = '2012-01-19T09:11:00';
      const expectedDate = 'Jan 19, 2012';
      const allegation = f.create('Allegation', { 'incident_date': date });
      const presenter = AllegationPresenter(allegation);

      presenter.incidentDateDisplay.should.be.equal(expectedDate);
    });

    it('should return unknown date if there is invalid date', () => {
      const date = 'invalid';
      const allegation = f.create('Allegation', { 'incident_date': date });
      const presenter = AllegationPresenter(allegation);

      presenter.incidentDateDisplay.should.be.equal('Unknown date');
    });
  });

  describe('#address', () => {
    it('should return full address', () => {
      const add1 = 'add1';
      const add2 = 'add2';
      const expectedAddress = 'add1 add2';
      const allegation = f.create('Allegation', { 'add1': add1, 'add2': add2 });
      const presenter = AllegationPresenter(allegation);

      presenter.address.should.be.equal(expectedAddress);
    });

    it('should return partial address if only one address is provided', () => {
      const add1 = 'add1';
      const add2 = 'add2';
      const allegation1 = f.create('Allegation', { 'add1': add1 });
      const presenter1 = AllegationPresenter(allegation1);
      const allegation2 = f.create('Allegation', { 'add2': add2 });
      const presenter2 = AllegationPresenter(allegation2);

      presenter1.address.should.be.equal(add1);
      presenter2.address.should.be.equal(add2);
    });

    it('should return empty address if there is no address', () => {
      const allegation = f.create('Allegation');
      const presenter = AllegationPresenter(allegation);

      presenter.address.should.be.equal('');
    });
  });

  describe('#city', () => {
    it('should return city', () => {
      const city = 'city';
      const allegation = f.create('Allegation', { 'city': city });
      const presenter = AllegationPresenter(allegation);

      presenter.city.should.be.equal(city);
    });

    it('should return empty string if city is not provided', () => {
      const allegation = f.create('Allegation');
      const presenter = AllegationPresenter(allegation);

      presenter.city.should.be.equal('');
    });
  });

  describe('#locationType', () => {
    it('should return locationType', () => {
      const location = 'location';
      const allegation = f.create('Allegation', { 'location': location });
      const presenter = AllegationPresenter(allegation);

      presenter.locationType.should.be.equal(location);
    });

    it('should return enpty string if no location provided', () => {
      const allegation = f.create('Allegation');
      const presenter = AllegationPresenter(allegation);

      presenter.locationType.should.be.equal('');
    });
  });

  describe('#beat', () => {
    it('should return beat name', () => {
      const beatName = 'beatName';
      const allegation = f.create('Allegation', { 'beat': { 'name': beatName } });
      const presenter = AllegationPresenter(allegation);

      presenter.beat.should.be.equal(beatName);
    });

    it('should return empty string if there is no beat name', () => {
      const allegation = f.create('Allegation', { 'beat': null });
      const presenter = AllegationPresenter(allegation);

      presenter.beat.should.be.equal('');
    });
  });

  describe('#documents', () => {
    it('should return documents ', () => {
      const documents = f.createBatch(2, 'Document');
      const allegation = f.create('Allegation', { 'documents': documents });
      const presenter = AllegationPresenter(allegation);

      presenter.documents.should.have.length(2);
    });
  });

  describe('#hasLocation', () => {
    it('should return true if have any address properties', () => {
      const addressProperties = ['beat', 'location', 'add1', 'add2', 'city', 'point'];
      let i, params, allegation, presenter;

      for (i = 0; i < addressProperties.length; i++) {
        params = {};
        params[addressProperties[i]] = 'property';
        allegation = f.create('Allegation', params);
        presenter = AllegationPresenter(allegation);

        presenter.hasLocation.should.be.true();
      }
    });

    it('should return false if there is no address properties', () => {
      const allegation = f.create('Allegation', {
        'beat': null, 'location': null, 'add1': null, 'add2': null, 'city': null, 'point': null
      });
      const presenter = AllegationPresenter(allegation);

      presenter.hasLocation.should.be.false();
    });

  });


  describe('#hasFullAddress', () => {
    it('should return true if there is full address', () => {
      const allegation = f.create('Allegation', { 'add1': 'add', 'add2': 'add2' });
      const presenter = AllegationPresenter(allegation);

      presenter.hasFullAddress.should.be.true();
    });

    it('should return false if there is only one address', () => {
      const allegation = f.create('Allegation', { 'add1': 'add1' });
      const presenter = AllegationPresenter(allegation);

      presenter.hasFullAddress.should.be.false();
    });

    it('should return false if there is empty address', () => {
      const allegation = f.create('Allegation', { 'add1': '', 'add2': '' });
      const presenter = AllegationPresenter(allegation);

      presenter.hasFullAddress.should.be.false();
    });
  });
});
