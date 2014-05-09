(function(root){

	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Game = Asteroids.Game = function() {
		this.canvas = document.getElementById('game');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.height = this.canvas.height;
		this.width = this.canvas.width;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.lineWidth = 0;
		this.bgColor = "#000000";
		this.rechargeTime = 0;
	}
	
	Game.prototype = {
		init: function() {
			this.asteroids = [];
			this.bullets = [];
			this.explosions = [];
			this.recharge = 0;
			this.points = 0;
			this.damage = 0;
			this.ctx.font = '60px Helvetica Neue';
			this.createAsteroids();
			this.ship = new Asteroids.Ship(this.width/2, this.height/2, 0, 0);
			this.nearStars = new Asteroids.Stars(this.width, this.height, 2);
			this.midStars = new Asteroids.Stars(this.width, this.height, 1.5);
			this.farStars = new Asteroids.Stars(this.width, this.height, 1);
			this.nearStars.generateStars(50);
			this.midStars.generateStars(100);
			this.farStars.generateStars(200);
		},
		
		play: function() {
			this.id = window.setInterval(this.tick.bind(this), 40);
		},
		
		over: function() {
			clearInterval(this.id);
			var that = this;
			setTimeout(function(){
				that.ctx.shadowBlur = 0;
				that.ctx.textAlign = 'center';
				that.ctx.fillStyle = "#ffffff";
				that.ctx.fillText('You lose!', that.width/2, (that.height/2)-50);
				that.ctx.fillText('Press enter to play again.', that.width/2, (that.height/2)+50);
				key('enter', function() {
					key.unbind('enter');
					that.init();
					that.play();
				});
			}, 0);
		},
		
		randomPos: function(max) {
			return randomInt(0, max);
		},
		
		randomVel: function() {
			vel = randomInt(-5, 5);
			return vel === 0 ? 1 : vel;
		},
		
		createAsteroids: function() {
			for (var i = 0, max = randomInt(20,30); i < max ; i++) {
				this.asteroids.push(new Asteroids.Asteroid(
					this.randomPos(this.width), this.randomPos(this.height),
					this.randomVel(), this.randomVel()));
				}
		},
	
		fireBullet: function() {
			var speed = this.ship.speed;
			var rot = this.ship.rot;
			var velX = (this.ship.speed+50) * Math.cos(rot);
			var velY = (this.ship.speed+50) * (-Math.sin(rot));
			var bullet = new Asteroids.Bullet(this.ship.x, this.ship.y, velX, velY);
			this.bullets.push(bullet);
		}
	};

})(this);