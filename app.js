console.time('test');
const mostCommon = require('most-common');
const _ = require('underscore');
const moment = require('moment');
const timestamp = require('unix-timestamp')
console.log('Started');
var columns = ["Date_and_Time", "Caller_ID", "Employee_ID", "Duration", "Talk_Time", "Status"];
var prob1 = [];
var prob2 = [];
var prob3 = [];
var prob35 = [];
var prob4 = [];
var prob6 = [];
var prob7 = [];

require("csv-to-array")({
    file: "./data.csv",
    columns: columns
}, function(err, array) {


    for (let i = 0; i < array.length; i++) {
        prob1.push(array[i].Date_and_Time);
        
        prob3.push(JSON.stringify({
            'Caller_ID': array[i].Caller_ID,
            'Employee_ID': array[i].Employee_ID
        }))
        prob35.push({
            'ce': JSON.stringify({
                'Caller_ID': array[i].Caller_ID,
                'Employee_ID': array[i].Employee_ID
            }),
            'dur': parseInt(array[i].Talk_Time)
        })

        prob1[i] = prob1[i].slice(0, 16);
        if (array[i].Status == "ANSWERED") {
            prob4.push(array[i].Employee_ID);
            prob2.push({
                time: timestamp.fromDate(array[i].Date_and_Time),
                ctime: parseInt(array[i].Talk_Time),
                active: 1
            })
            let dur = parseInt(array[i].Talk_Time);
            prob6.push({
                'id': array[i].Caller_ID,
                'dur': dur
            })
        }
        prob7.push(array[i].Caller_ID);

    }
    prob2.sort(function(a, b) {
        let probA = a.time,
            probB = b.time
        if (probA < probB)
            return -1
        if (probA > probB)
            return 1
        return 0
    })
    var maxp2 = 1;
    var min = 0;
    for (let i = 0; i < prob2.length - 1; i++) {
        let p = prob2[i].time + prob2[i].ctime
        for (let j = i + 1; p >= prob2[j].time; j++) {
            prob2[j].active++;
            if (j == prob2.length - 1) {
                break;
            }

        }

        if (maxp2 <= prob2[i].active) {
            maxp2 = prob2[i].active;
            min = prob2[i].time;
        }
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
    for (let i = 0; i < prob35.length - 1; i++) {
        if (prob35[i].ce == prob35[i + 1].ce) {
            prob35[i + 1].dur += prob35[i].dur;
        } else {
            continue;
        }
    }
console.log('\n');
    let ans = mostCommon(prob1, 1);
    console.log("Peak minute of incoming phonecalls. (including not answered phonecall): ");
    console.log(ans[0])
    console.log('\n');
    console.log('\n');
    console.log('Simultaneous calls: ')
    console.log(maxp2);
    console.log("At : ")
    console.log(moment.unix(min))
    console.log('\n');
    console.log('\n');
    ans2 = mostCommon(prob3, 1);
    console.log("Suspicious Relations : ")
    console.log("1 - Most Calls: ");
    console.log(ans2[0])
    console.log("2 - Longest Talk Time: ")
    console.log(_.max(prob35, function(prob) {
        return prob.dur;
    }));
    console.log('\n');
    console.log('\n');
    ans = mostCommon(prob4, 1);
    console.log("Most productive employee (employee with most answered phonecalls): ");
    console.log(ans[0])
    console.log('\n');
    console.log('\n');
    var x = []
    x = mostCommon(prob4, prob4.length);
    console.log("Least productive employee (employee with least answered phonecalls): ");
    console.log(x[x.length - 2])
    console.log('\n');
    console.log('\n');
    x = [];
    console.log("Client with longest talk time: ")
    console.log(_.max(prob6, function(prob) {
        return prob.dur;
    }));
    console.log('\n');
    console.log('\n');
    ans = mostCommon(prob7, 1);
    console.log("Client with most frequent calls: ");
    console.log(ans[0])
    console.log('\n');
    console.log('\n');
console.timeEnd('test');


});