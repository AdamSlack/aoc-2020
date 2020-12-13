const { time } = require('console')
const fs = require('fs')

// const fp = 'test_input.txt'
// const fp = 'test_input_two.txt'
// const fp = 'test_input_three.txt'
const fp = 'input.txt'

const lines = fs
  .readFileSync(fp, 'utf-8')
  .split('\n')

const arrivalTime = parseInt(lines[0], 10)
const busTimes = lines[1]
  .split(',')
  .map((time) => time !== 'x' ? parseInt(time, 10) : 'x')

console.log(arrivalTime, busTimes)

const max = Math.max(...busTimes.filter((time) => time !== 'x'))
const maxIdx = busTimes.indexOf(max)

const indeces = busTimes
  .map((time, idx) => time === 'x' ? 'x' : idx)
  .filter((time) => time !== 'x')

const times = busTimes 
  .filter((time) => time !== 'x')

let timestamp = 0
let meetsRules = false

const big = 100000000000000
const inc = 10000000000
let nextLog = inc

while(!meetsRules) {
  timestamp += max
  if(timestamp > nextLog) {
    console.log(timestamp)
    nextLog += inc
  }
  meetsRules = times.every((time, idx) => {
    if(time === 'x') {
      return true
    }
    return (timestamp + (indeces[idx] - maxIdx)) % time === 0 
  })
}
const answer = timestamp - maxIdx
console.log('Answer:', answer)