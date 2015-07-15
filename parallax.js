/**
    new Parallax({
       element : '.parallax', //元素
       direction : 'forward'  //方向 forward：正向， reverse：反向
    })
    
 */

//参数
var defaults ={
    element : '.parallax', //元素
    direction : 'reverse'  //方向 forward：正向， reverse：反向
}



function Parallax(){
    this.init.apply(this, arguments)
}

Parallax.prototype={
    init : function(options){
        this.options=$.extend(true,{},defaults,options);
        this._bindEvent();
    },
    _direction : function(e){
        var obj ={};
        var w = $(window).width();
        var h = $(window).height();

        if(this.options.direction == 'reverse'){
            obj.offsetX = 0.5 - e.pageX / w;
            obj.offsetY = 0.5 - e.pageY / h;
        }else if( this.options.direction == 'forward'){
            obj.offsetX = 0.5 + e.pageX / w;
            obj.offsetY = 0.5 + e.pageY / h;
        }
        return obj;
    },
    _bindEvent : function(){
        var element = this.options.element;
        var _this = this;
        $(window).on('mousemove._parallax', function(e) {
            var dirObj = _this._direction(e);
            var offsetX = dirObj.offsetX;
            var offsetY = dirObj.offsetY;

            $(element).each(function(i, el) {
                var offset = parseInt($(el).data('offset'));
                var translate = "translate3d(" + Math.round(offsetX * offset) + "px," + Math.round(offsetY * offset) + "px, 0px)";
                $(el).css({
                    '-webkit-transform': translate,
                    'transform': translate,
                    'moz-transform': translate
                });
                
            });
        });

         $(window).on('mousemove', function(e) {
            console.log(e);
         })
    },
    destory : function(){
        $(window).off('._parallax');
    }
}

if ( typeof dwfis !== "undefined" && typeof dwfis.define === "function") {
    module.exports = Parallax;
}