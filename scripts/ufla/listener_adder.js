
export const logger = {
    init: function() {
      // Attach event listeners to the document
      document.addEventListener("click", this.logEvent);
      // document.addEventListener("submit", this.logEvent);
      document.addEventListener("input", this.logEvent);
      document.addEventListener("scroll", this.logEvent);
      
      document.addEventListener("DOMContentLoaded", this.logEvent);
      // necessary to determine window size on first load

      window.addEventListener("resize", this.logEvent);
      // document.addEventListener("focus", this.logEvent);
      // window.addEventListener("error", this.logError);
    },

    logEvent: function(event) {
         // Log event information to the console or send it to a server-side endpoint

        console.log("Registered user event : " + event.type);
        console.log(event);

        let xpath = getXPath(event.target);

        let importantDataFromEvent = getImportantDataFromEvent(event);
        importantDataFromEvent.location = window.location;
        importantDataFromEvent.xpath = xpath;
        console.log(xpath);

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
            importantDataFromEvent.ctrlKey = event.ctrlKey;
            importantDataFromEvent.target = { // event.target
                type: event.target.type,
            }
            break;

        case 'scroll':
            importantDataFromEvent.scrollY = event.clientY;
            importantDataFromEvent.scrollX = event.clientX;
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
            importantDataFromEvent.target = { // event.target
                value: event.target.value,
                type: event.target.type,
            }
            break;

        case 'resize':
            importantDataFromEvent.target = { // event.target
                innerHeight: event.target.innerHeight,
                innerWidth: event.target.innerWidth,
            }
            break;

        case 'DOMContentLoaded':
            importantDataFromEvent.windowInnerWidth = window.outerWidth,
            importantDataFromEvent.windowInnerHeight = window.outerHeight,
            
            importantDataFromEvent.target = { // event.target
                defaultView: {
                    innerHeight: event.target.defaultView.innerHeight,
                    innerWidth: event.target.defaultView.innerWidth,
                },
            }
            break

        default:
            console.log('Unrecognised event.');
            break;
    }

    return importantDataFromEvent;
}


  function getXPath(element) {
    var path = '';
    for (; element && element.nodeType == Node.ELEMENT_NODE; element = element.parentNode) {
      var index = 1;
      for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
        if (sibling.nodeName == element.nodeName) {
          ++index;
        }
      }
      var tagName = element.nodeName.toLowerCase();
      path = '/' + tagName + '[' + index + ']' + path;
    }
    return path;
  }
  