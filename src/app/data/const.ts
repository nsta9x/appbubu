export const CONST = Object.freeze ({
    KEY_LIST_WORD : "KEY_LIST_WORD",
    BASE_URL      : "http://localhost:8080",
    NOTI_OK       : ['sn-success'],
    NOTI_ERR      : ['sn-error'],
    RES_OK        : 1,
    RES_KO        : 0,
    IMG_DIR       : "assets/img/"
});

export const LANG = 
[
        { index : 1, value : "EN", flag : "/EN.png" },
        { index : 2, value : "FR", flag : "/FR.png" },
        { index : 3, value : "VN", flag : "/VN.png" },
];

export const WORD_TYPE = 
[
        {id : 10, abb : "(n)",   color : 'green',     name : 'Noun'},
        {id : 20, abb : "(v)",   color : 'red',       name : 'Verb'},
        {id : 30, abb : "(a)",   color : 'orange',    name : 'Adjectif'},
        {id : 40, abb : "(adv)", color : 'purple',    name : 'Adverb'},
];