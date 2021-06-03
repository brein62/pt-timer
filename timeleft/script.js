let option = 13;
let option2 = 16;

function page() {
    window.setInterval(function(){daysLeft(option, option2)}, 10);
}

function daysLeft(option1, option2) {
    const jun13 = new Date("June 13, 2021 00:00:00 GMT+08:00");
    const jun15 = new Date("June 15, 2021 10:00:00 GMT+08:00");
    const may16 = new Date("May 16, 2021 00:00:00 GMT+08:00");
    const may18 = new Date("May 18, 2021 17:00:00 GMT+08:00");
    const now = Date.now();
    var timeLeft1, timeLeft2;
    var sel1, sel2, totalTime, progress;

    if (option1 == 13) {
        sel1 = jun13;
    } else if (option1 == 15) {
        sel1 = jun15;
    }

    timeLeft1 = sel1 - now;

    if (option2 == 16) {
        sel2 = may16;
    } else if (option2 == 18) {
        sel2 = may18;
    }

    timeLeft2 = now - sel2;
    totalTime = sel1 - sel2;

    progress = (Math.round(timeLeft2/totalTime*100000)/1000);

    $("#days-1").html(Math.floor(timeLeft1/86400000).toString());
    $("#hours-1").html(Math.floor((timeLeft1%86400000)/3600000).toString());
    $("#min-1").html(Math.floor((timeLeft1%3600000)/60000).toString());
    $("#sec-1").html(Math.floor((timeLeft1%60000)/1000).toString());
    $("#days-2").html(Math.floor(timeLeft2/86400000).toString());
    $("#hours-2").html(Math.floor((timeLeft2%86400000)/3600000).toString());
    $("#min-2").html(Math.floor((timeLeft2%3600000)/60000).toString());
    $("#sec-2").html(Math.floor((timeLeft2%60000)/1000).toString());
    $("#progress-text").html(progress.toString() + "%");
    $("#progress-bar").css("width", progress.toString() + "%");
    $("#progress-bar").attr("aria-valuenow", progress.toString());
}

$("#jun13").click(function() {
    if ($("#jun13w").hasClass("active") == false) {
        console.log("hi");
        $("#jun13w").addClass("active");
        $("#jun15w").removeClass("active");
        $("#time-1").html("Jun 13, midnight");
        option = 13;
        window.setInterval(daysLeft(option, option2), 10);
    }
});

$("#jun15").click(function() {
    if ($("#jun15w").hasClass("active") == false) {
        console.log("hi");
        $("#jun15w").addClass("active");
        $("#jun13w").removeClass("active");
        $("#time-1").html("Jun 15, 10am");
        option = 15;
        window.setInterval(daysLeft(option, option2), 10);
    }
});

$("#may16").click(function() {
    if ($("#may16w").hasClass("active") == false) {
        console.log("hi");
        $("#may16w").addClass("active");
        $("#may18w").removeClass("active");
        $("#time-2").html("May 16, midnight");
        option2 = 16;
        window.setInterval(daysLeft(option, option2), 10);
    }
});

$("#may18").click(function() {
    if ($("#may18w").hasClass("active") == false) {
        console.log("hi");
        $("#may18w").addClass("active");
        $("#may16w").removeClass("active");
        $("#time-2").html("May 18, 5pm");
        option2 = 18;
        window.setInterval(daysLeft(option, option2), 10);
    }
});