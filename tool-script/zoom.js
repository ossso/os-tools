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
    this.dom.zoomBtn.on('click',function() {
        _this.calculate();
    });
    this.dom.width.on('keypress',function() {
        if (!_this.dom.lock.get(0).checked) return;
        setTimeout(function() {
            _this.watch_keypress('width');
        },100);
    });
    this.dom.height.on('keypress',function() {
        if (!_this.dom.lock.get(0).checked) return;
        setTimeout(function() {
            _this.watch_keypress('height');
        },100);
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
Class.prototype.calculate = function() {
    var scale = this.dom.scale.val();
    var reg = /[^0-9\.]/;
    if (reg.test(scale) || !scale.length) {
        this.tips('请输入正确的比例');
        return this;
    }
    var width = this.dom.width.val();
    var height = this.dom.height.val();
    if (reg.test(width) || !width.length) {
        this.tips('请输入正确的宽度数值');
        return this;
    } else if (reg.test(height) || !height.length) {
        this.tips('请输入正确的高度数值');
        return this;
    }
    this.dom.width.val(width*scale);
    this.dom.height.val(height*scale);
    return this;
};
Class.prototype.watch_keypress = function(type) {
    if (!this.dom.lock.get(0).checked) return this;
    if (type == 'width') {
        var width = this.dom.width.val();
        var scale = width/this.data.lock_width;
        this.dom.height.val(this.data.lock_height*scale);
        this.dom.scale.val(scale);
    } else {
        var height = this.dom.height.val();
        var scale = height/this.data.lock_height;
        this.dom.width.val(this.data.lock_width*scale);
        this.dom.scale.val(scale);
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
