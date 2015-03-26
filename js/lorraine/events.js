DEBUG = true;

/* DOM ready handler */
$(document).ready(function(){ 
  app.init();
  //alert($(document).outerWidth() +'px');
});

/* Window resize handler */
$(window).smartresize(function() {   
	app.debug(DEBUG, { message: $(document).outerWidth() +'px' });
});

/* ui-triggers handlers */
$('body').on('click','.ui-trigger',function(e) {
  e.preventDefault();
  
  $link = $(this);
  var action = $link.attr('data-action'); 
  
  if(!$link.hasClass('disabled')) {
    //prevent user from firing this event multiple times
    app.opts.uiTriggers
    .addClass('disabled')
    .delay(500)
    .queue(function() { 
      $(this)
      .removeClass('disabled')
      .dequeue(); 
    });
    
    switch(action) {
    }
  }
});

/* Keyboard event handlers, primarily ESC key */
$(document).on('keydown',function(e) { 
  $document = $(this);
   
  if(!$document.hasClass('locked')) {
    //Prevent user from firing this event multiple times
    $document
    .addClass('locked')
    .delay(500)
    .queue(function() { 
      $(this)
      .removeClass('locked')
      .dequeue(); 
    });

    //If ESC button
    if(e.keyCode == 27) { 
      
    }
  }
});
