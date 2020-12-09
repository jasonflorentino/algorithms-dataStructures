
// JavaScript Algorithms and Data Structures Projects: Roman Numeral Converter

function convertToRoman(num) {
    let romNum = []; // Put roman nums here
    let vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]; // List of values, descending
    let romVals = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"] // Corresponding list of roman nums
    let counter = num // Counter as we subtract values

    // Subtraction function - subtract a value from the counter until it goes negative. Push the corresponding roman num for each subtraction. Return what's left when it can't subtract anymore.
    let subtract = function(start, val, romval) {
        while(start-val >= 0) {
            start -= val;  
            romNum.push(romval);
        };
        return start;
    };

    // Call Subtraction from largest value to smallest value, starting with a smaller number each time.
    for(let i = 0; i < vals.length; i++){
        counter = subtract(counter, vals[i], romVals[i]);
    }

    // Return the joined list of all the WHOLE roman nums that got pushed in.
 return romNum.join('');
}

// Function Call
console.log(convertToRoman(1023));

/* TESTS
convertToRoman(2) should return "II".

convertToRoman(3) should return "III".

convertToRoman(4) should return "IV".

convertToRoman(5) should return "V".

convertToRoman(9) should return "IX".

convertToRoman(12) should return "XII".

convertToRoman(16) should return "XVI".

convertToRoman(29) should return "XXIX".

convertToRoman(44) should return "XLIV".

convertToRoman(45) should return "XLV"

convertToRoman(68) should return "LXVIII"

convertToRoman(83) should return "LXXXIII"

convertToRoman(97) should return "XCVII"

convertToRoman(99) should return "XCIX"

convertToRoman(400) should return "CD"

convertToRoman(500) should return "D"

convertToRoman(501) should return "DI"

convertToRoman(649) should return "DCXLIX"

convertToRoman(798) should return "DCCXCVIII"

convertToRoman(891) should return "DCCCXCI"

convertToRoman(1000) should return "M"

convertToRoman(1004) should return "MIV"

convertToRoman(1006) should return "MVI"

convertToRoman(1023) should return "MXXIII"

convertToRoman(2014) should return "MMXIV"

convertToRoman(3999) should return "MMMCMXCIX"
*/