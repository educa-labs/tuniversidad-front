export function numeral(number) {
  return number.toString().replace(/./g, (c, i, a)  => {
    return i && c !== '.' && ((a.length - i) % 3 === 0) ? '.' + c : c;
  });
}

export function checkScore(number) {
  return number <= 850 && number >= 285;
}

