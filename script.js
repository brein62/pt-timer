// for debugging purposes
const activitiesTest = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 480, 540, 555, 600, 615, 660, 675, 720, 735, 780, 795, 840, 900, 915, 960, 975, 1020, 1035, 1080, 1095, 1140, 1155, 1200, 1260, 1275, 1320, 1335, 1380, 1395, 1440, 1455, 1500, 1515, 1560, 1620, 1800];
const testMode = false;

var startTime = 0;
var endTime = 0;
var elapsedTime = 0;
var displayedTime = 0;
var j = 0;
var activities = [180, 195, 240, 255, 300, 315, 360, 375, 420, 435, 480, 540, 555, 600, 615, 660, 675, 720, 735, 780, 795, 840, 900, 915, 960, 975, 1020, 1035, 1080, 1095, 1140, 1155, 1200, 1260, 1275, 1320, 1335, 1380, 1395, 1440, 1455, 1500, 1515, 1560, 1620, 1800];
var activitynameT = ['Warm Up', 'Set 1: 15s Rest 1', 'Set 1: Execute Exercise 1', 'Set 1: 15s Rest 2', 'Set 1: Execute Exercise 2', 'Set 1: 15s Rest 3', 'Set 1: Execute Exercise 3', 'Set 1: 15s Rest 4', 'Set 1: Execute Exercise 4', 'Set 1: 15s Rest 5', 'Set 1: Execute Exercise 5', '60s Rest 1', 'Set 2: 15s Rest 1', 'Set 2: Execute Exercise 1', 'Set 2: 15s Rest 2', 'Set 2: Execute Exercise 2', 'Set 2: 15s Rest 3', 'Set 2: Execute Exercise 3', 'Set 2: 15s Rest 4', 'Set 2: Execute Exercise 4', 'Set 2: 15s Rest 5', 'Set 2: Execute Exercise 5', '60s Rest 2', 'Set 3: 15s Rest 1', 'Set 3: Execute Exercise 1', 'Set 3: 15s Rest 2', 'Set 3: Execute Exercise 2', 'Set 3: 15s Rest 3', 'Set 3: Execute Exercise 3', 'Set 3: 15s Rest 4', 'Set 3: Execute Exercise 4', 'Set 3: 15s Rest 5', 'Set 3: Execute Exercise 5', '60s Rest 3', 'Set 4: 15s Rest 1', 'Set 4: Execute Exercise 1', 'Set 4: 15s Rest 2', 'Set 4: Execute Exercise 2', 'Set 4: 15s Rest 3', 'Set 4: Execute Exercise 3', 'Set 4: 15s Rest 4', 'Set 4: Execute Exercise 4', 'Set 4: 15s Rest 5', 'Set 4: Execute Exercise 5', '60s Rest 4', 'Cool Down', 'Done'];
var activityname = ['Warm Up', 'Set 1: 15s Rest 1', 'Set 1: Execute Exercise 1', 'Set 1: 15s Rest 2', 'Set 1: Execute Exercise 2', 'Set 1: 15s Rest 3', 'Set 1: Execute Exercise 3', 'Set 1: 15s Rest 4', 'Set 1: Execute Exercise 4', 'Set 1: 15s Rest 5', 'Set 1: Execute Exercise 5', '60s Rest 1', 'Set 2: 15s Rest 1', 'Set 2: Execute Exercise 1', 'Set 2: 15s Rest 2', 'Set 2: Execute Exercise 2', 'Set 2: 15s Rest 3', 'Set 2: Execute Exercise 3', 'Set 2: 15s Rest 4', 'Set 2: Execute Exercise 4', 'Set 2: 15s Rest 5', 'Set 2: Execute Exercise 5', '60s Rest 2', 'Set 3: 15s Rest 1', 'Set 3: Execute Exercise 1', 'Set 3: 15s Rest 2', 'Set 3: Execute Exercise 2', 'Set 3: 15s Rest 3', 'Set 3: Execute Exercise 3', 'Set 3: 15s Rest 4', 'Set 3: Execute Exercise 4', 'Set 3: 15s Rest 5', 'Set 3: Execute Exercise 5', '60s Rest 3', 'Set 4: 15s Rest 1', 'Set 4: Execute Exercise 1', 'Set 4: 15s Rest 2', 'Set 4: Execute Exercise 2', 'Set 4: 15s Rest 3', 'Set 4: Execute Exercise 3', 'Set 4: 15s Rest 4', 'Set 4: Execute Exercise 4', 'Set 4: 15s Rest 5', 'Set 4: Execute Exercise 5', '60s Rest 4', 'Cool Down', 'Done'];
var running = false;
var night = false;
const soundEffect = new Audio();
var played = false;

if (testMode) activities = activitiesTest;

$(document).ready(function() {
    $("#timerc").hide();
    $("#popup-panel").hide();
    $("#popup-container").hide();
    editActivities();

    $("#edit-activity").click(function() {
        $("#popup-panel").show();
        $("#popup-container").show();
    });
    $("#close-panel").click(function() {
        $("#popup-panel").hide();
        $("#popup-container").hide();
        editActivities();
    });
    $("#night").click(function(){
        nightMode();
    });
    $("#start").click(function(){
        $("#startc").hide();
        $("#timerc").show();
        soundEffect.play();
        startTiming();
    });
});
function nightMode() {
    if (!night) {
        night = true;
        $("body").css({"background-color": "#111111", "color": "#eeeeee"});
        // $("button").css({"background-color": "#999999", "color": "#666666", "box-shadow": "0 4px #444444"});
        $("input").css({"color": "#222222", "background-color": "#999999"});
        $("fieldset").css({"border-color": "#ffffff33"});
        // $("button:active").css({"box-shadow": "0 1px #222222"});
        $("#container").css({"border": "solid 3px #eeeeee"});
        $("#night").html("Day Mode");
    } else {
        night = false;
        $("body").css({"color": "#111111", "background-color": "#eeeeee"});
        // $("button").css({"color": "#bbbbbb", "background-color": "#444444", "box-shadow": "0 4px #999999"});
        $("input").css({"color": "revert", "background-color": "revert"});
        $("fieldset").css({"border-color": "revert"});
        // $("button:active").css({"box-shadow": "0 1px #666666"});
        $("#container").css({"border": "solid 3px #111111"});
        $("#night").html("Night Mode");
    }
}
function replace(i, find, repl) {
    if ($(repl).val() != "") {
        repl = $(repl).val();
    } else {
        repl = $(repl).attr("placeholder");
    }
    if (activitynameT[i].includes(find)) {
        console.log("a" + activityname[i]);
        activityname[i] = activityname[i].replace(find, repl);
        console.log("b" + activityname[i]);
    }
}
function editActivities() {
    for (var i = 0; i < activitynameT.length; i++) {
        activityname[i] = activitynameT[i];
        replace(i, "Exercise 1", "#activity-1");
        replace(i, "Exercise 2", "#activity-2");
        replace(i, "Exercise 3", "#activity-3");
        replace(i, "Exercise 4", "#activity-4");
        replace(i, "Exercise 5", "#activity-5");
    }
}
function startTiming() {
    running = true;
    startTime = new Date().getTime();
    $("#activity").html("Warm Up");
    $("#next-activity").html(activityname[1]);
    time();
} 
function stopTiming() {
    running = false;
    $("#activity").html("Workout done. Timer not started yet");
    $("#next-activity").html("-");
    $("#startc").show();
    $("#timer").html("3:00");
    $("#timerc").hide();
    startTime = 0;
    endTime = 0;
    elapsedTime = 0;
    displayedTime = 0;
    j = 0;
}
function time() {
    endTime = new Date().getTime();
    elapsedTime = endTime - startTime;
    if (elapsedTime > 1800000) {
        clearTimeout('time()');
        stopTiming();
        return;
    }
    if (elapsedTime >= activities[j] * 1000) {
        j += 1;
        played = false;
        $("#activity").html(activityname[j]);
        $("#next-activity").html(activityname[j + 1]);
    }
    displayedTime = activities[j] * 1000 - elapsedTime;
    if (displayedTime < 3000) {
        $("#timer").css("color", "red");
    } else {
        $("#timer").css("color", "inherit");
    }
    $("#timer").html(mstoTime(Math.ceil(displayedTime / 1000) * 1000));
    $("#elapsed").html(mstoTime(elapsedTime));
    if (displayedTime < 5000) {
        if (!played) {
            soundEffect.src = 'count.mp3';
            soundEffect.play();
            played = true;
        }
    }
    prev = $("#timer").html();
    setTimeout('time()', 15);
}
function mstoTime(input) {
    var ms, s, min, hr;			//actual integer
    var msd, sd, mind, hrd;		//string formatted form
    ms = input % 1000;
    s = ((input - ms)/1000)%60;
    min = ((((input-ms)/1000) - s) / 60) % 60;
    hr = (((((input-ms)/1000) - s) / 60) - min) / 60;
    msd = display(ms, 3);
    sd = display(s,2);
    hrd = hr;
    if (hr > 0) {
        mind = display(min,2);
        return `${hrd}:${mind}:${sd}`;			
    } else {
        mind = min;
        return `${mind}:${sd}`;
    }
}
function display(input, places) {
    var i, result;
    result = input;
    for (i = 1; i < places; i++) {
        if (input < (Math.pow(10,places) / Math.pow(10, i))) {
            result = "0" + result;
        }
    }
    return result;
}