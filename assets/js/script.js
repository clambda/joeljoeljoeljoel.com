$(document).ready(function() {
    $("#quote-container").click(function() {
        $("#quote").html("<u>Daily Quote</u> <br><br><i>" + quotes[Math.floor(Math.random() * quotes.length)] + "</i><br> <blockquote> -Sun Tzu </blockquote>");
        if ($("#quote-container").hasClass("blackination")) {
            $("#quote-container").removeClass("blackination");
            $("#quote-container").css("background-color", "#250935");
            $(".title").css("background-color", "#250935");
        } else {
            $("#quote-container").addClass("blackination");
            $("#quote-container").css("background-color", "black");
            $(".title").css("background-color", "black");
        }
    });
    $("#subtitle").hover(function() {
        $("#title").text("Have more Joel needs? Scroll down!");
    });
    $(window).scroll(function() {
        if ($(window).scrollTop() > $("#home-container").height() * .75) {
            $("#modal-container").show();
            $("#quote-container").hide();
        } else {
            $("#modal-container").hide();
            $("#modal-header").text("Suggestions");
            $("input").val(this.placeholder);
            $("#quote-container").show();
            var offset = ($("#home-container").width() * .5) - 200;
            var newmargin = ($(window).scrollTop() + offset) % ($("#home-container").width() - 400)
            $("#quote-container").css("margin-left", newmargin);
        }
    });
    $("#submit-button").click(function() {
        $("#modal-header").text("We got it! Scroll back up!");
    });
    $("#cancel-button").click(function() {
        $("input").val(this.placeholder);
        $(window).scrollTop(0);
    });
});