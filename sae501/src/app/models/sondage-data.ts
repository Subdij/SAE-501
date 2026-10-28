export interface SondageData {
    numQuestion: string,
    question: string,
    comment: string,
    name: string,
    inputText?: boolean,
    inputAge?: boolean,
    inputNumber?: boolean,
    radio?: boolean,
    checkbox?: boolean,
    textArea?: boolean,
    eval?: boolean,
}