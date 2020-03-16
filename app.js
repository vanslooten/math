var answer = "",
    operator = '+',
    use_operator = '+',
    n1, n2, good = 0,
    bad = 0,
    max = 20;

$(document).ready(function() {
    let params = new URLSearchParams(window.location.search);
    operator = params.get('operator');
    if (operator == null) operator = '+';
    console.log("operator set to " + operator);
    newQ();
    $('input[name=max]').val(max);
});


$("button").on("click", function() {
    operator = $(this).text();
    newQ();
});

$('#question').keypress(function(event) {
    var key = (event.keyCode ? event.keyCode : event.which);
    console.log(key + ' ' + String.fromCharCode(key) + " use_operator=" + use_operator + " n1=" + n1 + " n2=" + n2);
    if (key == '13') { // enter
        answer = $('input[name=answer]').val();
        if (answer.length < 1) return; // no answer
        // check answer:
        if (use_operator == '+' && (n1 + n2) == parseInt(answer) ||
            use_operator == '-' && (n1 - n2) == parseInt(answer) ||
            use_operator == '÷' && (n1 / n2) == parseFloat(answer) ||
            use_operator == '×' && (n1 * n2) == parseFloat(answer)) {
            $('#question').css('background-color', 'green');
            good++;
            updateScore();
        } else {
            $('#question').css('background-color', 'red');
            bad++;
            updateScore();
        }
        // refresh
        setTimeout(function() {
            newQ();
        }, 2000);
    }
});

$('input[name=max]').keypress(function(event) {
    var key = (event.keyCode ? event.keyCode : event.which);
    if (key == '13') { // enter
        max = parseInt($('input[name=max]').val());
        newQ();
    }
});

function newQ() {
    // move old results
    if (answer.length > 0) {
        $('#results').prepend('<div style="background-color:' + $('#question').css('background-color') + '">' + $('#question').text().replace('?', answer) + '</div>');
    }
    // choose operator if it is in mix-mode (~)
    use_operator = operator;
    if (operator == '~') {
        // determine use_operator
        dice = Math.floor(Math.random() * 4);
        if (dice == 0) use_operator = '+';
        else if (dice == 1) use_operator = '-';
        else if (dice == 2) use_operator = '÷';
        else use_operator = '×';
    }
    use_max = max;
    if (use_operator == '×') use_max = max / 2;
    n1 = Math.floor(Math.random() * use_max) + 1;
    if (n1 > max / 2) use_max = max / 2;
    n2 = Math.floor(Math.random() * use_max) + 1;

    if (use_operator == '-' || use_operator == '÷') {
        if (n2 > n1) {
            t = n1;
            n1 = n2;
            n2 = t;
        }
    }
    $('#question').html(n1 + ' ' + use_operator + ' ' + n2 + ' = <input type="text" size=5 name="answer"><span class="qmark">?</span>');
    $('#question').css('background-color', 'white');
    $('input[name=answer]').focus();
    answer = "";
}

function updateScore() {
    $('#good').text(good);
    $('#bad').text(bad);
}