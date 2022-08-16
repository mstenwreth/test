const { getMostCommonWord, parseLine, replaceMostCommonWord } = require('../../utils/_helper')
const stream = require('stream')
const readline = require('readline')
const { InternalError, NotFoundError } = require('../../errors')

module.exports = function (context) {
    async function upload(req, res, next) {
        const { files } = req
        console.log('context', context)

        if (!files) return res.status(404)

        const textFile = files?.example?.data
        if (!textFile instanceof Buffer) {
            next(new NotFoundError({ message, reqId }))
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
                return res.status(200).json({ mostCommonWord, 'text': files.example.size === 0 ? 'Missing content in file' : text })
            })
        } catch (error) {
            console.log('error.message', error.message)
            next(new InternalError({ message, reqId, error }))
        }
    }

    return {
        upload
    }
}