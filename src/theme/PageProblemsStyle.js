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
    '.original-list-btn': {
        width: 'fit-content',
        margin: '5px auto 10px 20px',
    },
    '.original-list-btn:hover': {
        color: 'mediumGrey',
        cursor: "pointer",
    },


    '.page-problems': {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        padding: '0px 70px',
    },
    '.section-title': {
        margin: '50px 0 0 45px',
        fontSize: '25px',
        fontWeight: '600',
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
        fontFamily: 'body',
        fontSize: '13px',
        fontWeight: '400',
        borderRadius: '5px',
        width: 'fit-content',
        textAlign: 'center',
        marginRight: '5px',
        padding: '1px 5px',
    },
    '.topic-tag': {
        color: 'purple',
        backgroundColor: 'white',
        border: '1px solid #5A3FFF',
    },
    '.tag-btn:hover': {
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
        margin: '20px 0 40px 0',
        borderRadius: '20px',
        backgroundColor: 'white',
        boxShadow: '2px 2px 4px rgba(128, 128, 128, 0.1)',
        padding: '20px 30px'
,    },
    '.problem-box': {
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '10px 20px',
        borderTop: '1px solid #DFDEDE'
    },
    '.problems-diff': {
        width: '75px',
        color: 'white',
        padding: '1px 5px',
        fontSize: '14px',
        border: 'none',
        textTransform: 'capitalize',
    },
    '.company-tag': {
        width: '85px',
        color: 'white',
        backgroundColor: 'mediumGray',
    },

    // sortby styling
    '.sortby-container': {
        width: '20%',
        marginTop: '130px',
        textAlign: 'center',
    },
    '.sortby-title': {
        fontSize: '20px',
        fontWeight: '600',
        margingBottom: '50px !important',
    },
    '.sortby-box': {
        backgroundColor: 'white',
        padding: '20px 20px',
        borderTop: '4px solid #EFEFEF',
    },
    '.filter-tag-title': {
        textAlign: 'left',
        fontSize: '16px',
        fontWeight: '600',
    },
    '.filter-tag-link': {
        color: 'purple',
        backgroundColor: 'transparent',
        margin: '5px 5px 5px 10px',
        width: 'fit-content',
        textAlign: 'left',
        fontSize: '13px',
        fontWeight: 'normal',
    },
    '.diff-button:hover': {
        backgroundColor: 'mediumGrey',
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