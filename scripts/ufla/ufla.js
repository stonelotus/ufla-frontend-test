
import { addListeners as whisper} from './listener_adder.js'


function init() {
	console.log("UFLA init");
	whisper.addListeners();
}


init();

