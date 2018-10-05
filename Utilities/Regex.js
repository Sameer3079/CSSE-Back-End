
let regex = {
    emailRegEx: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    textOnlyRegEx: /^[a-zA-Z ]*$/,
    numbersOnlyRegEx: /^[0-9]*$/,
    alphaNumericRegEx: /^[0-9a-zA-z]*$/,
    contactNoRegEx: /^[0-9]{1,14}$/,
}

module.exports = regex