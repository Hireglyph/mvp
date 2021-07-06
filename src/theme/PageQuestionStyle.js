export const QuestionSx = {

    '.page-container': {
        display: 'flex',
        alignItems: 'flex-start',
        fontFamily: 'Open-Sans',
        width: '100%',
        height: 'fit-content',
        minHeight: 'calc(100vh - 60px)',
        backgroundColor: 'white',
    },

    '#no-scroll': {
        overflowY: 'hidden',
        height: 'calc(100vh - 60px)',
    },

    // question

    '.check': {
        color: 'easyGreen',
        marginLeft: '10px',
    },

    '.question-block': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'sticky',
        top: '50px',
        overflowY: 'auto',
        flex: '1 0 200px',
        padding: '70px',
        paddingBottom: '40px',
        minWidth: '400px',
        height: 'fit-content',
        minHeight: 'calc(100vh - 60px)',
    },

    '.question-title': {
        fontSize: '18px',
        marginBottom: '10px',
    },

    '.tag-container': {
        display: 'flex',
        flexWrap: 'wrap',
        paddingBottom: '15px',
        borderBottom: '1px solid lightGray',
    },

    '.tag': {
        fontFamily: 'Gotham-book',
        fontSize: '16px',
        fontWeight: '500',
        textTransform: 'capitalize',
        marginRight: '10px',
        '&:hover': {
            textDecoration: 'none',
            cursor: 'pointer',
        },
    },

    '.easy': {
        color: 'easyGreen',
    },

    '.medium': {
        color: 'medOrange',
    },

    '.hard': {
        color: 'hardRed',
    },

    '.purple': {
        color: 'purple',
        cursor: 'pointer',
    },

    '.question-description': {
        fontFamily: 'Gotham-Book',
        fontSize: '14px',
        fontWeight: '400',
        marginTop: '30px',
        lineHeight: '30px',
    },

    '.answer-display': {
        fontFamily: 'body',
        fontSize: '14px',
        cursor: 'pointer',
    },

    // myTP

    '.display-block': {
        flex: '2 0 400px',
        width: '66%',
        height: 'fit-content',
        minHeight: 'calc(100vh - 60px)',
        borderLeft: '2px solid #DFDEDE',
    },

    '.question-btn-container': {
        width: '100%',
        backgroundColor: 'background',
        display: 'flex',
        alignItems: 'flex-end',
    },

    '.question-btn': {
        width: '200px',
        height: '35px',
        backgroundColor: 'background',
        borderRadius: '0',
        borderRight: '1px solid #DFDEDE',
        borderBottom: '1px solid #DFDEDE',
        fontSize: '14px',
        fontWeight: 'heading !important',
        fontFamily: 'Open-Sans',
        color: 'mediumGray',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'lightGray',
        },
        '&:disabled': {
            backgroundColor: 'white',
            borderBottom: 'none',
            cursor: 'default',
        },
    },

    '.question-border': {
        flex: '2 0 auto',
        borderBottom: '1px solid #DFDEDE',
    },

    '.myTp-container': {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '30px 50px',
    },

    '.myTp-header': {
        fontSize: '14px',
    },

    '.tp-tooltip': {
        cursor: 'pointer',
        position: 'absolute',
        margin: '-35px 0 0 425px',
        width: '260px',
        height: '123px',
        lineHeight: '20px',
        padding: '12px 15px',
        backgroundColor: 'lightPurple',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '400',
        '::after': {
            display: 'block',
            content: '""',
            width: '0px',
            height: '10px',
            position: 'relative',
            top: '-103px',
            left: '-40px',
            padding: '0',
            border: '15px solid transparent',
            borderRight: '15px solid #E0DBFE',
        }
    },

    '.my-tp-textarea': {
        margin: '8px 0',
        padding: '10px',
        resize: 'vertical',
        lineHeight: '20px',
        fontSize: '14px',
        fontFamily: 'body',
        border: '1px solid #DFDEDE',
        borderRadius: '0',
    },

    '.tp-btn-container': {
        marginTop: '20px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    '.tp-btn': {
        width: '77px',
        height: '33px',
        cursor: 'pointer',
        padding: '3px',
        marginLeft: '15px',
        fontWeight: '400',
        '&:hover': {
            backgroundColor: 'purple2',
        },
        '&:disabled': {
            backgroundColor: 'lighterGray',
            color: 'gray',
            backgroundColor: 'lightPurple',
            color: 'white',
            cursor: 'default',
        },
    },

    // community tps

    '.communityTps-container': {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '25px 60px 25px 25px',
    },

    '.communityTps-header': {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        margin: '20px 0',
        paddingLeft: '60px',
    },

    '.sort-btn': {
        border: '1px solid #DFDEDE',
        backgroundColor: 'white',
        width: '50px',
        height: '25px',
        color: 'black',
        fontSize: '12px',
        padding: '2px',
        '&:hover': {
            backgroundColor: 'lightGray',
        },
        '&:disabled': {
            backgroundColor: '#DFDEDE',
            cursor: 'default',
        },
    },

    '.top-sort-btn': {
        borderRadius: '5px 0 0 5px'
    },

    '.new-sort-btn': {
        borderRadius: '0 5px 5px 0'
    },

    '.tp-block': {
        display: 'flex',
        minHeight: '60px',
        marginBottom: '30px',
    },

    '.tp-arrows': {
        textAlign: 'center',
        margin: '10px 10px 0 0',
        fontSize: '14px',
    },

    '.fa-layers': {
        height: '18px',
        width: '50px',
    },

    '.upvoted-arrow': {
        color: 'easyGreen',
    },
    
    '.downvoted-arrow': {
        color: 'hardRed',
    },

    '.blank-arrow': {
        color: 'lighterGray',
    },

    '.tp-interior':{
        border: '1px solid #DFDEDE',
        borderRadius: '5px',
        padding: '10px 25px 10px 10px',
        overflow: 'hidden',
        width: '100%',
        fontSize: '14px',
    },

    '.tp-header': {
        display: 'flex',
        justifyContent: 'space-between',
    },

    '.tp-options': {
        display: 'flex',
        color: 'purple',
        fontFamily: 'body',
        fontSize: '13px',
        cursor: 'pointer',
        fontWeight: '600',
    },

    '.see-feedback': {
        marginLeft: '20px',
    },

    '.tp-divider': {
        width: '20px',
        borderTop: '1px solid #DFDEDE',
        margin: '7px 0',
    },

    '.tp-preview': {
    backgroundColor: 'white',
    padding: '5px',
    fontFamily: 'Gotham-Book',
    },

    '.message-section': {
        margin: 'auto',
        width: '90%',
        height: 'auto',
        fontStyle: 'italic',
        textAlign: 'center',
        padding: '80px 0 0 0',
    },

    '.no-tps': {
        borderTop: '1px solid lightGray',
        paddingTop: '40px',
    },
};