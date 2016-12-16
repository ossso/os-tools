;(function() {
// 10进制与16进制互转
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
Class.prototype.transform = function(type) {
    if (type == '10216') {
        var val = this.dom.n10Inp.val();
        val = Number(val);
        if (/[^0-9\.]/.test(val)) {
            this.tips('请输入正确的10进制数值')
            return this;
        }
        this.dom.n16Inp.val(val.toString(16).toUpperCase());
    } else {
        var val = this.dom.n16Inp.val();
        if (/[^0-9a-fA-F]/.test(val)) {
            this.tips('请输入正确的16进制数值')
            return this;
        }
        this.dom.n10Inp.val(parseInt(val,16));
    }
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
    define("n10216", [], function() {
        return Class;
    });
} else if (typeof define === "function" && define.cmd) {
    define("n10216", [], function(require, exports, module) {
        module.exports = Class;
    });
} else if (typeof module !== "undefined") {
    module.exports = Class;
} else if (typeof layui !== 'undefined' && typeof layui.define === 'function') {
    layui.define(function(exports) {
        exports('n10216', Class);
    });
} else {
    window.N10216 = Class;
}
})();
