// let allDogs = Promise.all([getDogsDb(), getDogsApi()]).then(
// 	([dogsDb, dogsApi]) => {
// 		allDogs = dogsDb.concat(dogsApi);
// 		if (!name) {
// 			return res.status(200).json(dogsDb.concat(allDogs));
// 		}
// 		let dogByName = [];
// 		for (let i = 0; i < allDogs.length; i++) {
// 			if (allDogs[i].name.includes(name)) {
// 				dogByName.push(allDogs[i]);
// 			}
// 		}
// 		res.status(200).json(dogByName);
// 	}
// );
