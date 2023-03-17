

export function addListeners() {
    console.log("Adding listeners to buttons");
    var buttons = document.getElementsByTagName("button");
    console.log(buttons);
    for (var i = 0; i < buttons.length; i++) {
        console.log(buttons[i].className);
        buttons[i].addEventListener('mousedown', function () {
            console.log("Sending action: " + JSON.stringify({name: this.className}) + " to backend.")
            fetch('http://localhost:3000/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.className
                })
            }).then(function (response) {
                console.log("Received response from backend : ");
                return response.json();
            })
        });
    }
    

}

export const logger = {
    init: function() {
      // Attach event listeners to the document
      document.addEventListener("click", this.logEvent);
      document.addEventListener("submit", this.logEvent);
      document.addEventListener("input", this.logEvent);
      document.addEventListener("scroll", this.logEvent);
      document.addEventListener("focus", this.logEvent);
      window.addEventListener("error", this.logError);
    },
    logEvent: function(event) {
      // Log event information to the console or send it to a server-side endpoint
      console.log({
        type: event.type,
        target: event,
        timestamp: new Date().toISOString(),
        page: window.location.href
      });
   
    },
    logError: function(error) {
      // Log error information to the console or send it to a server-side endpoint
      console.error({
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        page: window.location.href
      });
    }
  };
