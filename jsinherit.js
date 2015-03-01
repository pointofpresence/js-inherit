/**
 * Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 * Inspired by base2 and Prototype
 * Improved by point.of.presence
 * Requires Underscore JS http://underscorejs.org/
 * Version 0.1
 */
(function () {
    var initializing = false;
    var fnTest = /xyz/.test(function () {
        xyz;
    }) ? /\b_super\b/ : /.*/;
    var that = this;

    /** The base Class implementation (does nothing)
     *
     * @constructor
     */
    this.Class = function () {
    };

    /**
     * See if a object is a specific class
     *
     * @method isA
     * @param {String} className - class to check against
     */
    this.Class.prototype.isA = function (className) {
        return this.className === className;
    };

    /**
     * Create a new Class that inherits from this class
     *
     * @method extend
     * @param {String} className
     * @param {Object} properties - hash of properties (init will be the constructor)
     * @param {Object} [classMethods] - optional class methods to add to the class
     */
    this.Class.extend = function (className, properties, classMethods) {
        /* No name */
        if (!_.isString(className)) {
            classMethods = properties;
            properties = className;
            className = null;
        }

        var _super = this.prototype,
            ThisClass = this;

        /* Instantiate a base class (but only create the instance, */
        /* don't run the init constructor) */
        initializing = true;
        var prototype = new ThisClass();
        initializing = false;

        function _superFactory(name, fn) {
            return function () {
                var tmp = this._super;

                /* Add a new ._super() method that is the same method */
                /* but on the super-class */
                this._super = _super[name];

                /* The method only need to be bound temporarily, so we */
                /* remove it when we're done executing */
                var ret = fn.apply(this, arguments);
                this._super = tmp;

                return ret;
            };
        }

        /* Copy the properties over onto the new prototype */
        for (var name in properties) {
            /* Check if we're overwriting an existing function */
            prototype[name] = typeof properties[name] === "function"
            && typeof _super[name] === "function"
            && fnTest.test(properties[name])
                ? _superFactory(name, properties[name])
                : properties[name];
        }

        /* The dummy class constructor */
        function Class() {
            /* All construction is actually done in the init method */
            if (!initializing && this.init) {
                this.init.apply(this, arguments);
            }
        }

        /* Populate our constructed prototype object */
        Class.prototype = prototype;

        /* Enforce the constructor to be what we expect */
        Class.prototype.constructor = Class;

        /* And make this class extendable */
        Class.extend = that.Class.extend;

        /* If there are class-level Methods, add them to the class */
        if (classMethods) {
            _.extend(Class, classMethods);
        }

        if (className) {
            /* Save the class onto Q */
            window[className] = Class;

            /* Let the class know its name */
            Class.prototype.className = className;
            Class.className = className;
        }

        return Class;
    };
})();