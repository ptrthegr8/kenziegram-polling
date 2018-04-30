/* Add client side javascript that performs a Fetch against the new endpoint every 5 seconds, and adds any new images to the top of the page. Note that the client should pass the max timestamp of any images it has loaded so far, in order to only get the newest ones. */
let timeStamp = Date.now();
let errorCount = 0;
function fetchPics() {
    const postRequestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            after: timeStamp
        }),
    };
    fetch("/latest", postRequestOptions)
        .then(response => response.json())
        .then(items => {
            for (let i = 0; i < items.images.length; i++) {
                document.getElementById("img-container").innerHTML += `<img src='uploads/${items.images[i]}'>`;
            }
            timeStamp = items.timestamp;
            setTimeout(fetchPics, 5000);
        })
        .catch(error => {
        console.log(error)
        errorCount++;
        if (errorCount > 1) {
            document.body.innerHTML= "Sorry! Not working right meow."
        } else {
            setTimeout(fetchPics, 5000);
        }
        })
}; 
setTimeout(fetchPics, 5000);