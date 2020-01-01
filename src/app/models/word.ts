export class Word{
    id      :   number;
    content :   string;
    note    :   string;
    type    :   number;
    typeAbb :   string;
    typeName:   string;
    typeColor:  string;
    lang    :   string;
    lang_id :   number;
    flagURL :   string;
    examples:   string[];
    translate:  Word[];
    related:    Word[];
}