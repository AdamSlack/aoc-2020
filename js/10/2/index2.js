const { kMaxLength } = require('buffer')
const fs = require('fs')

const fp = 'input.txt'
// const fp = 'test_input.txt'
// const fp = 'small_test_input.txt'
let jolts = fs.readFileSync(fp, 'utf-8')
  .split('\n')
  .map((line) => parseInt(line, 10))

jolts.sort((a, b) => a - b)

jolts = [0, ...jolts, jolts[jolts.length-1] + 3]

const branches = Array.from({length: jolts.length}, () => 0)
branches[0] = 1

let i = 0
while(i < jolts.length) {
  let j = i - 3
  while (j < i) {
    if(jolts[i] - jolts[j] <= 3) {
      branches[i] += branches[j];    }
    j++
  }
  i++ 
}

console.log(branches[branches.length-1])