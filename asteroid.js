;(function(root){

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Asteroids.Asteroid = function(x, y, velX, velY, radius){
    this.superConstructor.call(this, x, y, velX, velY);
    this.strokeColor = this.randColor();
    this.fillColor = this.strokeColor;
    this.radius = radius || randomInt(15,50);
    this.generateShape();
    this.split = false;
    this.child = false;
    this.rot = (Math.random()-1)/10;
  }

  Asteroids.Asteroid.inherits(root.Asteroids.MovingObject);

  Asteroids.Asteroid.prototype.generateShape =  function(){
    var sides = randomInt( 5, 12 );
    this.points = [];
    var angle = (Math.PI*2)/sides;
    for (var i = 0; i < sides; i++){
       var pointX = Math.floor(Math.cos(i * angle) * (this.randRadius(this.radius)));
       var pointY = Math.floor(Math.sin(i * angle) * (this.randRadius(this.radius)));
       this.points.push([pointX, pointY]);
    }
  };

  Asteroids.Asteroid.prototype.randColor = function() {
    return Asteroids.colors[randomInt(0, Asteroids.colors.length)];
  }

  Asteroids.Asteroid.prototype.move = function (w, h) {
    this.rotate(this.rot);
    this.superCall("move", w, h);
  };

  Asteroids.Asteroid.prototype.randRadius = function(radius) {
    var max = this.radius + 10;
    var min = this.radius;
    return randomInt (min, max);
  };


})(this);