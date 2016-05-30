import HelperUtil from 'utils/HelperUtil';


const SvgUtil = {
  arrayToPoints(data, scaleX, scaleY) {
    let result = '';
    let i;

    for (i = 0; i < data.length; i++) {
      result = [result, HelperUtil.format('{i},{value}', {'i': i * scaleX, 'value': data[i] * scaleY})].join(' ');
    }

    return result;
  }
};

export default SvgUtil;
