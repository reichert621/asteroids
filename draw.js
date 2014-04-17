;(function(root){

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Asteroids.Game.prototype.drawStatus = function() {
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    this.ctx.shadowBlur = 0;
    this.ctx.textAlign = 'right';
    this.ctx.font = '20px Helvetica Neue';
    this.ctx.fillText("Damage", that.width-40, that.height-100);
    this.ctx.fillText("Points", that.width-40, that.height-220);
    this.ctx.font = '70px Helvetica Neue';
    this.ctx.fillText(this.damage, that.width-40, that.height-30);
    this.ctx.fillText(this.points, that.width-40, that.height-150);
  };

  Asteroids.Game.prototype.draw = function() {
    that = this;
    var grd=this.ctx.createLinearGradient(0, 0,this.width, this.height);
    grd.addColorStop(0.1,"#200a21");
    grd.addColorStop(0.7,"#000000");
    this.ctx.fillStyle=grd;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.asteroids.forEach(function(asteroid){ asteroid.draw(that.ctx); });
    this.explosions.forEach(function(explosion){ explosion.draw(that.ctx); });
    this.bullets.forEach(function(bullet){ bullet.draw(that.ctx); });
    this.ship.draw(this.ctx);
    var offsetX = ((this.width/2)-this.ship.x)/3,
        offsetY = ((this.height/2)-this.ship.y)/3;
    this.nearStars.draw(this.ctx, offsetX*1.7, offsetY*1.7);
    this.midStars.draw(this.ctx, offsetX*1.5, offsetY*1.5);
    this.farStars.draw(this.ctx, offsetX, offsetY);
    this.drawStatus();
  };

	Asteroids.MovingObject.prototype.draw = function(ctx) {
	  var points = this.points.slice(),
	      firstPoint = points.shift(),
	      that = this;
	  ctx.strokeStyle = this.strokeColor;
	  ctx.lineWidth = 3;
	  ctx.shadowColor = this.strokeColor;
	  ctx.shadowBlur = 20;
	  ctx.shadowOffsetX = 0;
	  ctx.shadowOffsetY = 0;
	  ctx.beginPath();
	  ctx.moveTo(firstPoint[0]+ this.x, firstPoint[1] + this.y );
	  points.forEach(function(point){
	    ctx.lineTo(that.x + point[0], that.y + point[1]);
	  });
	  ctx.lineTo(firstPoint[0]+ this.x, firstPoint[1] + this.y );
	  ctx.closePath();
	  ctx.stroke();
	};

  Asteroids.Bullet.prototype.draw = function(ctx) {
    ctx.strokeStyle = this.strokeColor;
    ctx.fillStyle = this.fillColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
  };

  Asteroids.Explosion.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    ctx.shadowColor = "rgba(255, 255, 255, 1)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    this.size += 3;
    if (this.size > 60) { this.done = true; }
  };

  Asteroids.Stars.prototype.draw = function(ctx, x, y) {
    that = this;
    this.stars.forEach(function(star){
      ctx.beginPath();
      ctx.fillStyle = star.color;
      ctx.shadowColor = star.color;
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.arc(star.x+x, star.y+y, that.size, 0, 2*Math.PI);
      ctx.closePath();
      ctx.fill();
    });
  };

})(this);