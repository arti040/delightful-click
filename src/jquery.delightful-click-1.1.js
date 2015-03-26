/*!
 *
 * jQuery Delightful-click plugin
 * Version: 1.1
 * Author: github@arti040
 * Licensed under the MIT license
 *
 */
 
;(function ($,window,document) {

	"use strict";

		var pluginName = "delightfulClick",
				defaults = {
				  effect: 'wave',             //effect type
				  color: '#ddd',              //effect color
          speed: 400,                 //animation speed in milliseconds
          engine: 'animate',         //you can use jQuery's built-in animate() or velocity()
          effectClass: 'del-effect'   //default class for effect-element
        };

		function Plugin(element,options) {
			this.element = element;
			this.settings = $.extend({},defaults,options);
			this._defaults = defaults;
			this._name = pluginName;
			
			this.init();
		}

		//Avoid Plugin.prototype conflicts.
		$.extend(Plugin.prototype, {
			init: function() {
  			if(this.settings.destroy == 'self') {
          this.destroy();		
          return null;	
    		}
  			else if(this.settings.destroy == 'all') {
    			this.destroy('all');		
          return null;
  			}
  			else {
    			var me = this;
    			var $el = $(me.element);
    			var opts = {}
          
          //Let's perpare a button to be a host of the effect.
  				if($el.css('position') != 'absolute') { 
    				$el.css('position','relative').css('overflow','hidden');
  				}
  				else {
    				$el.css('overflow','hidden');
  				}
  				
  				//Let's collect properties now.
  				opts.btnWidth = $el.outerWidth();
  				opts.btnHeight = $el.outerHeight();
  				opts.btnBg = $el.css('background-color');	
  				opts.color = this.settings.color;
  				opts.speed = this.settings.speed;
  				opts.engine = this.settings.engine;
  				
  				//Effect is not created yet, so we don't want to run it either.
  				opts.run = false;
  				opts.created = false;
  				
  				//Let's create effect and apply it to the element
  				if(typeof me.effects[me.settings.effect] === 'function') {
  				  me.effects[me.settings.effect]($el,opts);			
  				
  				
    				//Event
    				$el.on('click',function(e){
      				//Let's get user-click coordiantes.
      				var offset = $(this).offset();
      				opts.pos = [e.pageX - offset.left, e.pageY - offset.top];
      				
      				//Effect is already created, so let's run it!
      				opts.run = true;
      				opts.created = true;
              
              //Fire!
      				me.effects[me.settings.effect]($el,opts);
    				});
          }
  				else { console.log("There is not (yet) such effect like ",me.settings.effect); }
  		  }
			},
			getCssValuePrefix: function(name,value) {
        var prefixes = ['', '-o-', '-ms-', '-moz-', '-webkit-'];

        //Let's create a temporary DOM object for testing
        var dom = document.createElement('div');

        for (var i = 0; i < prefixes.length; i++) {
          //Attempt to set the style
          dom.style[name] = prefixes[i] + value;
  
          //Detect if the style was successfully set
          if (dom.style[name]) { return prefixes[i]; }
          dom.style[name] = '';   //Reset the style
        }
      },
			destroy: function(mode) {
  			if(mode == 'all') {
    			 $('.'+this.settings.effectClass).remove();
  			}
  			else {
  			  $('.'+this.settings.effectClass,this.element).remove();
  			}
			},
			effects: {
				wave: function(el,opts) {
  				//If effect is already created, fire it!
  				if(opts.run) {
    				var $effect = $('.del-effect',el);
    				$effect.css('top',opts.pos[1])
    				.css('left',opts.pos[0])
    				.css('opacity',1);

    				$effect[opts.engine]({
      				opacity: 0,
      				width: opts.btnWidth*2.5,
      				height: opts.btnWidth*2.5,
      				marginTop: -opts.btnWidth,
      				marginLeft: -opts.btnWidth	
    				},opts.speed, function(){
      				//Let's reset all properties
      				$effect
      				.css('width','1px')
      				.css('height','1px')
      				.css('margin','auto')
      				.css('top','auto')
      				.css('left','auto')
    				});
  				}
  				
  				//...else, let's create it first and apply to the element.
  				if(!opts.created) {
    				var $effect = $(document.createElement('span'));
    				
    				$effect
    				.addClass('del-effect')
    				.css('width','1px')
    				.css('height','1px')
    				.css('position','absolute')
    				.css('border-radius','100%')
    				.css('opacity',0)
    				
    				if(opts.blur) {
      				var grdnPrefix = Plugin.prototype.getCssValuePrefix('backgroundImage','linear-gradient(left, #fff, #fff)');
      				var gradient = grdnPrefix + 'radial-gradient(center, ellipse cover, ' + opts.color + ' 0%, ' + opts.btnBg + ' 50%)';
      				$effect.css('background',gradient);
    				}
    				else { $effect.css('background-color',opts.color); }
    				    				
    				el.append($effect);
  				}		
				},
				waveSquare: function(el,opts) {
  				//If effect is already created, fire it!
  				if(opts.run) {
    				var $effect = $('.del-effect',el);
    				$effect.css('top',opts.pos[1])
    				.css('left',opts.pos[0])
    				.css('opacity',1);

    				$effect[opts.engine]({
      				opacity: 0,
      				width: opts.btnWidth*2.5,
      				height: opts.btnWidth*2.5,
      				marginTop: -opts.btnWidth,
      				marginLeft: -opts.btnWidth	
    				},opts.speed, function(){
      				//Let's reset all properties
      				$effect
      				.css('width','1px')
      				.css('height','1px')
      				.css('margin','auto')
      				.css('top','auto')
      				.css('left','auto')
    				});
  				}
  				
  				//...else, let's create it first and apply to the element.
  				if(!opts.created) {
    				var $effect = $(document.createElement('span'));
    				
    				$effect
    				.addClass('del-effect')
    				.css('width','1px')
    				.css('height','1px')
    				.css('position','absolute')
    				.css('opacity',0)
    				
    				if(opts.blur) {
      				var grdnPrefix = Plugin.prototype.getCssValuePrefix('backgroundImage','linear-gradient(left, #fff, #fff)');
      				var gradient = grdnPrefix + 'radial-gradient(center, ellipse cover, ' + opts.color + ' 0%, ' + opts.btnBg + ' 50%)';
      				$effect.css('background',gradient);
    				}
    				else { $effect.css('background-color',opts.color); }
    				    				
    				el.append($effect);
  				}		
				},
				fade: function(el,opts) {
  				//If effect is already created, fire it!
  				if(opts.run) {
            var $effect = $('.del-effect',el);
            $effect.css('opacity',1);
            
            $effect[opts.engine]({
              opacity: 0
            },opts.speed, function(){
              //Let's reset all properties
              $effect.css('opacity',0);
            }); 
          }
  				
  				//...else, let's create it first and apply to the element.
          if(!opts.created) {
            var $effect = $(document.createElement('span'));
            $effect.addClass('del-effect')
            .css('position','absolute')
            .css('top',0)
            .css('left',0)
            .css('width','100%')
            .css('height','100%')
            .css('background-color',opts.color)
            .css('opacity',0)
            
            el.append($effect);
          }
				},
				fillUp: function(el,opts) {
  				//If effect is already created, fire it!
  				if(opts.run) {
    				var $effect = $('.del-effect',el);
    				$effect.css('opacity',1);
    				
    				$effect[opts.engine]({
              opacity: 0,
              height: opts.btnHeight*2
            },opts.speed, function(){
              //Let's reset all properties
              $effect
              .css('opacity',0)
              .css('height',0);
            });
    		  }
    		  //...else, let's create it first and apply to the element.
          if(!opts.created) {
            var $effect = $(document.createElement('span'));
            $effect.addClass('del-effect')
            .css('position','absolute')
            .css('width','100%')
            .css('height',0)
            .css('bottom',0)
            .css('left',0)
            .css('background-color',opts.color)
            .css('opacity',0)
            
            el.append($effect);
          }	
				},
				fillDown: function(el,opts) {
  				//If effect is already created, fire it!
  				if(opts.run) {
    				var $effect = $('.del-effect',el);
    				$effect.css('opacity',1);
    				
    				$effect[opts.engine]({
              opacity: 0,
              height: opts.btnHeight*2
            },opts.speed, function(){
              //Let's reset all properties
              $effect
              .css('opacity',0)
              .css('height',0);
            });
    		  }
    		  //...else, let's create it first and apply to the element.
          if(!opts.created) {
            var $effect = $(document.createElement('span'));
            $effect.addClass('del-effect')
            .css('position','absolute')
            .css('width','100%')
            .css('height',0)
            .css('top',0)
            .css('left',0)
            .css('background-color',opts.color)
            .css('opacity',0)
            
            el.append($effect);
          }	
				}
			}
		});

		$.fn[pluginName] = function (options) {
			return this.each(function() {
				$.data(this,"plugin_" + pluginName, new Plugin(this,options));
			});
		};

})(jQuery,window,document);
