import should from 'should';

import { extractPercentile, extractEnoughPercentile } from 'selectors/common/percentile';
import { OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT } from 'utils/visual-token';


describe('percentile utils', function () {
  describe('extractPercentile', function () {
    it('should return visualTokenBackground, textColor, items, and year', () => {
      const officerPercentile = {
        'officer_id': 1,
        year: 2015,
        'percentile_allegation_civilian': '52.5',
        'percentile_allegation_internal': '10.1',
        'percentile_trr': '20.6',
      };
      const expected = {
        officerId: 1,
        year: 2015,
        items: [
          {
            axis: 'Use of Force Reports',
            value: 20.6,
          },
          {
            axis: 'Internal Allegations',
            value: 10.1,
          },
          {
            axis: 'Civilian Allegations',
            value: 52.5,
          },
        ],
        visualTokenBackground: '#ed7467', // corresponding to `312`
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
        hasEnoughPercentile: true,
      };
      extractPercentile(officerPercentile).should.eql(expected);
    });

    it('should return null if the given percentile is null or undefined', () => {
      should(extractPercentile(undefined)).be.null();
      should(extractPercentile(null)).be.null();
    });

    it('should handle missing percentile cases', function () {
      const officerPercentile = {
        'officer_id': 1,
        year: 2015,
        'percentile_allegation_civilian': '52.5',
        'percentile_trr': '20.6',
      };
      const expected = {
        officerId: 1,
        year: 2015,
        items: [
          {
            axis: 'Use of Force Reports',
            value: 20.6,
          },
          {
            axis: 'Internal Allegations',
            value: NaN,
          },
          {
            axis: 'Civilian Allegations',
            value: 52.5,
          },
        ],
        hasEnoughPercentile: false,
      };
      extractPercentile(officerPercentile).should.eql(expected);
    });
  });

  describe('extractEnoughPercentile', function () {
    it('should return null if the given percentile is null or undefined', () => {
      should(extractEnoughPercentile(undefined)).be.null();
      should(extractEnoughPercentile(null)).be.null();
    });

    it('should return null if missing percentile', function () {
      const officerPercentile = {
        'officer_id': 1,
        year: 2015,
        'percentile_allegation_civilian': '52.5',
        'percentile_trr': '20.6',
      };
      should(extractEnoughPercentile(officerPercentile)).be.null();
    });

    it('should return visualTokenBackground, textColor, items, and year', () => {
      const officerPercentile = {
        'officer_id': 1,
        year: 2015,
        'percentile_allegation_civilian': '52.5',
        'percentile_allegation_internal': '10.1',
        'percentile_trr': '20.6',
      };
      const expected = {
        officerId: 1,
        year: 2015,
        items: [
          {
            axis: 'Use of Force Reports',
            value: 20.6,
          },
          {
            axis: 'Internal Allegations',
            value: 10.1,
          },
          {
            axis: 'Civilian Allegations',
            value: 52.5,
          },
        ],
        visualTokenBackground: '#ed7467', // corresponding to `312`
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
        hasEnoughPercentile: true,
      };
      extractEnoughPercentile(officerPercentile).should.eql(expected);
    });
  });
});
