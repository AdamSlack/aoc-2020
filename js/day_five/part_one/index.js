const fs = require('fs')


const fp = 'input.txt'
// const fp = 'test_input.txt'
const lines = fs.readFileSync(fp, 'utf-8').split('\n')

const partitions = lines.sort((a,b) => b.localeCompare(a)).map((line) => {
  console.log(line)
  return {
    rows: line.slice(0, 6).split(''),
    cols: line.slice(7).split('')
  }
})

const maxRow = 127
const maxCol = 7

const findNumber = (partition, min, max) => {
  partition.forEach((half) => {
    let mid = Math.ceil((max - min) / 2)
    // console.log(min, max, mid)
    if (half === 'F' || half === 'L') {
      max -= mid
    }
    else if (half === 'B' || half === 'R') {
      min += mid
    }
  })
  return min
}

const getSeatId = (partition) => {
  const row = findNumber(partition.rows, 0, maxRow)
  const col = findNumber(partition.cols, 0, maxCol)
  const result = {
    ...partitions,
    row,
    col,
    id: (row * 8) + col
  }
  // console.log(result)
  return result
}

// console.log(getSeatId(partitions[partitions.length - 1]))

const seatDetails = partitions.map(getSeatId)
const seatIds = seatDetails.map(({id}) => id)
const maxId = Math.max(...seatIds)
console.log(maxId)