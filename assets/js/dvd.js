

var server = new Firebase("https://vivid-fire-8727.firebaseio.com/");

$('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
    var name = $('#nameInput').val();
    var text = $('#messageInput').val();
    if (name !== "") {
        server.push(name + ': ' + text);
        $('#messageInput').val('');
    }
    }
});

server.limit(100).on('child_added', function(snapshot) {
    var message = snapshot.val();
    $('<div/>').text(message).appendTo($('#chatroom'));
    $('#chatroom')[0].scrollTop = $('#chatroom')[0].scrollHeight;
});

var setup = function() {
    x = Math.floor(Math.random() * 400 + 50);
    y = Math.floor(Math.random() * 100 + 50);
    img = logos[Math.floor(Math.random() * logos.length)];
    direction = Math.floor(Math.random() * 4);
    win = false;
}

var board = document.getElementById("board");
var draw = board.getContext("2d");
draw.fillStyle = "#000000";
draw.fillRect(0, 0, 700, 400);

var logoNames = ["blue", "green", "pink", "red", "sky"];
var logos = [new Image(), new Image(), new Image(), new Image(), new Image()];
for (var i = 0; i < logos.length; i += 1) {
    logos[i].src = "assets/img/" + logoNames[i] + ".jpg";
}


var level = 1;
var speed = 10;

var x;
var y;
var direction;
var win;
var interval;


setup();

var img = new Image();

document.onkeydown = function() {
    if (win && window.event.keyCode === 32) {
        setup();
        level += 1;
        speed += 1;
        document.getElementById("level").innerHTML = "Level " + level;
        interval = setInterval(play, speed);
    }
}

var redraw = function() {
    draw.fillStyle = "#000000";
    draw.fillRect(0, 0, 700, 400);
    draw.drawImage(img, x, y);
}

var borders = function() {
    return {
        top: y,
        right: x + 127,
        bottom: y + 127,
        left: x
    };
}

var move = function() {
    switch (direction) {
        case 0:
            x += 1;
            y -= 1;
            break;
        case 1:
            x += 1;
            y += 1;
            break;
        case 2:
            x -= 1;
            y += 1;
            break;
        case 3:
            x -= 1;
            y -= 1;
            break;
        default:
    }
}

var collision = function() {
    if (corner()) {
        win = true;
    } else {
        var ed = edge();
        if (ed !== "none") {
            changeDirections(ed);
            changeColor();
        }
    }

}

var ish = function(x, y) {
    return ((x >= y - 2) && (x <= y + 2));
}

var corner = function() {
    var bord = borders();
    return ((ish(bord.top, 0) && ish(bord.left, 0))
        || (ish(bord.top, 0) && ish(bord.right, 699))
        || (ish(bord.bottom, 399) && ish(bord.left, 0))
        || (ish(bord.bottom, 399) && ish(bord.right, 699)));
}

var edge = function() {
    var bord = borders();
    if (bord.left === 0) {
        return "left";
    } else if (bord.top === 0) {
        return "top";
    } else if (bord.right === 699) {
        return "right";
    } else if (bord.bottom === 399) {
        return "bottom";
    } else {
        return "none";
    }
}

var changeDirections = function(edge) {
    switch (edge) {
        case "left":
            if (direction === 2) {
                direction = 1;
            } else {
                direction = 0;
            }
            break;
        case "top":
            if (direction === 0) {
                direction = 1;
            } else {
                direction = 2;
            }
            break;
        case "right":
            if (direction === 1) {
                direction = 2;
            } else {
                direction = 3;
            }
            break;
        case "bottom":
            if (direction === 2) {
                direction = 3;
            } else {
                direction = 0;
            }
            break;
        default:
    }
}

var changeColor = function() {
    var prev = img;
    img = logos[Math.floor(Math.random() * logos.length)];
    while (img === prev) {
        img = logos[Math.floor(Math.random() * logos.length)];
    }
}

var play = function() {
    move();
    redraw();
    collision();
    if (win) {
        clearInterval(interval);
        draw.fillStyle = "#FFFFFF";
        draw.font = "50px Verdana";
        draw.fillText("LEVEL UP!!", 200, 200);
        draw.font = "20px Verdana";
        draw.fillText("Press Spacebar to Continue", 200, 230);
    }
}


interval = setInterval(play, speed);

