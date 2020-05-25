import {
  getVisualTokenOIGBackground,
  hasEnoughRadarChartData,
} from 'utils/visual-token';
import { softBlackColor } from 'utils/styles';


describe('VisualToken utils', function () {
  describe('getVisualTokenOIGBackground', function () {
    context('allegation percentile between 0 and 5', function () {
      it('should return correct background and text colors', function () {
        getVisualTokenOIGBackground(0).should.eql({
          backgroundColor: '#F5F4F4',
          textColor: softBlackColor,
        });

        getVisualTokenOIGBackground(4).should.eql({
          backgroundColor: '#F5F4F4',
          textColor: softBlackColor,
        });
      });
    });

    context('allegation percentile between 5 and 30', function () {
      it('should return correct background and text colors', function () {
        getVisualTokenOIGBackground(5).should.eql({
          backgroundColor: '#F9D3C3',
          textColor: softBlackColor,
        });

        getVisualTokenOIGBackground(29.9).should.eql({
          backgroundColor: '#F9D3C3',
          textColor: softBlackColor,
        });
      });
    });

    context('allegation percentile between 30 and 50', function () {
      it('should return correct background and text colors', function () {
        getVisualTokenOIGBackground(30).should.eql({
          backgroundColor: '#F4A298',
          textColor: softBlackColor,
        });

        getVisualTokenOIGBackground(49.9).should.eql({
          backgroundColor: '#F4A298',
          textColor: softBlackColor,
        });
      });
    });

    context('allegation percentile between 50 and 70', function () {
      it('should return correct background and text colors', function () {
        getVisualTokenOIGBackground(50).should.eql({
          backgroundColor: '#FF6453',
          textColor: softBlackColor,
        });

        getVisualTokenOIGBackground(69.9).should.eql({
          backgroundColor: '#FF6453',
          textColor: softBlackColor,
        });
      });
    });

    context('allegation percentile between 70 and 90', function () {
      it('should return correct background and text colors', function () {
        getVisualTokenOIGBackground(70).should.eql({
          backgroundColor: '#FF412C',
          textColor: softBlackColor,
        });

        getVisualTokenOIGBackground(89.99).should.eql({
          backgroundColor: '#FF412C',
          textColor: softBlackColor,
        });
      });
    });

    context('allegation percentile between 90 and 100', function () {
      it('should return correct background and text colors', function () {
        getVisualTokenOIGBackground(90).should.eql({
          backgroundColor: '#F52524',
          textColor: '#DFDFDF',
        });

        getVisualTokenOIGBackground(99.9).should.eql({
          backgroundColor: '#F52524',
          textColor: '#DFDFDF',
        });
      });
    });
  });

  describe('hasEnoughRadarChartData', function () {
    it('should return false if items is empty', function () {
      hasEnoughRadarChartData([]).should.be.false();
      hasEnoughRadarChartData(undefined).should.be.false();
    });

    it('should return false if some item value is missing', function () {
      hasEnoughRadarChartData([
        { axis: 'Use of Force Reports', value: 80 },
        { axis: 'Civilian Complaints', value: 70 },
        { axis: 'Internal Complaints', value: NaN },
      ]).should.be.false();
    });

    it('should return true if all item values is OK', function () {
      hasEnoughRadarChartData([
        { axis: 'Use of Force Reports', value: 80 },
        { axis: 'Civilian Complaints', value: 70 },
        { axis: 'Internal Complaints', value: 10 },
      ]).should.be.true();
    });
  });
});
