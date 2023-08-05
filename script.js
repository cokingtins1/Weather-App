// let myPromise = new Promise((resolve, reject) => {
// 	let num = Math.floor(Math.random() * 10) + 1;
// 	console.log(num);
// 	if (num < 5) {
// 		resolve("you have guessed correctly");
// 	} else {
// 		reject("better luck next time");
// 	}
// });

// // resolve call back function
// handleSuccess = (goodNews) => {
// 	console.log(goodNews);
// };

// // reject call back function
// handleFailure = (badNews) => {
// 	console.log(badNews);
// };

// Invoke promise. pass in resolve and reject values
// myPromise.then(handleSuccess, handleFailure);

async function randomResponse () {
    let message = ''
    let num = Math.floor(Math.random() * 10) + 1;
	console.log(num)
	if (num < 5) {
		message = await ('you guessed correctly')
        console.log(message)
	} else {
		message = await ('better luck next time');
        console.log(message)
	}
}

randomResponse()

const arrayOfFruits = ['bananna', 'apples', 'oranges']

arrayOfFruits.forEach(async fruit => {
    let message = "would you like " + fruit + "'?"
    console.log(message)
})

const img = document.querySelector('img')

async function getCats() {
    const response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=vsrc6JCfbh3JGdpBGonu9hxrZpS85bMc&s=cats', {mode: 'cors'})
    const catData = await response.json()
    img.src = catData.data.images.original.url;
}

getCats()