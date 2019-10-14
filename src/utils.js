export const generateUID = () => {
  // I generate the UID from two parts here 
  // to ensure the random number provide enough bits.
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}

export const mapAirtableValues = values => values.map(value => ({
  ...value.fields,
  id: value.id,
  Record: value
}))

export function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const decimalIfExists = (n) => {
  if (n - Math.floor(n) !== 0) {
    const decimal = n.toFixed(1)
    const isWhole = decimal % 1 === 0
    const value = isWhole
      ? Math.round(decimal)
      : decimal
    return Number(value)
  } else {
    return n
  }
}