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
    '.tag-container': {
        display: 'flex',
        flexDirection: 'row',
    },
    '.tag': {
        fontSize: '13px',
        fontWeight: '400',
        color: 'purple',
        backgroundColor: 'white',
        border: '1px solid #5A3FFF',
        borderRadius: '5px',
        width: 'fit-content',
        textAlign: 'center',
        marginRight: '5px',
        padding: '1px 5px',
    },
    '.tag-button:hover': {
        cursor: 'pointer',
    },

    // hot question styling
    '.hot-quest-container': {
        display: 'flex',
        flexWrap: 'wrap',
    },
    '.hot-quest-box': {
        width: '25%',
        minWidth: '250px',
        height: '120px',
        padding: '20px 20px 17px 20px',
        margin: '15px 15px 0 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderRadius: '20px',
        backgroundColor: 'white',
        boxShadow: '2px 2px 4px rgba(128, 128, 128, 0.1)',
    },
    '.hot-quest-box:hover': {
        backgroundColor: 'mediumGrey',
    },
    '.hot-quest-tags': {
        width: '100%',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    '.hot-quest-icon-box': {
        display: 'flex',
        
    },
    '.hot-quest-diff': {
        width: '13px',
        height: '13px',
        padding: '0',
        borderRadius: '50px',
        margin: '1px 0 0 12px',
    },


    // regular questions styling
    '.problems-container': {
        borderRadius: '20px',
        backgroundColor: 'white',
        boxShadow: '2px 2px 4px rgba(128, 128, 128, 0.1)',
        padding: '20px 30px'
,    },
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
    },
};