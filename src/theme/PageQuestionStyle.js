export const QuestionSx = {
    display: 'flex',

    '.page-container': {
        display: 'flex',
        alignItems: 'flex-start',
        fontFamily: 'Open-Sans',
        width: '100%',
        height: 'fit-content',
        minHeight: 'calc(100vh - 60px)',
        backgroundColor: 'white',
    },

    '.check': {
        color: 'easyGreen',
        marginLeft: '10px',
    },

    '.question-block': {
        position: 'sticky',
        top: '50px',
        overflowY: 'auto',
        flex: '1 0 200px',
        padding: '70px',
        minWidth: '400px',
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

    '.topic': {
        color: 'purple',
    },

    '.question-description': {
        fontFamily: 'Gotham-Book',
        fontSize: '14px',
        fontWeight: '400',
        marginTop: '30px',
        lineHeight: '30px',
    },

    '.answer-display': {
        fontSize: '12px',
        cursor: 'pointer',
        '&:hover': {
            color: 'red',
        },
    },

    // answer

    '.display-block': {
        flex: '2 0 400px',
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

    '.communityTps-background': {
    width: '100%',
    height: 'auto',
    backgroundColor: 'lightGrey',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '15px',
    paddingBottom: '15px',
    },

    '.sort-button-block': {
    display: 'flex',
    marginRight: '50px',
    marginLeft: 'auto',
    marginBottom: '15px',
    },

    '.sort-button': {
    border: '1px solid #8E8E8E',
    cursor: 'pointer',
    backgroundColor: 'white',
    width: '75px',
    color: 'black',
    fontFamily: 'Open-Sans',
    fontSize: '15px',
    height: '25px',
    lineHeight: '15px',
    '&:hover': {
        backgroundColor: 'darkGrey',
    },
    '&:disabled': {
        backgroundColor: 'orange',
        cursor: 'default',
    },
    },

    '.tp-header': {
    display: 'flex',
    },

    '.expand-collapse': {
    cursor: 'pointer',
    color: 'black',
    fontSize: '12px',
    marginRight: '0px',
    marginLeft: 'auto',
    '&:hover': {
        textDecoration: 'underline',
    },
    },

    '.see-feedback': {
    color: 'black',
    backgroundColor: 'white',
    fontStyle: 'italic',
    width: '150px',
    paddingLeft: '5px',
    },

    '.see-feedback-link': {
    color: 'black',
    },

    '.tp-preview': {
    backgroundColor: 'white',
    padding: '5px',
    fontFamily: 'Gotham-Book',
    },

    '.tp-interior':{
    overflow: 'hidden',
    width: '100%',
    },

    '.tp-block': {
    display: 'flex',
    minHeight: '60px',
    marginBottom: '30px',
    marginRight: '60px',
    },

    '.message-section': {
    width: '100%',
    height: 'auto',
    backgroundColor: 'lightGrey',
    padding: '30px',
    fontStyle: 'italic',
    },

    '.message-link': {
    color: 'darkOrange',
    },

    '.tp-arrows': {
    textAlign: 'center',
    marginTop: '20px',
    },

    '.fa-layers': {
    height: '18px',
    width: '50px',
    },

    '.upvoted-arrow': {
    color: '#00D305',
    },

    '.downvoted-arrow': {
    color: '#E44C4C',
    },

    '.blank-arrow': {
    color: 'white',
    },

    '.fa-caret-up, .fa-caret-down': {
    stroke: 'black',
    strokeWidth: '7',
    transform: 'scaleY(0.8)',
    },
};