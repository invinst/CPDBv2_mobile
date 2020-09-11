import numeral from 'numeral';

const MONEY_FORMAT = '0,0.00';
const MONEY_FORMAT_SHORT = '0.0a';

export const moneyFormat = (money) => Number(money) ? numeral(money).format(MONEY_FORMAT) : null;
export const moneyFormatShort = (money) => Number(money) ? numeral(money).format(MONEY_FORMAT_SHORT) : '0';
