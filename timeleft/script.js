let option = 13;

function daysLeft(d) {
    const jun13 = new Date("June 13, 2021 00:00:00 GMT+08:00");
    const jun15 = new Date("June 15, 2021 10:00:00 GMT+08:00");
    const now = Date.now();
    var timeLeft;

    if (d == 13) {
        timeLeft = jun13 - now;
        $("#days").html(Math.floor(timeLeft/86400000).toString());
        $("#hours").html(Math.floor((timeLeft%86400000)/3600000).toString());
        $("#min").html(Math.floor((timeLeft%3600000)/60000).toString());
        $("#sec").html(Math.floor((timeLeft%60000)/1000).toString());
    } else {
        timeLeft = jun15 - now;
        $("#days").html(Math.floor(timeLeft/86400000).toString());
        $("#hours").html(Math.floor((timeLeft%86400000)/3600000).toString());
        $("#min").html(Math.floor((timeLeft%3600000)/60000).toString());
        $("#sec").html(Math.floor((timeLeft%60000)/1000).toString());
    }
}

$("#jun13").click(function() {
    if ($("#jun13w").hasClass("active") == false) {
        console.log("hi");
        $("#jun13w").addClass("active");
        $("#jun15w").removeClass("active");
        $("#time").html("Jun 13, midnight");
        option = 13;
        window.setInterval(daysLeft(option), 10);
    }
});

$("#jun15").click(function() {
    if ($("#jun15w").hasClass("active") == false) {
        console.log("hi");
        $("#jun15w").addClass("active");
        $("#jun13w").removeClass("active");
        $("#time").html("Jun 15, 10am");
        option = 15;
        window.setInterval(daysLeft(option), 10);
    }
});

