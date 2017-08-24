import is from 'is_js';

export function makeList(list) {
  let rep = '';
  for (let i = 0; i < list.length; i++) {
    if (i === 0) rep = list[i];
    else if (i === list.length - 1) {
      if (list[i][0] === 'H') {
        rep = `${rep} e ${list[i]}`;
      } else {
        rep = `${rep} y ${list[i]}`;
      }
    }
    else {
      rep = `${rep}, ${list[i]}`;
    }
  }
  return rep;
}

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export function getDate(dateInString) {
  const date = new Date(dateInString);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${day} de ${months[month]} de ${year}`;
}

export function getDate2(dateString) {
  const list = dateString.split('-');
  const day = Number(list[0]);
  const month = Number(list[1]);
  const year = list[2];
  return `${day} de ${months[month - 1]} de ${year}`;
}

export function getUrl(url) {
  console.log(is.url(url));
  return `http://${url}`;
}
