import should from 'should';

import f from 'utils/tests/f';
import ToggleComplaintPagePresenter from 'presenters/Page/ToggleComplaintPagePresenter';
import CategoryFactory from 'factories/CategoryFactory';
import OfficerAllegationFactory from 'factories/AllegationFactory';


describe('ToggleComplaintPagePresenter', () => {
  describe('#groupByCategory', () => {
    it('should return the officer allegations which are sorted by category', () => {
      const cat1 = f.create('Category', {'id': 123});
      const cat2 = f.create('Category', {'id': 456});

      const cat1OfficerAllegations = f.create('OfficerAllegation', {'cat': cat1});
      const cat2OfficerAllegations = f.create('OfficerAllegation', {'cat': cat2});
      const officerAllegations = [cat1OfficerAllegations, cat2OfficerAllegations];

      const presenter = ToggleComplaintPagePresenter(officerAllegations);
      const grouped = presenter.groupByCategory;

      grouped.should.have.property(cat1.id);
      grouped[cat1.id].should.have.length(1);
      grouped.should.have.property(cat2.id);
      grouped[cat2.id].should.have.length(1);
    });
  });
});
