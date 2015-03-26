/* Window Resize event with treshold */
(function($,sr){
  var debounce = function(f,threshold,execAsap) {
    var timeout;
    return function debounced() {
      var obj = this;
      var args = arguments;
      function delayed() {
        if(!execAsap) { f.apply(obj,args); }
        timeout = null;
      }
      if(timeout) { clearTimeout(timeout); }
      else if(execAsap) { f.apply(obj,args); }
      
      timeout = setTimeout(delayed,threshold || 100);
    }
};
  //smartresize
  jQuery.fn[sr] = function(fn){
    return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); 
  }
})(jQuery,'smartresize');

/* Window Scroll event with treshold */
(function($,sr){
  var debounce = function(f,threshold,execAsap) {
    var timeout;
    return function debounced() {
      var obj = this;
      var args = arguments;
      function delayed() {
        if(!execAsap) { f.apply(obj,args); }
        timeout = null;
      }
      if(timeout) { clearTimeout(timeout); }
      else if(execAsap) { f.apply(obj,args); }
      
      timeout = setTimeout(delayed,threshold || 300);
    }
};
  //smartscroll
  jQuery.fn[sr] = function(fn,treshhold){
    return fn ? this.bind('scroll', debounce(fn,treshhold)) : this.trigger(sr); 
  }
})(jQuery,'smartscroll');

/* Scrolls viewport to element given as jQuery object */
$.fn.scrollView = function(duration,callback,container) {
  return this.each(function() {
    $(container || 'html,body').animate({
      scrollTop: $(this).offset().top
    }, duration, callback);
  });
}
