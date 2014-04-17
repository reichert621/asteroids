(function(root){

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Asteroids.Game.prototype.tick = function() {
    if (this.recharge > 0) { this.recharge -= 1; }
    if (key.isPressed('up')) { this.ship.accelerate(); };
    if (key.isPressed('down')) { this.ship.decelerate(); };
    if (key.isPressed('left')) { this.ship.rotateLeft(); };
    if (key.isPressed('right')) { this.ship.rotateRight(); };
    if (key.isPressed('space')) {
      if (this.recharge === 0) {
        this.recharge = this.rechargeTime;
        this.fireBullet();
      }
    };
    this.move();
    this.checkCollisions();
    this.cleanUp();
    this.draw();
  };

  Asteroids.Game.prototype.move = function() {
    that = this;
    this.ship.move(that.width, that.height);
    this.asteroids.forEach(function(asteroid){
      asteroid.move(that.width, that.height);
    });
    this.bullets.forEach(function(bullet){ bullet.move(); });
    this.bullets.forEach(function(bullet){ bullet.draw(that.ctx); });
  };

  Asteroids.Game.prototype.breakApart = function(parent) {
    if (!parent.child) {
      for (i = 0; i < 5; i++) {
        var child = new Asteroids.Asteroid(
          parent.x, parent.y,
          this.randomVel(), this.randomVel(),
          parent.radius/1.5 );
        child.child = true;
        this.asteroids.push(child);
      }
    }
  };

  Asteroids.Game.prototype.cleanUp = function() {
    that = this;
    this.bullets = this.bullets.filter(function(bullet){
      return !bullet.remove;
    });
    this.asteroids.forEach(function(asteroid){
      if (asteroid.split) { that.breakApart(asteroid); }
    });
    this.asteroids = this.asteroids.filter(function(asteroid){
      return !asteroid.split;
    });
    this.explosions = this.explosions.filter(function(explosion){
      return !explosion.done;
    });
  };

  Asteroids.Game.prototype.checkCollisions = function() {
    that = this;
    this.asteroids.forEach(function(asteroid, ai){
      if (asteroid.isCollidedWith(that.ship)) {
        that.damage++;
        if ( that.damage >= 100 ) { that.over(); }
      }
      var keep = true;
      that.bullets.forEach(function(bullet, bi){
        if (asteroid.isCollidedWith(bullet)) {
          asteroid.split = true;
          bullet.remove = true;
          that.points++;
          that.explosions.push(new Asteroids.Explosion(bullet.x, bullet.y));
        }
      });
    });
  };

})(this);