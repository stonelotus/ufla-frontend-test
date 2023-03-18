
export const logger = {
    init: function() {
      // Attach event listeners to the document
      document.addEventListener("click", this.logEvent);
      // document.addEventListener("submit", this.logEvent);
      document.addEventListener("input", this.logEvent);
      document.addEventListener("scroll", this.logEvent);
      // document.addEventListener("focus", this.logEvent);
      // window.addEventListener("error", this.logError);
    },

    logEvent: function(event) {
         // Log event information to the console or send it to a server-side endpoint

        console.log("Registered user event : " + event.type);

        let importantDataFromEvent = getImportantDataFromEvent(event);
        importantDataFromEvent.location = window.location;

        // console.log(event);

        fetch('http://localhost:3000/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventData: importantDataFromEvent
            })
        }).then(function (response) {
            console.log("Received response from backend : ");
            console.log(response.json());
        })

    },
};


function getImportantDataFromEvent(event) {
    let importantDataFromEvent = {
        type: event.type,
        timestamp: event.timeStamp,
        // target: {},// inside event.target, to be completed separately based on each case
    };

    let eventType = event.type;
    switch(eventType) {
        case 'click':
            importantDataFromEvent.view = { //event.view
                screen: event.view.screen,
                innerHeight: event.view.innerHeight,
                innerWidth: event.view.innerWidth,
                outerHeight: event.view.outerHeight,
                outerWidth: event.view.outerWidth,
                scrollX: event.view.scrollX,
                scrollY: event.view.scrollY,
            };
            importantDataFromEvent.ctrlKey = event.ctrlKey;
            importantDataFromEvent.target = { // event.target
                type: event.target.type,
                className: event.target.className,
                nodeName: event.target.nodeName,
                classList: event.target.classList,
                id: event.target.id,
                localName: event.target.localName,
                name: event.target.name,
            }
            break;

        case 'scroll':
            importantDataFromEvent.target = {
                scrollingElement: { //event.target.scrollingElement
                    scrollTop: event.target.scrollingElement.scrollTop,
                    scrollHeight: event.target.scrollingElement.scrollHeight,
                }
            };
            break;
        
        case 'input':
            importantDataFromEvent.data = event.data;
            importantDataFromEvent.inputType = event.inputType;
            importantDataFromEvent.isComposing = event.isComposing;
            importantDataFromEvent.target = { // event.target
                value: event.target.value,
                type: event.target.type,
                className: event.target.className,
                nodeName: event.target.nodeName,
                classList: event.target.classList,
                id: event.target.id,
                localName: event.target.localName,
                name: event.target.name,
            }
            break;

        default:
            console.log('Unrecognised event.');
            break;
    }

    return importantDataFromEvent;
}
