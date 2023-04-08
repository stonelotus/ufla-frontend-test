export const logger = {
    init: function (config) {
        // Attach event listeners to the document
        // TODO check if all these listeners should be added to the document
        // Verify the license before initializing
        console.log("====== UFLA LOADING ======");
        verifyLicense(config.licenseKey).then((isValid) => {
            if (!isValid) {
                console.error("Invalid license key. Please contact the provider for assistance.");
                return;
            }
            
            // mouse events
            const mouseEvents = ['click', 'dblclick', 'mousedown',];// 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'contextmenu']; // 
            mouseEvents.forEach((eventName) => {
                document.addEventListener(eventName, this.logEvent);
            });

            // window events
            const windowEvents = ['input', 'scroll'];
            windowEvents.forEach((eventName) => {
                document.addEventListener(eventName, this.logEvent);
            });

            // keyboard events
            const keyboardEvents = ['keydown', 'keyup', 'keypress'];
            keyboardEvents.forEach((eventName) => {
                document.addEventListener(eventName, this.logEvent);
            });

            document.addEventListener("DOMContentLoaded", this.logEvent);
            // necessary to determine window size on first load

            window.addEventListener("resize", this.logEvent);
            // document.addEventListener("focus", this.logEvent);
            // window.addEventListener("error", this.logError);

        });
    },

    logEvent: function (event) {
        // Log event information to the console or send it to a server-side endpoint

        console.log("Registered user event : " + event.type);
        console.log(event);

        let xpath = getXPath(event.target);

        let importantDataFromEvent = getImportantDataFromEvent(event);
        importantDataFromEvent.windowOuterWidth = window.outerWidth;
        importantDataFromEvent.windowOuterHeight = window.outerHeight;
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
    switch (eventType) {
        // Mouse events
        case 'click':
        case 'dblclick':
        case 'mousedown':
        case 'mouseup':
        case 'mousemove':
        case 'mouseover':
        case 'mouseout':
        case 'mouseenter':
        case 'mouseleave':
        case 'contextmenu':
            importantDataFromEvent.ctrlKey = event.ctrlKey;
            importantDataFromEvent.target = { // event.target
                type: event.target.type,
            }
            break;
        
        // Window events
        case 'resize':
            break;
        case 'scroll':
            importantDataFromEvent.scrollY = window.scrollY;
            importantDataFromEvent.scrollX = window.scrollX;

            importantDataFromEvent.target = {
                // deprecated. TODO delete
                scrollingElement: { //event.target.scrollingElement
                    scrollTop: event.target.scrollingElement.scrollTop,
                    scrollHeight: event.target.scrollingElement.scrollHeight,
                }
            };
            break;
        
        // Keyboard events
        case 'keydown':
        case 'keyup':
        case 'keypress':
            importantDataFromEvent.key = event.key;
            importantDataFromEvent.ctrlKey = event.ctrlKey;
            break;
        
        // Form events
        case 'input':
            importantDataFromEvent.data = event.data;
            importantDataFromEvent.inputType = event.inputType;
            importantDataFromEvent.target = { // event.target
                value: event.target.value,
                type: event.target.type,
            }
            break;
        case 'change':
            importantDataFromEvent.target = { // event.target
                value: event.target.value,
            }
            break
        case 'select':
            importantDataFromEvent.target = {
                value: event.target.value,
                selectionStart: event.target.selectionStart,
                selectionEnd: event.target.selectionEnd,
            }
        case 'blur':
        case 'focus':
        case 'submit':
        case 'reset':
            break;

        case 'DOMContentLoaded':
            break;

        default:
            console.log('Unrecognised event.');
            break;
    }

    return importantDataFromEvent;
}


async function verifyLicense(licenseKey) {
    return licenseKey === "pulapulapizdapizda";
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


export function initializeLogger(config) {
    logger.init(config);
  }