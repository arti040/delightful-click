var app = {
  opts: {},
	debugHandler: function() {
		var method;
		var noop = function() {};
		var methods = [
			'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
			'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
			'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
			'timeStamp', 'trace', 'warn'
		];
		var length = methods.length;
		var console = (window.console = window.console || {});
		while(length--) {
			method = methods[length];
			if(!console[method]) {
				console[method] = noop;
			}
		}
	},
	debug: function(DEBUG,params){
		if(DEBUG) {
		  if(!params.message) { console.log('Lorraine: debug failed. Message not set.'); return false; }
			var message = 'Lorraine: ';
			var msg = typeof params.message == 'object' ? JSON.stringify(params.message) : params.message;
			var name = typeof params.name !== 'undefined' ? params.name + ' ' : ''; 
			var module = typeof params.module !== 'undefined' ? '(' + params.module + ') ' : '';
			message += name + module + msg;
			console.log(message);
		}
	},
  init: function() {
    //console.log(device.checkDevice());
    $('.btn').on('click',function(e){ e.preventDefault(); });
    
    $('#wave-effect').delightfulClick({ effect: 'wave', color: '#ffbcbc', speed: 500 });
    $('#wave-square-effect').delightfulClick({ effect: 'waveSquare', color: 'orange', speed: 500 });
    $('#fade-effect').delightfulClick({ effect: 'fade', color: '#d4ebff', speed: 600 });
    $('#fill-up-effect').delightfulClick({ effect: 'fillUp', color: '#fc0', speed: 500 });
    $('#fill-down-effect').delightfulClick({ effect: 'fillDown', color: '#892ed6', speed: 500 });
  }
}                
app.debug(DEBUG,{ message: "App Module loaded." });
