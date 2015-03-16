/* Enemies Class
 * This class represents the enemy bugs in the game
 * that the player must avoid.
 * To construct the Enemy object, you pass in the x and y
 * coordinates along with the speed that the enemy will travel.
 */
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.row = new Row(y);
    this.column = new Column(x);
}

/* The update function updates the enemy's position.
 * Parameter: dt, a time delta between ticks
 * This parameter ensure the game runs at the same speed
 * for all computers
 */
Enemy.prototype.update = function(dt) {
    // calculates the new x coordinate based on the speed and dt.
    var tempX = this.column.x + (this.speed * dt);

    // update the column position each time enemy moves
    this.column.reset(tempX, this.column.getPosition(tempX, 50));

    /* When the enemy reaches the end of the screen,this will
     * reset the speed to a random number and reset the position
     * of the enemy to the starting position
     */
    if( this.column.x > ctx.canvas.width ) {
        this.speed = Math.random() * (200 - 80) + 80;
        this.column.reset( -60, 1 );
    }
}

// This function draws the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.column.x, this.row.y);
}


/* Player class
 * This class represents the player in the game
 * It include a picture for the player and
 * a row and column objects that represents the position of the player
 */
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.row = new Row(404);
    this.column = new Column(200);
}

// The update function updates the player's position.
Player.prototype.update = function() {
    // Determines if the player has reached the water (first row)
    // and if so, resets the player to the starting position
    if(this.row.position == 1) {
        this.row.reset(404, 6);
        this.column.reset(200, 3);
    }
}

// This function draws the Player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.column.x, this.row.y);
}

/* This method takes and given key and determines in which direction
 * to move the player. After setting the position, calls the render
 * function to display player at new position.
 */
 Player.prototype.handleInput = function(key) {
    if( key == 'left' ) {
        if( this.column.position > 1 ) {
            this.column.changePosition('left');
        }
    } else if( key == 'right' ) {
        if( this.column.position < 5 ) {
            this.column.changePosition('right');
        }
    } else if( key == 'up' ) {
        if( this.row.position > 1 ) {
            this.row.changePosition('up');
        }
    } else if( key == 'down' ) {
        if( this.row.position < 6 ) {
            this.row.changePosition('down');
        }
    }

    this.render();
}

/* Row class
 * This class represents the rows in the game.
 * It contains the y coordinate as well as the size of the row
 * and the current row position
 */
 var Row = function(y) {
    this.y = y;  // this y coordinate represents the top location of the sprite
    this.size = 83;
    this.position = this.getPosition(y);
}

/* This function detemine the current row postion given the y coordinate
 * It returns the position
 */
Row.prototype.getPosition = function(y) {
    var bottomY = y + 83;  // adds pixels to y to get correct row position.
    var topOfRow = 0;
    var bottomOfRow = 0;
    var position = 0;

    //loop through all 6 rows to get the current row position
    for ( var i = 1; i <= 6; i++ ) {
        if (i > 1) {
            topOfRow = bottomOfRow;
        }

        bottomOfRow = ( i * this.size );

        if( bottomY > topOfRow && bottomY < bottomOfRow ) {
            position = i;
       }
    }

    return position;
}

/* This function changes the position of the row based on the given direction.
 * Possible directions are up and down
 */
 Row.prototype.changePosition = function(direction) {
    if(direction == 'up') {
        this.position -= 1;
        this.y -= this.size;
    } else if( direction == 'down') {
        this.position += 1;
        this.y += this.size;
    }
}

/* This function reset the position of the row based on the given y coordinate
 * and row position.
 */
 Row.prototype.reset = function(y, position) {
    this.position = position;
    this.y = y;
}

/* Column class
 * This class represents the columsn in the game.
 * It contains the x coordinate as well as the size of the column
 * and the current column position
 */
var Column = function(x) {
    this.x = x;
    this.size = 101;
    this.position = this.getPosition(x, 101);
}

/* This function detemines the current column postion given the x coordinate
 * and a buffer amount.  The buffer amount is used to position objects correctly
 * in the column. It returns the position
 */
Column.prototype.getPosition = function(x, buffer) {
    var leftOfCol = 0;
    var rightOfCol = 0;
    var position = 0;
    var colBuffer = x + buffer;  // add pixels to x to get correct column position.

    //loop through all 5 columns to get the current column position
    for (var i = 1; i <= 5; i++) {
        if (i > 1){
            leftOfCol = rightOfCol;
        }

        rightOfCol = (i * this.size);

        if( colBuffer > leftOfCol && colBuffer < rightOfCol ) {
            position = i;
       }
    };

    return position;
}

/* This function changes the position of the column based on the given direction.
 * Possible directions are left and right
 */
Column.prototype.changePosition = function(direction) {
    if(direction == 'left') {
        this.position -= 1;
        this.x -= this.size;
    } else if( direction == 'right') {
        this.position += 1;
        this.x += this.size;
    }
}

/* This function resets the position of the column based on the given x coordinate
 * and column position.
 */
Column.prototype.reset = function(x, position) {
    this.position = position;
    this.x = x;
}


// Instantiate multiple Enemy objects passing in different coordiates and speeds.
var enemy1 = new Enemy(-60, 60, 100);
var enemy2 = new Enemy(-60, 145, 150);
var enemy3 = new Enemy(-60, 230, 180);
var enemy4 = new Enemy(-60, 60, 80);

// Place all enemy objects in an array
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

// Instantiate player object
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
