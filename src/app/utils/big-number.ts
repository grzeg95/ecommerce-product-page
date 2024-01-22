import BigNumber from 'bignumber.js';

export const times = (a: number, b: number): number => {
  return new BigNumber(a).times(new BigNumber(b)).toNumber();
}

export const div = (a: number, b: number): number => {
  return new BigNumber(a).div(new BigNumber(b)).toNumber();
}
