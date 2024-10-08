import {
  attachmentsComplaintTransform,
  complaintsWithAttachmentsSelector,
  hasAttachmentsSelector,
  attachmentsLawsuitTransform,
  lawsuitsWithAttachmentsSelector,
} from 'selectors/officer-page/attachments';


describe('Officer attachments selectors', function () {
  const complaint = {
    category: 'CR',
    coaccused: 9,
    crid: '303350',
    date: '2005-01-27',
    finding: 'Unfounded',
    kind: 'CR',
    outcome: 'No Action Taken',
    rank: 'Police Officer',
    subcategory: 'Unnecessary Display Of Weapon / Off Duty',
    'unit_description': 'Mobile Strike Force',
    'unit_name': '153',
    attachments: [
      {
        title: 'CRID 1004717 CR',
        url: 'https://www.documentcloud.org/documents/3518956-CRID-1004717-CR.html',
        'preview_image_url': 'https://assets.documentcloud.org/documents/3518956/pages/CRID-1004717-CR-p1.gif',
        'file_type': 'document',
        'id': '123456',
      },
      {
        title: 'CRID 303350 CR',
        url: 'https://www.documentcloud.org/documents/3518955-CRID-303350-CR.html',
        'preview_image_url': 'https://assets.documentcloud.org/documents/3518955/pages/CRID-303350-CR-p1.gif',
        'file_type': 'document',
        'id': '654321',
      },
    ],
  };

  const complaintWithoutAttachment = {
    category: 'CR',
    coaccused: 8,
    crid: '303345',
    date: '2005-01-27',
    finding: 'Unfounded',
    kind: 'CR',
    outcome: 'No Action Taken',
    rank: 'Police Officer',
    subcategory: 'Unnecessary Display Of Weapon / Off Duty',
    'unit_description': 'Mobile Strike Force',
    'unit_name': '153',
  };

  const complaintResult = {
    date: 'JAN 27, 2005',
    category: 'CR',
    crid: '303350',
    coaccused: 9,
    finding: 'Unfounded',
    outcome: 'No Action Taken',
    attachments: [
      {
        title: 'CRID 1004717 CR',
        url: 'https://www.documentcloud.org/documents/3518956-CRID-1004717-CR.html',
        previewImageUrl: 'https://assets.documentcloud.org/documents/3518956/pages/CRID-1004717-CR-p1.gif',
        fileType: 'document',
        id: '123456',
      },
      {
        title: 'CRID 303350 CR',
        url: 'https://www.documentcloud.org/documents/3518955-CRID-303350-CR.html',
        previewImageUrl: 'https://assets.documentcloud.org/documents/3518955/pages/CRID-303350-CR-p1.gif',
        fileType: 'document',
        id: '654321',
      },
    ],
  };

  const lawsuit = {
    date: '2000-08-06',
    kind: 'LAWSUIT',
    rank: 'Detective',
    'unit_description': 'Recruit Training Section',
    'unit_name': '044',
    'case_no': '00-L-5230',
    'primary_cause': 'Excessive force, Racial epithets',
    attachments: [
      {
        title: 'Phone subject information organization off important.',
        url: 'https://assets.documentcloud.org/documents/6246754/CRID-1086093-CR-COPA-Summary-Report.pdf',
        'preview_image_url': 'https://assets.documentcloud.org/documents/6246754/pages/CRID.gif',
        'file_type': '',
        'id': '95637',
      },
    ],
  };

  const lawsuitWithoutAttachment = {
    date: '2000-08-07',
    kind: 'LAWSUIT',
    rank: 'Detective',
    'unit_description': 'Recruit Training Section',
    'unit_name': '044',
    'case_no': '00-L-5231',
    'primary_cause': 'Excessive force, Racial epithets',
  };

  const lawsuitResult = {
    date: 'AUG 6, 2000',
    caseNo: '00-L-5230',
    primaryCause: 'Excessive force, Racial epithets',
    attachments: [
      {
        title: 'Phone subject information organization off important.',
        url: 'https://assets.documentcloud.org/documents/6246754/CRID-1086093-CR-COPA-Summary-Report.pdf',
        previewImageUrl: 'https://assets.documentcloud.org/documents/6246754/pages/CRID.gif',
        fileType: '',
        id: '95637',
      },
    ],
  };

  describe('attachmentsComplaintTransform', function () {
    it('should return correct result', function () {
      attachmentsComplaintTransform(complaint).should.eql(complaintResult);
    });
  });

  describe('complaintsWithAttachmentsSelector', function () {
    it('should return correct result', function () {
      const complaintWithoutAttachment = {
        category: 'CR',
        coaccused: 8,
        crid: '303345',
        date: '2005-01-27',
        finding: 'Unfounded',
        kind: 'CR',
        outcome: 'No Action Taken',
        rank: 'Police Officer',
        subcategory: 'Unnecessary Display Of Weapon / Off Duty',
        'unit_description': 'Mobile Strike Force',
        'unit_name': '153',
      };

      const state = {
        officerPage: {
          timeline: {
            data: {
              1: [complaint, complaintWithoutAttachment],
            },
          },
        },
      };

      complaintsWithAttachmentsSelector(state, 1).should.eql([complaintResult]);
    });
  });


  describe('hasComplaintSelector', function () {
    it('should return false if complaint has no attachment', function () {
      const state = {
        officerPage: {
          timeline: {
            data: {
              1: [complaintWithoutAttachment],
            },
          },
        },
      };
      hasAttachmentsSelector(state, 1).should.be.false();
    });

    it('should return true if any complaint has attachment', function () {
      const state = {
        officerPage: {
          timeline: {
            data: {
              1: [complaint, complaintWithoutAttachment],
            },
          },
        },
      };
      hasAttachmentsSelector(state, 1).should.be.true();
    });
  });

  describe('attachmentsLawsuitTransform', function () {
    it('should return correct result', function () {
      attachmentsLawsuitTransform(lawsuit).should.eql(lawsuitResult);
    });
  });

  describe('lawsuitsWithAttachmentsSelector', function () {
    it('should return correct result when primary_cause is not null', function () {
      const state = {
        officerPage: {
          timeline: {
            data: {
              1: [lawsuit, lawsuitWithoutAttachment],
            },
          },
        },
      };

      lawsuitsWithAttachmentsSelector(state, 1).should.eql([lawsuitResult]);
    });

    it('should return correct result when primary_cause is null', function () {
      const lawsuitWithNullPrimaryCause = { ...lawsuit, 'primary_cause': null };
      const state = {
        officerPage: {
          timeline: {
            data: {
              1: [lawsuitWithNullPrimaryCause, lawsuitWithoutAttachment],
            },
          },
        },
      };

      lawsuitsWithAttachmentsSelector(state, 1)[0].primaryCause.should.eql('Unknown');
    });
  });
});
