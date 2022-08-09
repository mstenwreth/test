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
    
    const collection = new Map()

    for (let word of uniqueWords) {
        let counter = allWordsArray.filter(e => e === word).length
        if(counter > 0) collection.set(word, counter)
    }

    const result = new Map([...collection].sort((a, b) => b[1] - a[1]))
    const [mostCommon] = result.keys()
    
    // if the same 1, 2 on the list
    const asArray = [...result.values()]
    const same = asArray.length > 2 && asArray[0] === asArray[1]
    
    return same ? `Split winner! ${Array.from(result)[0]} times & ${Array.from(result)[1]} times` : mostCommon
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
        .replace(/\d/g, ' ')
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