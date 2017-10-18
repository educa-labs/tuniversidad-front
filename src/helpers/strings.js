import is from 'is_js';
import { GUEST, SITE } from '../constants/strings';

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
    } else {
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
  return `http://${url}`;
}

export function capitalize(string) {
  if (string === null) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getLocation = (path) => {
  if (path.indexOf('site') > -1) return SITE;
  return GUEST;
};

const all = { value: -1, label: 'Todas' };

export const getOptions = (items, ...rest) => {
  if (is.null(items)) return [];
  const result = items.map(item => ({
    value: item.id, label: capitalize(item.title),
  }));
  if (!rest[0]) result.unshift(all);
  return result;
};
