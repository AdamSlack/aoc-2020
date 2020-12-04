const fs = require('fs')
const { findSourceMap } = require('module')

// const fp = './input.txt'
// const fp = './test_input.txt'
const fp = './test_input_invalid.txt'
// const fp = './test_input_valid.txt'
// const fp = './test_input_mixed.txt'
const passportTexts = fs.readFileSync(fp, 'utf-8').split('\n\n')

const passports = passportTexts.map((passportText) => {
  return passportText.split('\n').map((passportLine) => passportLine.split(' ')).flat().reduce((acc, element) => {
    const [key, val] = element.split(':')
    return {
      ...acc,
      [key]: val,
    }
  }, {})
})

const createNumStringValidator = (min, max, length) => (numString) => numString.length === length && ((num) => num >= min && num <= max)(parseInt(numString))

const fieldValidation = {
  byr: (birthYearString) => createNumStringValidator(4, 1920, 2002)(birthYearString),
  iyr: (issueYearString) => createNumStringValidator(4, 2010, 2020)(issueYearString),
  eyr: (expireYearString) => createNumStringValidator(4, 2020, 2030)(expireYearString),
  hgt: (heightString) => {
    if(heightString.toLowerCase().includes('cm')) {
      return createNumStringValidator(3, 150, 193)(heightString)
    }
    if(heightString.toLowerCase().includes('in')) {
      return createNumStringValidator(2, 59, 76)(heightString)
    }
    return false
  },
  hcl: (hairString) => /^#([0-9a-f]){6}$/.test(hairString),
  ecl: (eyeString) => new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']).has(eyeString),
  pid: (pidString) => /^[0-9]{9}$/.test(pidString),
  // 'cid',
}

numberOfValidPassports = passports.reduce((acc, passport) => {
  console.log(passport)
  return Object.entries(fieldValidation).every(([field, isValid]) => {
    const passportFields = Object.keys(passport) 
    console.log(field)
    return new Set(passportFields).has(field) && isValid(passportFields[field])
  }) ? acc + 1 : acc
}, 0)

console.log(passports)
console.log(numberOfValidPassports)