'use strict';

let oGlobal = {
    deck : [],
    suits : ['Hearts', 'Clubs', 'Diamonds', 'Spades'],
    playerOneHand : [],
    playerTwoHand : [],
    playerOneScore : 0,
    playerTwoScore : 0
}

createDeck();
shuffleUpAndDeal();
valueCards();
playHighestCard();

function createDeck() {
    console.log('createDeck()');

    oGlobal.suits.forEach(suit => {
        for(let i = 2; i <= 14; i++) {
            if(i < 11) {
                oGlobal.deck.push(i + ' of ' + suit);
            } else if (i === 11) {
                oGlobal.deck.push('Jack of ' + suit);
            } else if (i === 12) {
                oGlobal.deck.push('Queen of ' + suit);
            } else if (i === 13) {
                oGlobal.deck.push('King of ' + suit);
            } else if (i === 14) {
                oGlobal.deck.push('Ace of ' + suit);
            }
        }
    });

    console.log(oGlobal.deck);
}

function shuffleUpAndDeal() {
    console.log('shuffleUpAndDeal()');

    for(let i = 0; i < 6; i++) {
        console.log('Kortleken innehåller nu ' + oGlobal.deck.length + ' antal kort');
        let slump = Math.floor(Math.random() * oGlobal.deck.length);
        oGlobal.playerOneHand.push(oGlobal.deck[slump]);
        oGlobal.deck.splice(slump, 1);

        console.log('Kortleken innehåller nu ' + oGlobal.deck.length + ' antal kort');
        slump = Math.floor(Math.random() * oGlobal.deck.length);
        oGlobal.playerTwoHand.push(oGlobal.deck[slump]);
        oGlobal.deck.splice(slump, 1);
    }

    console.log('Spelare etts hand:');
    oGlobal.playerOneHand.map(card => console.log(card));
    console.log('Spelare tvås hand:');
    oGlobal.playerTwoHand.map(card => console.log(card));
}

function valueCards() {
    console.log('valueCards()');

    for(let i = 0; i < oGlobal.playerOneHand.length; i++) {
        let playerOneCard = oGlobal.playerOneHand[i].split(' ');
        let playerTwoCard = oGlobal.playerTwoHand[i].split(' ');
        oGlobal.playerOneHand[i] = playerOneCard[0];
        oGlobal.playerTwoHand[i] = playerTwoCard[0];

        if(oGlobal.playerOneHand[i] === 'Jack') {
            oGlobal.playerOneHand[i] = 11;
        } else if(oGlobal.playerOneHand[i] === 'Queen') {
            oGlobal.playerOneHand[i] = 12;
        } else if(oGlobal.playerOneHand[i] === 'King') {
            oGlobal.playerOneHand[i] = 13;
        } else if(oGlobal.playerOneHand[i] === 'Ace') {
            oGlobal.playerOneHand[i] = 14;
        }

        if(oGlobal.playerTwoHand[i] === 'Jack') {
            oGlobal.playerTwoHand[i] = 11;
        } else if(oGlobal.playerTwoHand[i] === 'Queen') {
            oGlobal.playerTwoHand[i] = 12;
        } else if(oGlobal.playerTwoHand[i] === 'King') {
            oGlobal.playerTwoHand[i] = 13;
        } else if(oGlobal.playerTwoHand[i] === 'Ace') {
            oGlobal.playerTwoHand[i] = 14;
        }
    }

    console.log('Spelare 1s hand:');
    oGlobal.playerOneHand.map(card => console.log(card));
    console.log('Spelare 2s hand:');
    oGlobal.playerTwoHand.map(card => console.log(card));
}

function playHighestCard() {
    console.log('playHighestCard()');

    console.log('Dags att spela "Dra högsta kortet!"');

    for(let i = 0; i < 6; i++) {
        let playerOneMaxIndex = 0;
        let playerTwoMaxIndex = 0;
        let playerOneMaxValue = parseInt(oGlobal.playerOneHand[0]);
        let playerTwoMaxValue = parseInt(oGlobal.playerTwoHand[0]);

        for(let j = 1; j < oGlobal.playerOneHand.length; j++) {
            if(oGlobal.playerOneHand[j] > playerOneMaxValue) {
                playerOneMaxValue = oGlobal.playerOneHand[j];
                playerOneMaxIndex = j;
            }
        }
        oGlobal.playerOneHand.splice(playerOneMaxIndex, 1);

        for(let j = 1; j < oGlobal.playerTwoHand.length; j++) {
            if(oGlobal.playerTwoHand[j] > playerTwoMaxValue) {
                playerTwoMaxValue = oGlobal.playerTwoHand[j];
                playerTwoMaxIndex = j;
            }
        }
        oGlobal.playerTwoHand.splice(playerTwoMaxIndex, 1);

        console.log('Omgång: ' + (i + 1) + ' Spelare 1 drar ' + playerOneMaxValue +
                    ' och spelare 2 drar ' + playerTwoMaxValue);


        if(playerOneMaxValue > playerTwoMaxValue) {
            oGlobal.playerOneScore++;
            console.log('Spelare 1 får poängen');
        } else if (playerOneMaxValue < playerTwoMaxValue) { 
            oGlobal.playerTwoScore++;
            console.log('Spelare 2 får poängen');
        } else {
            console.log('Inga poäng delas ut');
        }
    }

    console.log("Spelare 1: " + oGlobal.playerOneScore);
    console.log("Spelare 2: " + oGlobal.playerTwoScore);
}
