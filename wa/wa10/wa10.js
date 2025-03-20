const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}


const storyText = "It was 800 fahrenheit outside, so :insertx: went for a swim. When they got to :inserty:, they sat in silence for a few moments, then :insertz:. Bob saw the whole thing and was shocked — :insertx: weighs 10 pounds, and it was a cold day.";
const insertX=["Snoop Dogg", "JoJo Siwa", "Santa"];
const insertY= ["Denver", "the C4C", "Rockefeller Center"];
const insertZ= ["spontaneously combusted", "melted into a puddle on the driveway", "erupted into flames"];


randomize.addEventListener('click', result);

function result() {

  let xItem=randomValueFromArray(insertX);
  let yItem=randomValueFromArray(insertY);
  let zItem=randomValueFromArray(insertZ);

  let newStory=storyText.replaceAll(":insertx:", xItem).replace(":inserty:",yItem).replace(":insertz:",zItem);

  if(customName.value !== '') {
    const name = customName.value;
    newStory=newStory.replace("Bob", name);
  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(10/14);  //converting from pounds to stones, divide by 14
    const temperature =  Math.round((800-32)*(5/9)); //converting from fahrenheit into centigrade, F-32 times 5/9
    newStory=newStory.replace("800 fahrenheit", `${temperature} centigrade`).replace("10 pounds", `${weight} stone`);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}