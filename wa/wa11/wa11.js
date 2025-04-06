const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageNames = ["pic1.JPG", "pic2.JPG", "pic3.JPG", "pic6.JPG", "pic5.JPG"];

/* Declaring the alternative text for each image file */

const imageAltText = {
    "pic1.JPG" : "Blarney Castle",
    "pic2.JPG" : "Guinness Mural",
    "pic3.JPG" : "Stained glass at the Time Museum",
    "pic4.JPG" : "Cork city centre",
    "pic6.JPG" : "Viking tributes in Waterford"
}
/* Looping through images */
for (const image of imageNames) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `wa11images/${image}`);
    newImage.setAttribute('alt', imageAltText[image]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener ('click', event => {
        displayedImage.src=event.target.src;
        displayedImage.alt=event.target.alt;
});
}
/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', () => {
   const btnClass=btn.getAttribute('class');

    if (btnClass === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent='Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,50%)';
    }
    else{
        btn.setAttribute('class','dark');
        btn.textContext='Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
});