export default function getPasswordMessage(message:string){
    switch (message){
        case 'reverseWords':
            return "Avoid reversed spellings of common words."
        case 'pwned':
            return "This password was found in a data breach."
        case 'anotherWord':
            return "Try adding another word to make your password stronger."
        case 'l33t':
            return "Avoid predictable letter substitutions like '@' for 'a'."
        case 'capitalization':
            return "Capitalize more than the first letter."
        case 'dates':
            return "Avoid dates and years that are associated with you."
        case 'recentYears':
            return "Avoid recent years."
        case 'sequences':
            return "Avoid common character sequences."
        case 'repeated':
            return "Avoid repeated words or characters."
        case 'longerKeyboardPattern':
            return "Use longer keyboard patterns and change typing direction multiple times."
        case 'useWords':
            return "Use multiple words, but avoid common phrases."
        case 'extendedRepeat':
            return "Repeated character patterns like 'abcabcabc' are easy to guess."
        default: 
            return null
    }
}