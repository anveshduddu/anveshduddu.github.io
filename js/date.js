
    var date1 = new Date("08/19/2021");
var date2 = new Date();
  
// To calculate the time difference of two dates
var Difference_In_Time = date2.getTime() - date1.getTime();
  
// To calculate the no. of days between two dates
var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
console.log( date2.getMonth() -
    date1.getMonth() +
    12 * (date2.getFullYear() - date1.getFullYear()))
  

console.log(`${Math.round(Difference_In_Days)}days / ${ (Difference_In_Days/365).toFixed(2)}`);

//  document.getElementById("work_exp").innerText = `${Math.round(Difference_In_Days)}`;to find days
  //document.getElementById("work_exp_month").innerText = `${ (Difference_In_Days/365).toFixed(2)}`; to find years

  document.getElementById("work_exp_month").innerText = `${date2.getMonth() -date1.getMonth() +12 * (date2.getFullYear() - date1.getFullYear())}`;