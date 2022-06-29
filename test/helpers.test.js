const assert = require('assert')
const fs = require('fs')
const path = require('path')
const filepath = path.resolve('test/assets/Why beer is better than Jesus.txt')
const filepath2 = path.resolve('test/assets/Doughnuts.rtf')
const filepath3 = path.resolve('test/assets/Aladdin and the Wonderful Lamp.rtf')
const filepath4 = path.resolve('test/assets/Employee Empowerment.md')
const filepath5 = path.resolve('test/assets/Guide lines for effective color terminal usage.txt')
const filepath6 = path.resolve('test/assets/How many generic chickens can you fit into a generic pontiac.txt')
const filepath7 = path.resolve('test/assets/The Adventures of Sherlock Holmes.file')

const { getUniqueWords, getMostCommonWord, getAllWordsArray } = require('../src/utils/_helper')

describe('Test seperate files', () => {
    it('test/assets/Why beer is better than Jesus.txt', () => {
        const stringBlob = fs.readFileSync(filepath, 'utf-8', (data, err) => {
            if(err) throw new Error('File read error')
            else return data
        })

        const uniqueW = getMostCommonWord(stringBlob)

        assert.equal(uniqueW, 'beer')
    })

    it('test/assets/Doughnuts.rtf', () => {
        const stringBlob = fs.readFileSync(filepath2, 'utf-8', (data, err) => {
            if (err) throw new Error('File read error')
            else return data
        })

        const text = getMostCommonWord(stringBlob)
        assert.equal(text, 'doughnut')
    })

    it('test/assets/Aladdin and the Wonderful Lamp.rtf', () => {
        const stringBlob = fs.readFileSync(filepath3, 'utf-8', (data, err) => {
            if (err) throw new Error('File read error')
            else return data
        })

        const text = getMostCommonWord(stringBlob)
        assert.equal(text, 'the')
    })

    it('test/assets/Employee Empowerment.md', () => {
        const stringBlob = fs.readFileSync(filepath4, 'utf-8', (data, err) => {
            if (err) throw new Error('File read error')
            else return data
        })

        const text = getMostCommonWord(stringBlob)
        assert.equal(text, 'the')
    })

    it('test/assets/Guide lines for effective color terminal usage.txt', () => {
        const stringBlob = fs.readFileSync(filepath5, 'utf-8', (data, err) => {
            if (err) throw new Error('File read error')
            else return data
        })

        const text = getMostCommonWord(stringBlob)
        assert.equal(text, 'the')
    })

    it('test/assets/How many generic chickens can you fit into a generic pontiac.txt', () => {
        const stringBlob = fs.readFileSync(filepath6, 'utf-8', (data, err) => {
            if (err) throw new Error('File read error')
            else return data
        })

        const text = getMostCommonWord(stringBlob)
        assert.equal(text, 'the')
    })

    /*it('test/assets/The Adventures of Sherlock Holmes.file', () => {
        const stringBlob = fs.createReadStream(filepath7, 'utf-8')
        let newText = ''
        let result = ''

        stringBlob.on('data', (chunk) => {
            // console.log(chunk)
            newText += chunk
        })

        stringBlob.on('end', (chunk) => {
            console.log('end')
            result = getMostCommonWord(newText)
        })

        // const text = getMostCommonWord(newText)
        console.log('result', result)
        console.log('newText', newText)
        // assert.equal(text, 'the')
    })*/
})