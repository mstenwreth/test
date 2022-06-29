const getUniqueWords = (textBlob) => {
    const wordsList = getAllWordsArray(textBlob)

    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index
    }

    return wordsList.filter(onlyUnique)
}

const getMostCommonWord = (words) => {
    const allWords = getAllWordsArray(words)
    const uniqueWords = getUniqueWords(words)
    
    const collection = new Map()

    for (let word of uniqueWords) {
        let counter = allWords.filter(e => e.toLowerCase() === word.toLowerCase()).length
        if(counter > 0) collection.set(word, counter)
    }
    const result = new Map([...collection].sort((a, b) => b[1] - a[1]))
    const [mostCommon] = result.keys()
     
    return mostCommon
}

const getAllWordsArray = (textBlob) => {
    const regexWordsSpaces = /[^\w\s]/gi
    const regexStrangContext = /\w_|_/gi
    return textBlob
        .replace(/\n/g, ' ')
        .replace(regexWordsSpaces, '')
        .replace(regexStrangContext, '')
        .split(' ')
        .filter(e => e)
        .map(e => e.toLowerCase())
}

module.exports = {
    getUniqueWords,
    getMostCommonWord,
    getAllWordsArray
}