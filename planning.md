# Project: Memory Game

## Planning Memory Game


## 1. Description

1. The player sees more cards placed face down.
When he clicks on two cards, they flip.
2. If they are the same - they remain facing each other - a pair is found.
3. If they are not the same - they return face down.
4. The goal of the game: to find all the pairs.

## 2. Functionalities:

1. Functionality Description
(HTML + CSS Grid/Flex tab display for layout)
2. Clicking on a card Flips the card (DOM manipulation)
3. Remembering the previous move will save what was clicked first.
4. Checking for a pair If two cards are the same they remain face up.
5. If they are not a matching couple - they turn back after 2sec.
6. Game over when all pairs have been found.


## 3. Basic HTML structure

1. Grid containing all cards 4x4

2. Each card is a *div class*  with a front and back

3. Restart button



## 4.  Pseudocode 

START GAME:

1. Prepare a list of cards.
2. Duplicate the list and shuffle the order.
3. Show all the cards on the board, faced down.

GAME:

4. When a player clicks on a card:
   a. If it is already turned - ignore
   b. If it's the first card remember it
   c. If the other card is:
    * Compare it with the first one
    * If they are the same - leave both facing
    * If they are not - after 2 second turn both back

5. Tracks the number of pairs the player has found

6. If all pairs are found:
   Show message: "Well done!"

END GAME

<img src="./assets/Wireframe.png">



