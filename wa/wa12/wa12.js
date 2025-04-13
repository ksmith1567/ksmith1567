var newBtn=document.querySelector('#js-new-joke').addEventListener('click', getJoke);
var answerBtn=document.querySelector('#js-punchline').addEventListener('click', displayAnswer);

var endpoint="https://official-joke-api.appspot.com/jokes/random";
var imageEndpoint="https://dog.ceo/api/breeds/image/random";
let current = {
    setup : "",
    punchline : ""
};



async function getJoke() {
    try {
        const response = await fetch(endpoint);

        if (!response.ok){
            throw Error(response.statusText);
        }
        const json = await response.json();
        //console.log(json);
        displayJoke(json.setup);
        

        current.setup=json.setup;
        current.punchline=json.punchline;

        getDog();

    } catch(err){
        console.log(err);
        alert('Fail!');
    }
}

async function getDog() {
    try {
        const response = await fetch(imageEndpoint);

        if (!response.ok){
            throw Error(response.statusText);
        }
        const json = await response.json();
        //console.log(json);
        displayImage(json.message);
        

        current.message=json.message;
        current.status=json.status;

    } catch(err){
        console.log(err);
        alert('Fail fetching dog image!');
    }
}

function displayImage(imageUrl) {
    const imageDiv=document.querySelector('#js-image');
    imageDiv.innerHTML = `<img src="${imageUrl}" alt="Random Dog" class="dog-image">`
}

function displayJoke(joke) {
    const jokeText=document.querySelector('#js-setup-text');
    jokeText.textContent = joke;

}

function displayAnswer() {
    const answerText=document.querySelector('#js-punchline-text');
    answerText.textContent = current.punchline;
}