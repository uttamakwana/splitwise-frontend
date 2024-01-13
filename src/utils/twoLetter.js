export const twoLetter = (input) => {
  // Split the string into an array of words
  const words = input.split(" ");
  // Take the first character of each word
  let outputString = "";
  for (var i = 0; i < words.length; i++) {
    outputString += words[i].charAt(0);
  }
  // Output the result
  return outputString;
};
