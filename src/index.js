const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.use('/client', express.static('public'))

const { getMostCommonWord, getAllWordsArray } = require('./utils/_helper')

app.post('/file', (req, res) => {
    const { files } = req

    if(!files) return res.status(404)

    const text = files.text.data.toString('utf-8')
    const mostCommonWord = getMostCommonWord(text)
    let all = getAllWordsArray(text)

    all.forEach((e, i) => { if (e === mostCommonWord) all[i] = `foo${e}bar` })

    res.status(200).json({ mostCommonWord, text: files.text.size === 0 ? 'Missing content in file' : all })
})

app.listen(port, () => {
    console.log(`application is listening to: ${port}`)
})