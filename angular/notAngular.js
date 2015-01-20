	function confirmDelete() {
    	var r = confirm("Deseja apagar este cliente ?");

    	return r; 
    }

 	function formataGenerico(e, src, mask, size) {
	    if (window.event) {
	      _TXT = e.keyCode; 
	 	} 
	    else if (e.which) { 
	      _TXT = e.which; 
	  	}
	    if (_TXT > 47 && _TXT < 58) { 
	  	   var i = src.value.length; 
	  	   if (i > size) {
	  	   	  return false; 
	  	   }
	  	   var saida = mask.substring(0,1); 
	  	   var texto = mask.substring(i)
		  	   if (texto.substring(0,1) != saida) { 
		  	   	  src.value += texto.substring(0,1); 
		  	   } 
	           return true; 
	    } else { 
	       if (_TXT != 8) { 
	       	  return false; 
	       } 
		    else { 
		       return true; 
		    }
		}
	}

 	function formataCEP(e, src, mask) {
 		return formataGenerico (e, src, mask, 8); 
	}

	function formataFone(e, src, mask) {
 		return formataGenerico (e, src, mask, 11); 
	}

	function formataCelular(e, src, mask) {
 		return formataGenerico (e, src, mask, 12); 
	}

	function formataCNPJ(e, src, mask) {
 		return formataGenerico (e, src, mask, 18); 
	}

	function formataCPF(e, src, mask) {
 		return formataGenerico (e, src, mask, 13); 

	}

