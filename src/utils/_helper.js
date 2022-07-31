const getUniqueWords = (textBlob) => {
    const wordsList = getAllWordsAsArray(textBlob)
    return [... new Set(wordsList)]
}
 
/**
 * @param words string of all textcontent from a file
 */
const getMostCommonWord = (words) => {
    const allWordsArray = getAllWordsAsArray(words)
    const uniqueWords = getUniqueWords(words)
    console.log('uniqueWords1', uniqueWords)
    
    const collection = new Map()

    for (let word of uniqueWords) {
        let counter = allWordsArray.filter(e => e === word).length
        if(counter > 0) collection.set(word, counter)
    }

    const result = new Map([...collection].sort((a, b) => b[1] - a[1]))
    const [mostCommon] = result.keys()
    
    return mostCommon
}

const getAllWordsAsArray = (textBlob) => {
    return textBlob
        .split(' ')
        .filter(e => e)
        .map(e => e.toLowerCase())
}

const parseLine = (line) => {
    return line
        .trim()
        .replace(/[^\x20-\x7E]/g, ' ') // remove ascii characters
        .replace(/\W|_/g, ' ') // remove special characters
        .replace(/  +/g, ' ') // replace multiple spaces
}

const replaceMostCommonWord = (text, word) => {
    const words = getAllWordsAsArray(text)

    return words.map(e => e === word ? e.replace(word, `foo${word}bar`) : e ).join(' ')
}

module.exports = {
    getUniqueWords,
    getMostCommonWord,
    getAllWordsAsArray,
    parseLine,
    replaceMostCommonWord
}