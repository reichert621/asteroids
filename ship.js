;(function(root){

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  // Asteroids.Ship = function(x, y, velX, velY){
  //   this.superConstructor.call(this, x, y, velX, velY);
  //   this.strokeColor = "#FF00FF";
  //   this.fillColor = "#FF00FF";
  //   this.radius = randomInt(20,60);
  //   this.radius = 6;
  //   this.rot = (Math.PI/2);
  //   this.speed = 0;
  //   this.points = [[0, -10], [-5, 10], [5, 10]];
  // };

  // Asteroids.Ship.inherits(root.Asteroids.MovingObject);

  Asteroids.Ship = ext({
      parent: Asteroids.MovingObject,
  
      initialize: function(x, y, velX, velY) {
        this.superConstructor.call(this, x, y, velX, velY);
        this.strokeColor = "#d7d7d7";
        this.fillColor = "#d7d7d7";
        this.radius = randomInt(20,60);
        this.radius = 6;
        this.rot = (Math.PI/2);
        this.speed = 0;
        this.points = [[0, -10], [-5, 10], [5, 10]];
      },
  
      properties: {
        rotateLeft: function() {
          var angle = (2*Math.PI)/32; 
          this.rot += angle;
          this.rotate(angle);
        },
        rotateRight: function() {
          var angle = -1*(2*Math.PI)/32; 
          this.rot += angle;
          this.rotate(angle);
        },
        accelerate: function(){
          this.speed += 0.1;
        },
        decelerate: function(){
          this.speed = (this.speed <= 0 ? 0 : this.speed -= 0.1);
        },
        move: function(w, h) {
          this.wrap(w, h, 0);
          this.x += this.speed * Math.cos(this.rot);
          this.y += this.speed * -Math.sin(this.rot);
        }
      }
    });

  // Asteroids.Ship.prototype.rotateLeft = function() {
  //   var angle = (2*Math.PI)/32; 
  //   this.rot += angle;
  //   this.rotate(angle);
  // }

  // Asteroids.Ship.prototype.rotateRight = function() {
  //   var angle = -1*(2*Math.PI)/32; 
  //   this.rot += angle;
  //   this.rotate(angle);
  // }

  // Asteroids.Ship.prototype.accelerate = function(){
  //   this.speed += 0.1;
  // };

  // Asteroids.Ship.prototype.decelerate = function(){
  //   this.speed = (this.speed <= 0 ? 0 : this.speed -= 0.1);
  // };

  // Asteroids.Ship.prototype.move = function(w, h) {
  //   this.wrap(w, h, 0);
  //   this.x += this.speed * Math.cos(this.rot);
  //   this.y += this.speed * -Math.sin(this.rot);
  // };

})(this);