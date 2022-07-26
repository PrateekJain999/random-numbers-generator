'use strict';

/**
 * Module exports.
 * @public
 */
module.exports = rng;

/**
 * Function to verify string provided is valid SHA256 hash or not.
 * @param {*} str 
 * @returns 
 */
function checkIfValidSHA256(hash) {
	// Regular expression to check if string is a SHA256 hash
	const regexExp = /^[a-f0-9]{64}$/gi;
	return regexExp.test(hash);
}

/**
 * function to generate random numbers.
 * @param {*} hash 
 * @param {*} lowestNumber 
 * @param {*} highestNumber 
 * @param {*} randomNumbersQuantity 
 * @returns 
 */
function rng (hash, lowestNumber, highestNumber, randomNumbersQuantity) {
	if (randomNumbersQuantity < 0) {
		throw new Error('Please pass positive value to generate random numbers.');
	}

	if (!checkIfValidSHA256(hash)){
		throw new Error('Please provide valid SHA256 hash.');
	}

	let randomNumbers = [], cryptoNumber, baseNumber = Math.pow(2, 52), index = 0, rand;

	for (let i = 0; i < randomNumbersQuantity; i++) {
		if (index >= 52) {
			index++;
		}

		cryptoNumber = parseInt(hash.substr(index, 13), 16);
		rand = Math.floor((cryptoNumber / baseNumber) * highestNumber) + lowestNumber;
		randomNumbers.push(rand);
		index = index + 3;
	}

	return randomNumbers;
};
