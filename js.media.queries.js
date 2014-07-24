function js_media_queries(){
  var self = this;
  this.listeners = [];
  this.resizeTimer;
  this.win = {
        width:0,
        height:0
      };
      
  jQuery(window).resize(function() {
    clearTimeout(self.resizeTimer);
    self.resizeTimer = setTimeout(self.resized, 100);
  });
  
  this.listen = function(listener){
    self.listeners.push(listener);
  };
  
  /**
   * Process listeners based on the conditions
   */
  this.trigger_listeners = function(){
    jQuery(self.listeners).each(function(key,listener){
      var cond = listener.condition.replace(/HEIGHT/g, self.win.height)
                                   .replace(/WIDTH/g, self.win.width);
                        
      if(eval(cond))
        listener.func.call(this,self.win);
    });
  };
  
  /**
   * Calculate and set the dimensions
   */
  this.update_dimensions = function(){
    self.win.width = jQuery(window).width();
    self.win.height = jQuery(window).height();
  };
  
  /**
   * When window is resized
   */
  this.resized = function(){
    self.update_dimensions();
    self.trigger_listeners();
  };
  
}
