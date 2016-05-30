let ComplainingWitnessPresenter, f;

require('should');

f = require('utils/tests/f');

ComplainingWitnessPresenter = require('presenters/ComplainingWitnessPresenter');

describe('ComplainingWitnessPresenter', () => {
  describe('#description', () => {
    it('should brief information about witness\'s gender, race, age', () => {
      const complainingWitness = f.create('ComplainingWitness', {'gender': 'M', 'race': 'Black', 'age': 40});
      const expectedDescription = 'Male, Black, Age 40';
      const presenter = ComplainingWitnessPresenter(complainingWitness);

      presenter.description.should.be.equal(expectedDescription);
    });

    it('should return `Gender unknown` if there is no gender', () => {
      const complainingWitness = f.create('ComplainingWitness', {'gender': ''});
      const presenter = ComplainingWitnessPresenter(complainingWitness);

      presenter.description.should.containEql('Gender unknown');
    });

    it('should return `Age unknown` if there is no age', () => {
      const complainingWitness = f.create('ComplainingWitness', {'age': ''});
      const presenter = ComplainingWitnessPresenter(complainingWitness);

      presenter.description.should.containEql('Age unknown');
    });

    it('should return `Race unknown` if there is no race', () => {
      const complainingWitness = f.create('ComplainingWitness', {'race': ''});
      const presenter = ComplainingWitnessPresenter(complainingWitness);

      presenter.description.should.containEql('Race unknown');
    });
  });
});
