;(function(root){

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Asteroids.MovingObject = function(x, y, velX, velY, radius){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.radius = radius;
    this.remove = false;
  }
	
	Asteroids.MovingObject.prototype = {
		move: function(w, h) {
		  this.x += this.velX;
		  this.y += this.velY;
		  this.wrap(w, h, 100);
		},
		
		rotate: function(angle) {
		  this.points = this.points.map(function(coords){
		    var x = Math.cos(angle)*coords[0] + Math.sin(angle) * coords[1];
		    var y = -Math.sin(angle)*coords[0] + Math.cos(angle) * coords[1];
		    return [x, y];
		  });
		},
		
		wrap: function(w, h, offset) {
		  if (this.x < -offset) { this.x = w + offset; }
		  if (this.y < -offset) { this.y = h + offset; }
		  if (this.x > w+offset ) { this.x = -offset; }
		  if (this.y > h+offset) { this.y = -offset; }
		},
		
		isCollidedWith: function(other) {
		  var distance = Math.sqrt(
		                  Math.pow((this.x - other.x), 2)
		                  + Math.pow((this.y - other.y), 2));
		  return this.radius + other.radius > distance;
		}
	};

})(this);