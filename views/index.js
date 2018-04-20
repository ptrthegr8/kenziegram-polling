/* Add client side javascript that performs a Fetch against the new endpoint every 5 seconds, and adds any new images to the top of the page. Note that the client should pass the max timestamp of any images it has loaded so far, in order to only get the newest ones. */

function fetchPics() {
    const postRequestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "after": Date.now()
        }),
    };
    fetch("/latest", postRequestOptions)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.images.length; i++) {
                document.querySelector("div#img-container").innerHTML += `<img src= '${data.images[i]}'>`;
            }
            setTimeout(fetchPics(), 5000);
        });
}; 
fetchPics();