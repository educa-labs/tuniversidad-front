export default function (number) {
  return number.toString().replace(/./g, (c, i, a)  => {
    return i && c !== "." && ((a.length - i) % 3 === 0) ? '.' + c : c;
});
}
