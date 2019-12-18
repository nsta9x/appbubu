import { Example } from './example';

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
    example1:   string;
    example2:   string;
    example3:   string;
    translate:  Word[];
    related:    Word[];
}