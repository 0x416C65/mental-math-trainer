import { MAX_OPERAND_LENGTH } from 'utils/config';

export function getOperandLengths() {
  return [...Array(MAX_OPERAND_LENGTH).keys()].map((i) => i + 1);
}

export function getFuckYouLengths() {
  return [-1, ...Array(10).keys()].map((i) => i + 1);
}
