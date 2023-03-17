

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
