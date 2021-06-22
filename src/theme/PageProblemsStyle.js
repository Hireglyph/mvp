// temporarily here so I don't have to scroll

export const PageProblemsSx = {
    display: 'flex',
    fontFamily: 'Open-Sans',
  
    '.link': {
      textDecoration: 'none',
      color: 'black',
    },
    '.flex': {
      display: 'flex',
    },
    '.original-list': {
      marginLeft: '20px',
      marginRight: 'auto',
      marginTop: '23px',
    },
    '.original-list:hover': {
      color: 'mediumGrey',
    },


    '.page-problems': {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        padding: '0px 100px',
    },
    'h3': {
        marginTop: '50px',
    }, 
    '.questions-container': {
        margin: '30px 50px 0 0',
    },

    '.question-title': {
        fontSize: '16px',
    },
    '.easy': {
        backgroundColor: 'easyGreen',
    },
    '.medium': {
        backgroundColor: 'medOrange',
    },
    '.hard': {
        backgroundColor: 'hardRed',
    },

    // hot question styling
    '.hot-quest-container': {
        display: 'flex',
        flexWrap: 'wrap',
    },
    '.hot-quest-box': {
        backgroundColor: 'white',
        width: '25%',
        minWidth: '250px',
        height: '145px',
        padding: '20px',
        margin: '15px 15px 0 0',
        borderRadius: '20px',
        boxShadow: '2px 2px 4px 0px rgba(128, 128, 128, 0.1)',
    },
    '.hot-quest-box:hover': {
        backgroundColor: 'mediumGrey',
    },
    '.hot-quest-diff': {
        width: '13px',
        height: '13px',
        padding: '0',
        borderRadius: '50px',
    },


    // regular questions styling
    '.problems-container': {
        backgroundColor: 'white',
        boxShadow: '2px 2px 4px 0px rgba(128, 128, 128, 0.1)',

    },
    '.problems-diff': {
        color: 'white',
        padding: '8px 13px',
        fontSize: '14px',
    },

    // sortby styling
    '.sortby-container': {
        backgroundColor: 'white',
        marginTop: '130px',
        textAlign: 'center',
    },
    '.tag-container': {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        height: '70px',
    },
    '.tag': {
        fontSize: '12px',
        backgroundColor: 'orange',
        borderRadius: '4px',
        width: '107.61px',
        height: '22px',
        textAlign: 'center',
        margin: '5px',
        paddingTop: '2px',
    },
    '.tag-button:hover': {
        backgroundColor: 'darkOrange',
    },
    '.diff-button': {
        display: 'inline-block',
        margin: '5px',
        backgroundColor: 'lightGrey',
        borderRadius: '4px',
        width: '80px',
    },
    '.diff-button:hover': {
        backgroundColor: 'mediumGrey',
    },
    '.tag-button-container': {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '270px',
    },
    '.tag-selected': {
        border: '3px #000000 solid'
    },
    '.no-quest': {
        backgroundColor: 'mediumGrey',
        width: '400px',
        padding: '25px',
    },
    '.check': {
        color: 'easyGreen',
        marginRight: '5px',
        marginLeft: '5px',
        marginTop: '3px',
    },
};