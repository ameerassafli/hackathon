const mostCommon = require('most-common');
const _ = require('underscore');
const moment = require('moment');
const timestamp = require('unix-timestamp')
var columns = ["Date_and_Time", "Caller_ID", "Employee_ID", "Duration", "Talk_Time", "Status"];
var prob1 = [];
var prob3 = [];
var prob35 = [];
var prob4 = [];
var prob7 = [];
var prob6 = [];

require("csv-to-array")({
    file: "./data.csv",
    columns: columns
}, function(err, array) {
   

    for (let i = 0; i < array.length; i++) {
        prob1.push(array[i].Date_and_Time);
        prob3.push(JSON.stringify({'Caller_ID':array[i].Caller_ID , 'Employee_ID' : array[i].Employee_ID}))
        prob35.push({ 'ce': JSON.stringify({'Caller_ID':array[i].Caller_ID , 'Employee_ID' : array[i].Employee_ID}) , 'dur': parseInt(array[i].Talk_Time)})

        prob1[i] = prob1[i].slice(0, 16);
        if (array[i].Status == "ANSWERED") {
            prob4.push(array[i].Employee_ID);

            let dur = parseInt(array[i].Talk_Time);
            prob6.push({
                'id': array[i].Caller_ID,
                'dur': dur
            })
        }
        prob7.push(array[i].Caller_ID);

    }



    prob6.sort(function(a, b) {
        let probA = a.id,
            probB = b.id
        if (probA < probB)
            return -1
        if (probA > probB)
            return 1
        return 0
    })
    for (let i = 0; i < prob6.length - 1; i++) {
        if (prob6[i].id == prob6[i + 1].id) {
            prob6[i + 1].dur += prob6[i].dur;
        } else {
            continue;
        }
    }

prob35.sort(function(a, b) {
        let probA = a.ce,
            probB = b.ce
        if (probA < probB)
            return -1
        if (probA > probB)
            return 1
        return 0
    })
    for (let i = 0; i < prob6.length - 1; i++) {
        if (prob35[i].ce == prob35[i + 1].ce) {
            prob35[i + 1].dur += prob35[i].dur;
        } else {
            continue;
        }
    }

    let ans = mostCommon(prob1, 1);
    console.log("Peak minute of incoming phonecalls. (including not answered phonecall): " );
    console.log(ans[0])
    ans2 = mostCommon (prob3 , 1);
    console.log("Suspicious Relations : ")
    console.log("1 - Most Calls: " );
    console.log(ans2[0])
    console.log("2 - Longest Talk Time: ")
    console.log( _.max(prob35, function(prob) {
        return prob.dur;
    }));
    ans = mostCommon(prob4, 1);
    console.log("Most productive employee (employee with most answered phonecalls): " );
    console.log(ans[0])
    var x = []
    x = mostCommon(prob4, prob4.length);
    console.log("Least productive employee (employee with least answered phonecalls): " );
    console.log(x[x.length - 2])
    x = [];
    console.log("Client with longest talk time: ")
    console.log( _.max(prob6, function(prob) {
        return prob.dur;
    }));
    ans = mostCommon(prob7, 1);
    console.log("Client with most frequent calls: ");
    console.log(ans[0])

 console.log(moment.unix(1318781876))
// var now = moment()
// var formatted = now.format('YYYY-MM-DD HH:mm:ss Z') 
// console.log(formatted)
console.log(timestamp.fromDate(array[0].Date_and_Time));
console.log(moment.unix(timestamp.fromDate(array[0].Date_and_Time)))

});