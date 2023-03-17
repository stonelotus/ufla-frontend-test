import { addListeners, logger}  from './listener_adder.js'


export default function init() {
	console.log("UFLA init");
	addListeners();
	logger.init();
}


