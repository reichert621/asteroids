window.ext2 = function(attrs) {
  var parent = attrs.parent,
      constr = attrs.child,
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