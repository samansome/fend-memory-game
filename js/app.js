let min, sec, hours, letsStop;
min = 0;
sec = 0;
hours = 0;
letsStop = 0;
window.onload = function() {
    setInterval(function() {
        if (letsStop !== 1) {
            sec++;
            if (sec === 60) {
                min++;
                sec = 0;
            }
            if (min === 60) {
                hours++;
                min = 0;
                sec = 0;
            }
            $('.timer').html(hours + ':' + min + ':' + sec);
            /*if(letsStop === 1)
             {
                break;
            }*/
            console.log(min);
            console.log(sec);
        }

    }, 1000);
};

/*
 * Create a list that holds all of your cards
 */
let cards = [];
let cardsIcon = ["fa fa-slack", "fa fa-slack", "fa fa-linkedin-square",
    "fa fa-linkedin-square", "fa fa-css3", "fa fa-css3", "fa fa-github", "fa fa-github",
    "fa fa-cube", "fa fa-cube", "fa fa-codepen", "fa fa-codepen", "fa fa-google",
    "fa fa-google", "fa fa-chrome", "fa fa-chrome",
];
let openCards = [];

let cardsContainer = document.querySelector(".deck");

// Display the cards on the page

for (let i = 0; i < cardsIcon.length; i++) {
    let card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${cardsIcon[i]}"></i>`;
    cardsContainer.appendChild(card);
}
/*
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
$('.deck').each(function() {
    $(this).find('li').each(function() {
        cards.push($(this));
    });
});
let temp = 0;

cardsIcon = shuffle(cardsIcon);

let cardNumber = 0;
$('.deck').each(function() {
    $(this).find('li').find('i').each(function() {
        $(this).removeAttr('class');
        $(this).addClass(cardsIcon[cardNumber]);
        cardNumber++;
    });
});

$('.deck').each(function() {
    $(this).find('li').find('i').each(function() {
        let tempClass = $($(cards[temp][0]).find('i')[0]).attr('class');
        $(this).removeAttr('class');
        $(this).addClass(tempClass);
        temp++;
    });
});
// Shuffle function 
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let moves = 0,
    stars = 3;

removeProperties = function(prop) {
    setTimeout(function() {
        prop.removeClass('show open animated wobble');
        openCards[0].removeClass('show open animated wobble');
        openCards = [];
    }, 400);
};

showCardOnClick = function(clickEvent) {
    clickEvent.on('click', function() {
        moves++;
        if (moves === 20) {

        } else if (moves > 20 && moves <= 30) {
            $('section ul li').hide();
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            stars = 2;
        } else if (moves > 30) {
            $('section ul li').hide();
            $('section ul').append('<li><i class="fa fa-star"></i></li>');
            stars = 1;
        }
        $('.moves').html(moves);
        if ((openCards.length % 2) === 0) {
            $(this).addClass('show open animated wobble');
            $(this).off('click');
            openCards.push($(this));
        } else if (openCards.length !== 0) {
            $(this).addClass('show open animated wobble');

            let self = $(this);
            for (var i = 0; i < openCards.length; i++) {
                if (openCards[i].find('i').attr('class') === self.find('i').attr('class')) {
                    self.removeClass('animated wobble');
                    self.addClass('show match animated rubberBand');
                    openCards[i].removeClass('animated wobble');
                    openCards[i].addClass('show match animated rubberBand');
                    console.log('match');
                    $(this).off('click');
                    openCards = [];
                    break;
                } else {
                    self.addClass('show open animated wobble');
                    removeProperties(self);
                    openCards[0].on('click', showCardOnClick(openCards[0]));
                    console.log('no match');
                }
            }
        }
        if ($('.deck').find('.match').length === 16) {
            setTimeout(function() {
                $('.deck').each(function() {
                    swal({
                        title: 'Congratulations',
                        type: 'success',
                        text: `Game statistics. Moves:${moves} Stars:${stars} Time:${hours}:${min}:${sec}`,
                        allowOutsideClick: false,
                        showCancelButton: true,
                        confirmButtonText: 'Play Again',
                        confirmButtonColor: '#008000',
                        cancelButtonText: 'Close',
                        cancelButtonColor: '#FF0000',
                    }).then(function() {
                        location.reload();
                    }, function(dismiss) {
                        console.log('Yes');
                    });

                });
            }, 300);
            letsStop = 1;
            $('.timer').hide();
            $('.timer').html('0:0:0');
            $('.timer').show();
        }


    });
};

for (var i = 0; i < cards.length; i++) {
    cards[i].on('click', showCardOnClick(cards[i]));
}

$('.restart').on('click', function() {
    location.reload();
});