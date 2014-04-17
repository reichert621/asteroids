;(function(root){

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Asteroids.Bullet = function(x, y, velX, velY) {
    this.superConstructor.call(this, x, y, velX, velY);
    this.strokeColor = "#ffffff";
    this.fillColor = "#ffffff";
    this.radius = 4;
  }

  Asteroids.Bullet.inherits(root.Asteroids.MovingObject);

  Asteroids.Bullet.prototype.move = function (w, h) {
    this.x += this.velX;
    this.y += this.velY;
  }

})(this);