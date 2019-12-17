import { Example } from './example';

export class Word{
    id      :   number;
    content :   string;
    def     :   string;
    type    :   number;
    typeAbb :   string;
    typeName:   string;
    typeColor:  string;
    examples :  Example[];
}