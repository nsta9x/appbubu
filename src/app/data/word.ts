export class Word{
    id      : number;
    word    : string;
    wordDef : string;
    type    : number;
    
    constructor(word : string, wordDef: string, wordType: number){
        this.id         = -1;
        this.word       = word;
        this.wordDef    = wordDef;
        this.type       = wordType;
    }
}