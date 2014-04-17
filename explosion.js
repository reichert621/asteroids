;(function(root){

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Explosion = Asteroids.Explosion = function(x, y){
    this.x = x;
    this.y = y;
    this.size = 1
    this.done = false;
  };

})(this);