

function addListeners() {

    var buttons = document.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            console.log("Sending action: " + JSON.stringify({name: this.id}) + " to backend.")
            fetch('http://localhost:3000/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.id
                })
            }).then(function (response) {
                console.log("Received response from backend : ");
                return response.json();
            })
        });
    }

}

module.exports = {
    addListeners: addListeners
}