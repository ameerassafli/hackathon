const mostCommon = require('most-common');
//const inArray = require('in-array');
const _ = require('underscore');
var columns = ["Date_and_Time", "Caller_ID", "Employee_ID" , "Duration", "Talk_Time","Status"];
var prob1 = [];
var prob4 = [];
var prob7 = [];
var prob6 = [];
var w ;
 require("csv-to-array")({
   file: "./data.csv",
   columns: columns
},  function (err, array) {
  //console.log(err || array);
 
  for(let i=0 ; i<array.length ; i++){
prob1.push(array[i].Date_and_Time);
prob1[i]= prob1[i].slice(0,16);
if(array[i].Status == "ANSWERED"){
prob4.push(  array[i].Employee_ID  );
// let id = array[i].Caller_ID;
// let dur = parseInt(array[i].Talk_Time) ;
// //console.log(id);
// //console.log(_.indexOf(prob6 , {id : id })!= -1)
// if (_.findLastIndex(prob6 , {  id : id })!= -1){
// 	 w= _.findLastIndex(prob6 , {  id: id});
// 	// console.log(w)
// 	prob6[w].dur +=dur ;
	

// }

// else {prob6.push({'id' : id , 'dur': dur}); }



}
prob7.push(array[i].Caller_ID);
//console.log(peak[i]);
}

//console.log(prob6.length)
let ans = mostCommon(prob1, 1);
console.log("Peak minute of incoming phonecalls. (including not answered phonecall): "+ans[0].token);
ans = mostCommon(prob4, 1);
console.log("Most productive employee (employee with most answered phonecalls): " + ans[0].token);
var x = []
x = mostCommon(prob4 , prob4.length);
console.log ( "Least productive employee (employee with least answered phonecalls): "+ x[x.length - 2].token);
x = [];
ans = mostCommon(prob7 , 1);
console.log( "Client with most frequent calls: "+ ans[0].token);
//console.log(_.max(prob6, function(prob){ return prob.dur; }));


});

