import RequestDocumentErrorPresenter from 'presenters/RequestDocumentErrorPresenter';

require('should');


describe('RequestDocumentErrorPresenter', () => {
  describe('#errorMessage', () => {
    it('should return `Please provide a valid email` if the error is related to email', () => {
      const errors = {'email': 'error message'};
      const presenter = RequestDocumentErrorPresenter(errors);

      presenter.errorMessage.should.containEql('Please provide a valid email');
    });

    it('should return `An issue has occurred` if the error is unknown', () => {
      const errors = {'other': 'error message'};
      const presenter = RequestDocumentErrorPresenter(errors);

      presenter.errorMessage.should.containEql('An issue has occurred');
    });
  });
});
