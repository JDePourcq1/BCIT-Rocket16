Team info:
    Team Number: 16
    - Mark Tattrie
    - Karl Arreola
    - Braden D'Eith
    - Matt Kearney
    - Justen DePourcq

Project Overview:
    - Our game is Kitty Cat Space Map
    - It focuses on players finding the quickest, round-trip path between objectives

Description of code structure:
    - The entire game/game board is achieved from our gameBoard.0.3.js file
        This JavaScript file:
        - Contains functions for setting the game board up within a canvas, which includes the nodes and challenges, the traveler's movements, and the user path creation.
        - This file also posts the player's results to the mLab database.
    - The signing in, logging in, leaderboard, and profile operations are all done through the database.js file
        This file:
        - Communicates with our mLab database to post new users
        - Retrieve current user data for signing in and their best times
        - Populates the leaderboard with the top 10 user's times
    - Bootstrap is used to have our webpage look good on both mobile devices and desktop.
    - Paper.js was used to make the lines, user path, and nodes drawn on the canvas.
    - Multi-screen was used to set up the course select, so you can navigate between different courses easily.
    - burger.js takes care of hamburger button and all button interactions for the webpage
    - timer.js runs the initial countdown before challenges run, and the timer for the player's score

Technologies used:
    - paper.js
    - Bootstrap
    - jquery
    - multi-screen.js
    - mLab for database
    - SFX
        - Background music: OCRemix-Duck tales moon theme
        - button click: Legend of zelda wind waker
    
Issues/problems encountered:
    - We started off this week pretty slow, so some things were left for last minute
    - paper.js proprietary paperScript wasn't working properly in chrome so we needed to rework our canvas using javaScript
    - viewing the webpage on mobile devices doesn’t look good
    - traveler speed is not constant, works like an easeIn
    - Timer doesn’t count the right time on mobile devices


**Note: Our User guide is included in the zip that contains this readme.txt file.

*** Also, feel free to make an account, just know that we have access to the data that you submit and will be posted to mLab