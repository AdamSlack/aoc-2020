const { time } = require('console')
const fs = require('fs')

// const fp = 'test_input.txt'
const fp = 'test_input_two.txt'
// const fp = 'input.txt'

const lines = fs
  .readFileSync(fp, 'utf-8')
  .split('\n')

const arrivalTime = parseInt(lines[0], 10)
const busTimes = lines[1]
  .split(',')
  .map((time) => time !== 'x' ? parseInt(time, 10) : 'x')

console.log(arrivalTime, busTimes)

let timestamp = 0
let meetsRules = false

while(!meetsRules) {
  timestamp += busTimes[0]
  
  meetsRules = busTimes.every((time, idx) => {
    if(time === 'x') {
      return true
    }
    return (timestamp + idx) % time === 0 
  })
}

console.log('Answer:', timestamp)