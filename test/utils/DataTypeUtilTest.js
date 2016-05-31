import u from 'utils/HelperUtil';
import DataTypeUtil from 'utils/DataTypeUtil';

import should from 'should';


describe('DataTypeUtil', () => {
  describe('#isValidCridQueryFormat', () => {
    it('should accept valid crid query format', () => {
      let i, query;
      const templates = ['cr {crid}', 'CR {crid}', 'cr{crid}', 'CR{crid}', 'crid {crid}', 'CRID {crid}', '{crid}'];
      const crid = 123456;

      for (i = 0; i < templates.length; i++) {
        query = u.format(templates[i], {'crid': crid});
        DataTypeUtil.isValidCridQueryFormat(query).should.be.true();
      }
    });

    it('should reject invalid crid query format', () => {
      let i, query;
      const templates = ['cri {crid}', 'CRd {crid}', 'cr_{crid}', 'aCR{crid}', 'cridd {crid}', 'CRID  1 {crid}'];
      const crid = 123456;

      for (i = 0; i < templates.length; i++) {
        query = u.format(templates[i], {'crid': crid});
        DataTypeUtil.isValidCridQueryFormat(query).should.be.false();
      }
    });
  });
});
