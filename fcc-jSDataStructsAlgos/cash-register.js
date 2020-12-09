function checkCashRegister(price, cash, cid) {
  const vals = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
  let changeDue = [];
  let diff = cash - price;
  let cashInDrawer = 0;

  // Calculate how much cash in in the drawer
  for(let i = 0; i < cid.length; i++) {
    cashInDrawer += cid[i][1];
  }

  // Determine status
  if(cashInDrawer < diff) {
    return {status: "INSUFFICIENT_FUNDS", change: []}
  } else if(cashInDrawer.toFixed(2) == diff) {
    return {status: "CLOSED", change: cid}
  } else {
    // For each denomination of money
    for(let i = cid.length-1; i >= 0; i--) {
      // If subtracting one from diff is legal AND there is money in till to subtract
      if(diff - vals[i] > 0 && cid[i][1] > 0) {
        // Instantiate object to be pushed into changeDue
        let count = [cid[i][0], 0];
        // While there is still change to make AND still till money in that demonination to make it
        while(diff - vals[i] >= 0 && cid[i][1] > 0){
          diff -= vals[i];        // Subtract from remaining change
          cid[i][1] -= vals[i];   // Subtract from till
          count[1] += vals[i];    // Add to object
          diff = diff.toFixed(2)  // Round change remaining
        }
        changeDue.push(count);
      }
    }
    // Handles enough value in till, but can't make change.
    if(diff > 0) {
      return {status: "INSUFFICIENT_FUNDS", change: []}
    } else {
    return {status: "OPEN", change: changeDue}
    };
  };
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));

/* TEST
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return an object.

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["QUARTER", 0.5]]}.

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.
*/