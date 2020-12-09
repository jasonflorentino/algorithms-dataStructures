function steamrollArray(arr) {
  let flatArr = [];

  function flatten(a) {
    for(let i = 0; i < a.length; i++) {
      if(Array.isArray(a[i])) {
        flatten(a[i]);
      } else {
        flatArr.push(a[i]);
      }
    }
  };

  flatten(arr);
  console.log(flatArr);
  return flatArr;
}

steamrollArray([1, [], [3, [[4]]]]);

/* TESTS

steamrollArray([[["a"]], [["b"]]]) should return ["a", "b"].

steamrollArray([1, [2], [3, [[4]]]]) should return [1, 2, 3, 4].

steamrollArray([1, [], [3, [[4]]]]) should return [1, 3, 4].

steamrollArray([1, {}, [3, [[4]]]]) should return [1, {}, 3, 4].

*/
