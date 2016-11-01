/*global define, window: true */
define("ertoc/app", [
  "dojo/dom-style",      
  "dijit/registry",
  "dojo/parser"
], function (style, registry, parser) {
  //
  "use strict"; 
 
 
  String.prototype.getBytes = function () { 

    var bytes = []; 
    var i;
        
    for (i = 0; i < this.length; i = i+1) { 
      bytes.push(this.charCodeAt(i)); 
    } 
    return bytes; 
  };

  window.app = {     
   
    version: "1.00.0024",
                                     
    initilize: function () { 
        
      parser.parse().then(function() {

        style.set("DivSplash",       'display', 'none');
        style.set("DivApplication",  'display', ''    );

        //on(window, 'onresize', window.app.display.resize);
        window.onresize = window.app.display.resize;
      });
    },
     
    showDialog: function (Dialog) {
       
      registry.byId(Dialog).show();   
    },
    
    hideDialog: function (Dialog) {
      
      registry.byId(Dialog).hide();    
    }
  };
 
  return window.app;
});