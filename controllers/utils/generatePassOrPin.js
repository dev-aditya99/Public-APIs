const generatePassOrPin = (toggleValue) => {
    if (toggleValue) {
        const PIN = generatePIN()
        return PIN
    } else {
        const pass = passWordGenerator();
        return pass
    }
}


// generate pin 
const generatePIN = () => {
    let pin = '';
    for (let i = 0; i < 6; i++) {
        const randomDigit = Math.floor(Math.random() * 10);
        pin += randomDigit;
    }
    return pin;
};


// length limit 
const greateThen8 = () => {
    let countOfArr15 = Math.floor(Math.random() * 15);

    if (countOfArr15 > 8) {
        return countOfArr15
    }
    return greateThen8()
}


// password generator 
const passWordGenerator = () => {
    let length = greateThen8();

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "@#$%&*/?+";

    const allChars = uppercase + lowercase + numbers + specialChars;

    // Force minimum length 8
    if (length < 8) {
        length = 8;
    }

    let passwordChars = [
        uppercase[Math.floor(Math.random() * uppercase.length)],  // at least one uppercase
        lowercase[Math.floor(Math.random() * lowercase.length)],  // at least one lowercase
        numbers[Math.floor(Math.random() * numbers.length)],      // at least one number
        specialChars[Math.floor(Math.random() * specialChars.length)] // at least one special char
    ];

    // Fill the rest
    for (let i = 4; i < length; i++) {
        passwordChars.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Shuffle to avoid predictable pattern
    for (let i = passwordChars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]]; // swap
    }

    return passwordChars.join('');
}

export default generatePassOrPin

