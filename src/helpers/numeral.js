import is from 'is_js';

export function numeral(number) {
  return number.toString().replace(/./g, (c, i, a)  => {
    return i && c !== '.' && ((a.length - i) % 3 === 0) ? '.' + c : c;
  });
}

export function checkScore(number) {
  return number <= 850 && number >= 285;
}

export function validateRut(value) {
  if (value.length > 10) return false;
  if (!value.includes('-')) return false;
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

export function validateDate(value) {
  const data = value.split('-');
  const day = data[0];
  let max = 28;
  if (is.inArray(day, [1, 3, 5, 7, 8, 10, 12])) max = 31;
  if (is.inArray(day, [4, 6, 9, 11])) max = 30;
  return day <= max;
}

export function validatePhone(value) {
  return value.length === 12 && value.slice(0, 4) === '+569' && !isNaN(value.slice(1));
}
