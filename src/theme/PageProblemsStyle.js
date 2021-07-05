export const PageProblemsSx = {
    fontFamily: 'Open-Sans',

    // overall page styles
    '.page-problems': {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        padding: ['0px 10px', '0 50px', '0 50px 0 80px', '0 50px 0 80px', '0 130px'],
    },
    '.section-title': {
        margin: '50px 0 0 45px',
        fontSize: '25px',
        fontWeight: '600',
    }, 
    '.questions-container': {
        margin: '0',
        marginTop: '30px',
        marginRight: ['30px', '50px', '50px', '50px', '80px'],
        flex: '2 1 auto',
    },

    // shared styles
    '.pointer': {
        '&:hover': {
            cursor: 'pointer',
        }
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
    '.no-quest': {
        backgroundColor: 'mediumGrey',
        width: '100%',
        padding: '25px',
    },
    '.check': {
        color: 'easyGreen',
    },
    '.drop-arrow': {
        color: 'purple',
    },
    '.topic-container': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    '.tag': {
        textTransform: 'capitalize',
        fontFamily: 'body',
        fontSize: '13px',
        fontWeight: '400',
        borderRadius: '5px',
        width: 'fit-content',
        minWidth: 'fit-content',
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
    '.dropdown': {
        position: 'absolute',
        borderRadius: '5px',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    '.dropdown-tag': {
        marginBottom: '8px',
    },

    // hot question specific styling
    '.hot-quest-container': {
        display: 'flex',
        flexWrap: 'wrap',
    },
    '.hot-quest-box': {
        width: ['50%', '50%', '45%', '23%', '23%'],
        maxWidth: '300px',
        minWidth: '200px',
        height: '130px',
        margin: '15px 15px 0 0',
    },
    '.hot-quest-box-link': {
        width: '100%',
        height: '100%',
        padding: '20px 20px 17px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flex: '2 1 20%',
        borderRadius: '20px',
        textDecoration: 'none',
        color: 'black',
        backgroundColor: 'white',
        boxShadow: '2px 2px 4px rgba(128, 128, 128, 0.1)',
        transition: '.5s',
        '&:hover': {
            backgroundColor: 'lightPurpleGray',
        },
    },
    '.hot-quest-tags': {
        width: '100%',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    '.hot-quests-dropdown': {
        margin: '-13px 0 0 10px',
        padding: '0px 10px 2px 10px',
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


    // regular question specific styling
    '.problems-container': {
        margin: '20px 0 40px 0',
        borderRadius: '20px',
        backgroundColor: 'white',
        boxShadow: '2px 2px 4px rgba(128, 128, 128, 0.1)',
        padding: '20px 20px'
,    },
    '.original-list-btn': {
        width: 'fit-content',
        margin: '5px auto 10px 20px',
    },
    '.original-list-btn:hover': {
        color: 'mediumGrey',
        cursor: "pointer",
    },
    '.problem-box': {
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '10px 20px 10px 10px',
        borderTop: '1px solid #DFDEDE',
        textDecoration: 'none',
        color: 'black',
        transition: '.5s',
        '&:hover': {
            backgroundColor: 'lightPurpleGray',
        },
    },
    '.check-container': {
        width: '20px',
        marginRight: '25px',
    },
    '.problem-title': {
        width: '40%',
        display: 'flex',
        justifyContent: 'flex-start',
    },
    '.problems-topic-container': {
        width: '30%',
        marginLeft: '30px',
    },
    '.problems-dropdown': {
        margin: '75px 0 0 260px',
        padding: '8px 10px 2px 10px',
    },
    '.company-tag': {
        width: '85px',
        color: 'white',
        backgroundColor: 'mediumGray',
        marginRight: ['0', '0', '0', '4%', '6%'],
    },
    '.no-company-tag': {
        width: '85px',
        color: 'white',
        backgroundColor: 'white',
        marginRight: ['0', '0', '0', '4%', '6%'],
    },
    '.problems-diff': {
        width: '75px',
        color: 'white',
        padding: '1px 5px',
        fontSize: '14px',
        border: 'none',
    },

    // filter styling
    '.sortby-container': {
        flex: '1 0 auto',
        minWidth: '200px',
        maxWidth: '250px',
        marginTop: '130px',
        textAlign: 'center',
    },
    '.sortby-title': {
        fontSize: '20px',
        fontWeight: '600',
    },
    '.sortby-box': {
        backgroundColor: 'white',
        padding: '0',
        borderTop: '4px solid #EFEFEF',
        paddingBottom: '10px',
    },
    '.sortby-header': {
        width: '100%',
        padding: '15px 20px 0 20px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        margin: '0',
    },
    '.filter-tag-title': {
        textAlign: 'left',
        fontSize: '16px',
        fontWeight: '600',
    },
    '.filter-tag-link': {
        textTransform: 'capitalize',
        color: 'black',
        backgroundColor: 'transparent',
        margin: '0px 5px 5px 35px',
        width: 'fit-content',
        textAlign: 'left',
        fontSize: '13px',
        fontWeight: '400',
        transition: '1s',
        '&:hover': {
            color: 'purple3',
        },
    },
    '.tag-selected': {
        color: 'purple',
        fontWeight: '600',
    },
};