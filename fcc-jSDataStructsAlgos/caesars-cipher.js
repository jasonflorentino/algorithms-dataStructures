// JavaScript Algorithms and Data Structures Projects: Caesars Cipher

function rot13(str) {
  // a & b are corresponding indexes for cipher letters
  const a = ["A","B","C","D","E","F","G","H","I","J","K","L","M"];
  const b = ["N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  const reg = /\w/;
  let newStr = [];

  // For each letter in the given string
  for(let i = 0; i < str.length; i++) {
    // If the currently indexed char is a letter
    if(reg.test(str[i])) {
      // If the letter is NOT inside array a
      if(a.findIndex(z => z == str[i]) === -1) {
        // Push onto newStr the letter from a at index of b
        newStr.push(a[b.findIndex(z => z == str[i])]);
      } else {
        // Push onto newStr the letter from b at index of a
        newStr.push(b[a.findIndex(z => z == str[i])]);
      };
    } else {
      // Current char is not a letter -- push it as is.
      newStr.push(str[i])
    };
  }
  // Return newStr as joined from array.
  return newStr.join('');
};

console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."));

/* TESTS
rot13("SERR PBQR PNZC") should decode to FREE CODE CAMP

rot13("SERR CVMMN!") should decode to FREE PIZZA!

rot13("SERR YBIR?") should decode to FREE LOVE?

rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.") should decode to THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.
*/