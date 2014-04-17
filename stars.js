;(function(root){

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Stars = Asteroids.Stars = function(w, h, size){
    this.stars = [];
    this.width = w;
    this.height = h;
    this.size = size;
  };

  Stars.prototype.generateStars = function(num) {
    for (var i = 0; i < num; i++) {
      this.stars.push(new Star(
        randomInt(-200, this.width+200),
        randomInt(-200, this.height+200),
        Asteroids.colors[randomInt(0, Asteroids.colors.length)]
      ));
    }
  };

  var Star = Asteroids.Star = function(x, y, color){
    this.color = color;
    this.x = x;
    this.y = y;
  };

})(this);