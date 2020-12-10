const { kMaxLength } = require('buffer')
const fs = require('fs')

const fp = 'input.txt'
// const fp = 'test_input.txt'
// const fp = 'small_test_input.txt'
const jolts = fs.readFileSync(fp, 'utf-8')
  .split('\n')
  .map((line) => parseInt(line, 10))

jolts.sort((a, b) => a - b)

const counts = jolts.reduce((acc, jolt) => {
  if(jolt === acc.lastJolt + 1) {
    return {
      ...acc,
      oneJolt: acc.oneJolt + 1,
      lastJolt: jolt
    }
  }
  if(jolt === acc.lastJolt + 3) {
    return {
      ...acc,
      threeJolt: acc.threeJolt + 1,
      lastJolt: jolt
    }
  }
  if(jolt === acc.lastJolt + 2) {
    return {
      ...acc,
      lastJolt: jolt
    }
  }
  return acc
}, {
  oneJolt: 0,
  threeJolt: 1, // cause yo' phone is 3 higher than the highest adapter.
  lastJolt: 0,
})

console.log(counts)
console.log('Answer:', counts.oneJolt * counts.threeJolt)