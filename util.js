Function.prototype.inherits = function(parent) {
  function F() {};
  F.prototype = parent.prototype;
  this.prototype = new F();
  this.prototype.superConstructor = parent;
  this.prototype.superPrototype = parent.prototype;
  this.prototype.superCall = function() {
    var args = Array.prototype.slice.call(arguments);
    var method = args.shift();
    this.superPrototype[method].apply(this, args);
  }
}

window.ext = function(attrs) {
  var parent = attrs.parent,
      constr = attrs.initialize,
      pro = attrs.properties || {};
  // surrogate
  function F() {};
  F.prototype = parent.prototype;
  constr.prototype = new F();
  // super methods only work one level up for now
  constr.prototype.superConstructor = parent;
  constr.prototype.superPrototype = parent.prototype;
  // average super() method
  // give it a string with the parent's method's name
  constr.prototype.superCall = function() {
    var args = Array.prototype.slice.call(arguments);
    var method = args.shift();
    this.superPrototype[method].apply(this, args);
  }
  // safely augment the prototype
  for (el in pro) {
    if (pro.propertyIsEnumerable(el)) { constr.prototype[el] = pro[el]; }
  }
  // dump into a name
  return constr;
}

function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

;(function(root){

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Asteroids.colors =  [
    "#ff3232",
    "#e52d2d",
    "#ce2828"
  ];

})(this);