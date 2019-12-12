import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import RelevantSection from 'components/pinboard-page/relevant';
import RelevantDocuments from 'components/pinboard-page/relevant/relevant-documents';
import RelevantCoaccusals from 'components/pinboard-page/relevant/relevant-coaccusals';
import RelevantComplaints from 'components/pinboard-page/relevant/relevant-complaints';


describe('<RelevantSection />', function () {
  it('should render nothing when no data', function () {
    const wrapper = shallow(
      <RelevantSection
        pinboardId='66ef1560'
        documents={ {} }
        coaccusals={ {} }
        complaints={ {} }
      />
    );

    wrapper.find('div').should.have.length(0);
  });

  it('should render relevant rows correctly', function () {
    const fetchPinboardRelevantDocuments = spy();
    const fetchPinboardRelevantCoaccusals = spy();
    const fetchPinboardRelevantComplaints = spy();
    const addItemInPinboardPage = spy();

    const wrapper = shallow(
      <RelevantSection
        pinboardId='66ef1560'
        fetchPinboardRelevantDocuments={ fetchPinboardRelevantDocuments }
        fetchPinboardRelevantCoaccusals={ fetchPinboardRelevantCoaccusals }
        fetchPinboardRelevantComplaints={ fetchPinboardRelevantComplaints }
        addItemInPinboardPage={ addItemInPinboardPage }
        documents={ [{ id: 123 }] }
        coaccusals={ [{ id: 456 }] }
        complaints={ [{ id: 789 }] }
        documentHasMore={ true }
        coaccusalHasMore={ true }
        complaintHasMore={ true }
        documentNextParams={ { limit: 19, offset: 20 } }
        coaccusalNextParams={ { limit: 21, offset: 22 } }
        complaintNextParams={ { limit: 23, offset: 24 } }
        isRequestingDocuments={ false }
        isRequestingCoaccusals={ false }
        isRequestingComplaints={ false }
      />
    );

    wrapper.find('.relevant-title').text().should.equal('Relevant');

    const relevantDocuments = wrapper.find(RelevantDocuments);
    relevantDocuments.prop('pinboardId').should.equal('66ef1560');
    relevantDocuments.prop('documents').should.eql([{ id: 123 }]);
    relevantDocuments.prop('nextParams').should.eql({ limit: 19, offset: 20 });
    relevantDocuments.prop('hasMore').should.be.true();
    relevantDocuments.prop('requesting').should.be.false();
    relevantDocuments.prop('fetchPinboardRelevantDocuments').should.equal(fetchPinboardRelevantDocuments);
    relevantDocuments.prop('addItemInPinboardPage').should.equal(addItemInPinboardPage);

    const relevantCoaccusals = wrapper.find(RelevantCoaccusals);
    relevantCoaccusals.prop('pinboardId').should.equal('66ef1560');
    relevantCoaccusals.prop('coaccusals').should.eql([{ id: 456 }]);
    relevantCoaccusals.prop('nextParams').should.eql({ limit: 21, offset: 22 });
    relevantCoaccusals.prop('hasMore').should.be.true();
    relevantCoaccusals.prop('requesting').should.be.false();
    relevantCoaccusals.prop('fetchPinboardRelevantCoaccusals').should.equal(fetchPinboardRelevantCoaccusals);
    relevantCoaccusals.prop('addItemInPinboardPage').should.equal(addItemInPinboardPage);

    const relevantComplaints = wrapper.find(RelevantComplaints);
    relevantComplaints.prop('pinboardId').should.equal('66ef1560');
    relevantComplaints.prop('complaints').should.eql([{ id: 789 }]);
    relevantComplaints.prop('nextParams').should.eql({ limit: 23, offset: 24 });
    relevantComplaints.prop('hasMore').should.be.true();
    relevantComplaints.prop('requesting').should.be.false();
    relevantComplaints.prop('fetchPinboardRelevantComplaints').should.equal(fetchPinboardRelevantComplaints);
    relevantComplaints.prop('addItemInPinboardPage').should.equal(addItemInPinboardPage);
  });
});
