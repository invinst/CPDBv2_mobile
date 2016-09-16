import GenderPresenter from 'presenters/GenderPresenter';

describe('GenderPresenter', () => {
  describe('#humanReadable', () => {
    it('should return correct human-friendly representation for gender', () => {
      GenderPresenter('M').humanReadable.should.be.eql('Male');
      GenderPresenter('F').humanReadable.should.be.eql('Female');
      GenderPresenter('X').humanReadable.should.be.eql('X');
      GenderPresenter('Something else').humanReadable.should.be.eql('Gender unknown');
    });
  });
});
