function smallestCommons(arr) {

  let low = 0;
  let high = 0;
  let checks = [];

  if(arr[0] < arr[1]) {
    low = arr[0];
    high = arr[1];
    for(let a = arr[0]; a <= arr[1]; a++) {
      checks.push(a);
    }
  } else {
    low = arr[1];
    high = arr[0];
    for(let a = arr[1]; a <= arr[0]; a++) {
      checks.push(a);
    }
  }

  let test = 1;
  let multiple = 1;
  let passed = false;

  while(passed == false) {
    test = low * multiple * high;
    for(let b = 0; b < checks.length; b++) {
      if(test % checks[b] != 0) {
        passed = false;
        break;
      } else {
        passed = true;
      }
    }
    if(passed == true) {
      break;
    } else {
      multiple++;
    }
  }

  return test;
}


console.log(smallestCommons([23,18]));
