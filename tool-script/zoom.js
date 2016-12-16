;(function() {
// 等比例缩放
var Class = function(options,jquery) {
    this.$ = jquery;
    this.dom = {};
    this.data = {};
    this.status = {};
    this.options = options;

    for (var i in options.dom) {
        this.dom[i] = this.$(options.dom[i]);
    }

    this.init();
};
Class.prototype.init = function() {
    var _this = this
    this.dom.n10.on('click',function() {
        _this.transform('16210');
    });
    this.dom.n16.on('click',function() {
        _this.transform('10216');
    });
    return this;
};
Class.prototype.tips = function(msg) {
    try {
        layer.msg(msg);
    } catch (e) {
        alert(msg);
    }
    return this;
};

/**
 * (AMD & CMD compatible)
 * @module zbp
 */
if (typeof define === "function" && define.amd) {
    define("zoom", [], function() {
        return Class;
    });
} else if (typeof define === "function" && define.cmd) {
    define("zoom", [], function(require, exports, module) {
        module.exports = Class;
    });
} else if (typeof module !== "undefined") {
    module.exports = Class;
} else if (typeof layui !== 'undefined' && typeof layui.define === 'function') {
    layui.define(function(exports) {
        exports('zoom', Class);
    });
} else {
    window.Zoom = Class;
}
})();
