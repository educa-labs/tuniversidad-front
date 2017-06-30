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

