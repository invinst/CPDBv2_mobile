import should from 'should'; // eslint-disable-line no-unused-vars
import {
  getRichTextValueAsArray,
  getStringValue,
  getDateValueAsString,
} from 'utils/cms-data-util';

const report = {
  'fields': [
    {
      'type': 'rich_text',
      'name': 'title',
      'value': {
        'entityMap': {},
        'blocks': [
          {
            'text': 'This is a title',
            'entityRanges': [],
            'depth': 0,
            'key': '8hqgc',
            'type': 'unstyled',
            'inlineStyleRanges': [],
            'data': {
            },
          },
        ],
      },
    },
    {
      'type': 'rich_text',
      'name': 'excerpt',
      'value': {
        'entityMap': {},
        'blocks': [
          {
            'text': 'Excerpt goes here',
            'entityRanges': [],
            'depth': 0,
            'key': '13c7l',
            'type': 'unstyled',
            'inlineStyleRanges': [],
            'data': {},
          },
        ],
      },
    },
    {
      'type': 'string',
      'name': 'publication',
      'value': 'test',
    },
    {
      'type': 'date',
      'name': 'publish_date',
      'value': '2016-11-30',
    },
    {
      'type': 'string',
      'name': 'author',
      'value': 'test',
    },
    {
      'type': 'rich_text',
      'name': 'article_link',
      'value': {
        'entityMap': {
          '0': {
            'type': 'LINK',
            'data': {
              'url': 'http://google.com',
            },
            'mutability': 'MUTABLE',
          },
        },
        'blocks': [
          {
            'text': 'should appear on top',
            'entityRanges': [
              {
                'length': 6,
                'key': 0,
                'offset': 7,
              },
            ],
            'depth': 0,
            'key': '5p7gk',
            'type': 'unstyled',
            'inlineStyleRanges': [],
            'data': {},
          },
        ],
      },
    },
  ],
  'meta': {},
  'id': 215,
};


describe('CmsDataUtil', () => {
  describe('getRichTextValueAsArray', () => {
    it('should return correct data', () => {
      const data = getRichTextValueAsArray(report, 'excerpt');
      data.should.be.eql(['Excerpt goes here']);
    });

    it('should return empty array if field exists but is not rich_text', () => {
      const data = getRichTextValueAsArray(report, 'data');
      data.should.be.eql([]);
    });

    it('should return empty array if field does not exist', () => {
      const data = getRichTextValueAsArray(report, 'foobar');
      data.should.be.eql([]);
    });
  });

  describe('getStringValue', () => {
    it('should return correct data', () => {
      const data = getStringValue(report, 'publication');
      data.should.be.eql('test');
    });

    it('should return empty string if field exists but is not string', () => {
      const data = getStringValue(report, 'article_link');
      data.should.be.eql('');
    });

    it('should return empty string if field does not exist', () => {
      const data = getStringValue(report, 'foo');
      data.should.be.eql('');
    });
  });

  describe('getDateValueAsString', () => {
    it('should return correct data', () => {
      const data = getDateValueAsString(report, 'publish_date');
      data.should.be.eql('Nov 30, 2016');
    });

    it('should return empty string if field exists but is not a date', () => {
      const data = getDateValueAsString(report, 'publication');
      data.should.be.eql('');
    });

    it('should return empty string if field does not exist', () => {
      const data = getDateValueAsString(report, 'bar');
      data.should.be.eql('');
    });
  });
});
