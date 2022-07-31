const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const stream = require('stream')
const readline = require('readline')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.use('/client', express.static('public'))

const { getMostCommonWord, parseLine, replaceMostCommonWord } = require('./utils/_helper')

app.post('/upload', async (req, res) => {
    const { files } = req

    if(!files) return res.status(404)

    const textFile = files.textFile.data
    if (!textFile instanceof Buffer) {
        console.log('Generic file error', textFile)
        res.send(500).json({ message: 'Internal error'})
    }

    try {
        const bufferStream = new stream.PassThrough()
        bufferStream.end(textFile)
    
        let rl = readline.createInterface({
            input: bufferStream
        })
    
        let text = ''
        rl.on('line', (line) => {
            line = parseLine(line)
            if (line.length > 0) {
                text += line.trim().toLowerCase() + ' '
            }
        })
    
        rl.on('close', () => {
            const mostCommonWord = getMostCommonWord(text)
            text = replaceMostCommonWord(text, mostCommonWord)
            return res.status(200).json({ mostCommonWord, 'text': files.textFile.size === 0 ? 'Missing content in file' : text })
        }) 
    } catch (error) {
        console.log(error.message)
        res.send(500).json({ message: 'Internal error' })
    }
})

app.listen(port, () => {
    console.log(`application is listening to: ${port}`)
})