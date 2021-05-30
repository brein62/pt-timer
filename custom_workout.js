var startTime = 0;
var endTime = 0;
var elapsedTime = 0;
var displayedTime = 0;
var j = 0;
var totalDuration = 1800000;
var activities = [180, 195, 240, 255, 300, 315, 360, 375, 420, 435, 480, 540, 555, 600, 615, 660, 675, 720, 735, 780, 795, 840, 900, 915, 960, 975, 1020, 1035, 1080, 1095, 1140, 1155, 1200, 1260, 1275, 1320, 1335, 1380, 1395, 1440, 1455, 1500, 1515, 1560, 1620, 1800];
var activityname = ['Warm Up', 'Set 1: 15s Rest 1', 'Set 1: Execute Exercise 1', 'Set 1: 15s Rest 2', 'Set 1: Execute Exercise 2', 'Set 1: 15s Rest 3', 'Set 1: Execute Exercise 3', 'Set 1: 15s Rest 4', 'Set 1: Execute Exercise 4', 'Set 1: 15s Rest 5', 'Set 1: Execute Exercise 5', '60s Rest 1', 'Set 2: 15s Rest 1', 'Set 2: Execute Exercise 1', 'Set 2: 15s Rest 2', 'Set 2: Execute Exercise 2', 'Set 2: 15s Rest 3', 'Set 2: Execute Exercise 3', 'Set 2: 15s Rest 4', 'Set 2: Execute Exercise 4', 'Set 2: 15s Rest 5', 'Set 2: Execute Exercise 5', '60s Rest 2', 'Set 3: 15s Rest 1', 'Set 3: Execute Exercise 1', 'Set 3: 15s Rest 2', 'Set 3: Execute Exercise 2', 'Set 3: 15s Rest 3', 'Set 3: Execute Exercise 3', 'Set 3: 15s Rest 4', 'Set 3: Execute Exercise 4', 'Set 3: 15s Rest 5', 'Set 3: Execute Exercise 5', '60s Rest 3', 'Set 4: 15s Rest 1', 'Set 4: Execute Exercise 1', 'Set 4: 15s Rest 2', 'Set 4: Execute Exercise 2', 'Set 4: 15s Rest 3', 'Set 4: Execute Exercise 3', 'Set 4: 15s Rest 4', 'Set 4: Execute Exercise 4', 'Set 4: 15s Rest 5', 'Set 4: Execute Exercise 5', '60s Rest 4', 'Cool Down', 'Done'];
var running = false;
var night = false;
const soundEffect = new Audio();
var played = false;
var fileContents = "";

function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0]; 

    if (f) {
        var r = new FileReader();
        r.onload = function(e) { 
            var contents = e.target.result;
            fileContents = contents;
            $("#csvtext").val(fileContents);
        }
        r.readAsText(f);
    } else { 
        alert("Failed to load file");
    }
}

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
    $("#save-panel").click(function() {
        save($("#csvdisplay").html(), $("#csvtext").val());
    })			
    document.getElementById('csvfile').addEventListener('change', readSingleFile, false);

    $("#csvfile").change(function() {
        $("#csvdisplay").html($("#csvfile").val().substr(12));
    });
});
function save(filename, data) {
    var blob = new Blob([data], {type: 'text/csv'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}	

function nightMode() {
    if (!night) {
        night = true;
        $("body").css({"background-color": "#111111", "color": "#eeeeee"});
        $("button").css({"background-color": "#999999", "color": "#666666", "box-shadow": "0 4px #444444"});
        $("input").css({"color": "#222222", "background-color": "#999999"});
        $("button:active").css({"box-shadow": "0 1px #222222"});
        $("#container").css({"border": "solid 3px #eeeeee"});
        $("#night").html("Day Mode");
    } else {
        night = false;
        $("body").css({"color": "#111111", "background-color": "#eeeeee"});
        $("button").css({"color": "#bbbbbb", "background-color": "#444444", "box-shadow": "0 4px #999999"});
        $("input").css({"color": "revert", "background-color": "revert"});
        $("button:active").css({"box-shadow": "0 1px #666666"});
        $("#container").css({"border": "solid 3px #111111"});
        $("#night").html("Night Mode");
    }
}
function editActivities() {
    var csvContents = $("#csvtext").val();
    var csvLines = csvContents.split("\n");
    var csvActivity, csvDuration;
    var total = 0;
    activities = [];
    activityname = [];
    for (var i = 0; i < csvLines.length; i++) {
        csvActivity = csvLines[i].split(",")[0];
        csvDuration = csvLines[i].split(",")[1];
        total += parseInt(csvDuration);
        activities.push(total);
        activityname.push(csvActivity);
    }
    activityname.push("Done");
    totalDuration = 1000 * total;
    
}
function startTiming() {
    running = true;
    startTime = new Date().getTime();
    $("#activity").html(activityname[0]);
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
    if (elapsedTime > totalDuration) {
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