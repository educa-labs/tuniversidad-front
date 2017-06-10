export function numeral(number) {
  return number.toString().replace(/./g, (c, i, a)  => {
    return i && c !== '.' && ((a.length - i) % 3 === 0) ? '.' + c : c;
  });
}

export function checkScore(number) {
  return number <= 850 && number >= 285;
}

export function validateRut(value) {
  let t = parseInt(value.slice(0,-1), 10), m = 0, s = 1;
  while (t > 0) {
    s = (s + t % 10 * (9 - m++%6)) % 11;
    t = Math.floor(t / 10);
  }
  var v = (s > 0) ? (s - 1)+ '' : 'k';
  if (!(v === value.slice(-1))){
    return false;
  };
  return true;
}
