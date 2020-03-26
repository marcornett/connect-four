https://marcornett.gitlab.io/assessment-connect-four/

Spoke about Michelle Johnson about modifying the board based on checker piece locations

# Program Plan

1.  Read the requirements document in detail.
    * Take notes of things you'll need to do
    * Write down any questions
2.  Get the answers to your questions!
3.  Make a development plan
    * Describe the entire behavior of your program in 3 (or at most 4) steps
    * Break down each step into 3 (or 4) steps
    * Repeat until each step is obvious how to code it
4.  Write the code!


# Notes
1.  Connect 4 in a row (horizontal, vertical, or diagonal)
2.  Once all cells are filled and no connect 4 is achieved, then the game ends in a tie.

# Questions
1.  How do I check upward- or downward-sloping diagonal?
2.  How do I keep track of whose turn it is?
    1.  Perhaps in an object or array, the same as the tower of hanoi. 

# Development Plan
1.  Display a red or black disc.
    1.  A div with border radius of 50%
2.  Stack red and black discs in a column using flex box.
    1.  Put divs into a container that has grid displayed
3.  Display a full board consisting of 7 columns.
    1.  Use grid or flex to make 7x6 grid
        1.  Make 7 divs containing 6 boxes that stack
4.  Set a click handler for each column that adds an additional disc.
    1.  Click handler function
        1.  Function chooses the last child of the column and adds a disc if there are no discs in that child
5.  Toggle the color of each successive disc added.
    1.  Store the color in an object or array that changes each time click handler function runs
    2.  Or valuable of toggle player function togglePlayer = 1 togglePlayer = 2
6.  Keep track of what color disc is at each position on the board. 
    1.  Produce a for loop that makes the grid.
    2.  Give each column and cell a 'data-column' & 'data-cell' position.
    3.  Look at the child of those positions and see what color disc is inside.
7.  Once a column is full, don't allow any more discs to be added.
    1.  Create a for loop with an if statement to check if the all cells have children.
    2.  If so, then it's a tie.
8.  Check four-in-a-row: vertically, horizontally and either upwards- or downward-sloping diagonal.
    1.  ???

# Randy's Development Plan

    1. Initialize the game
    a. players
    b. board display
    c. board model
    d. current player tracker
    e. set up click handlers
2. Take player input
    a. click handlers on each column
        - know which player is currently dropping a disc
        - only allow a drop if the column isn't full
        - drop a disk into the column
        - toggle the player
3. Check for game ending conditions
    a. has the game been won?
        - display who won the game
    b. has the game ended in a tie?
        - display a tie message

