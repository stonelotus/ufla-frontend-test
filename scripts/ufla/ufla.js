import {logger}  from './listener_adder.js'; // old; without config

import { initializeLogger } from './listener_adder.js'; // new

export default function init() {
	console.log("UFLA init");
	// logger.init();
    initializeLogger({
        licenseKey: "pulapulapizdapizda",
      });
}
