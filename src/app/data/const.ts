export const LANG = 
[
        { id : 1, value : "EN", flag : "/EN.png" },
        { id : 2, value : "FR", flag : "/FR.png" },
        { id : 3, value : "VN", flag : "/VN.png" },
];

export const CONST = Object.freeze ({
    KEY_LIST_WORD : "KEY_LIST_WORD",
    RES_CODE      : "RES_CODE",
    BASE_URL      : "http://localhost:8080",
    NOTI_OK       : ['sn-success'],
    NOTI_ERR      : ['sn-error'],
    RES_OK        : 1,
    RES_KO        : 0,
    IMG_DIR       : "assets/img/"
});

export const ERROR_CODE = Object.freeze ({
    ERR_WORD_EXISTED : "ERR_WORD_EXISTED"
})

export const WORD_TYPE = 
[
        {id : 10, abb : "(n)",   color : 'green',     name : 'Noun'},
        {id : 20, abb : "(v)",   color : 'red',       name : 'Verb'},
        {id : 30, abb : "(a)",   color : 'orange',    name : 'Adjectif'},
        {id : 40, abb : "(adv)", color : 'purple',    name : 'Adverb'},
];