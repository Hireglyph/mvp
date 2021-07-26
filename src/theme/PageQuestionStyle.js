export const QuestionSx = {
    '.page-container': {
        display: 'flex',
        alignItems: 'flex-start',
        fontFamily: 'Open-Sans',
        width: '100%',
        minWidth: '950px',
        height: 'fit-content',
        minHeight: theme => `${theme.sizes.withoutHeader}`,
        backgroundColor: 'white',
        '@media (max-width: 450px)': {
            minWidth: '450px',
            flexDirection: 'column',
            display: 'inline-block',
        },
    },

    '.tp-intro': {
        display: 'flex',
        '@media (max-width: 1125px)': {
            flexDirection: 'column',
        },
    },

    '#no-scroll': {
        overflowY: 'hidden',
        minHeight: theme => `${theme.sizes.withoutHeader}`,
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
        top: '20px',
        position: 'sticky',
        flex: '1 0 200px',
        padding: '70px',
        paddingBottom: '40px',
        minWidth: '425px',
        maxWidth: '425px',
        height: 'calc(100vh - 100px)',
        overflowY: 'scroll',
        minHeight: theme => `${theme.sizes.withoutHeader}`,
        '@media (max-width: 1025px)': {
            minWidth: '350px',
            maxWidth: '350px',
        },
        '@media (max-width: 450px)': {
            minWidth: '400px',
            maxWidth: '400px',
            maxHeight: '60vh',
            minHeight: '60vh',
            paddingRight: '0px',
            position: 'relative',
            marginBottom: '10px',
        }
    },

    '.question-title': {
        fontSize: '18px',
        marginBottom: '10px',
    },

    '.tag-container': {
        display: 'flex',
        flexWrap: 'wrap',
        paddingBottom: '15px',
        borderBottom: theme => `1px solid ${theme.colors.lightGray}`,
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
        width: 'calc(100% - 425px)',
        height: 'fit-content',
        minHeight: theme => `${theme.sizes.withoutHeader}`,
        borderLeft: theme => `2px solid ${theme.colors.lightGray}`,
        '@media (max-width: 1025px)': {
            width: 'calc(100% - 350px)',
        },
        '@media (max-width: 450px)': {
            minWidth: '400px',
            maxWidth: '400px',
            padding: '0',
            position: 'relative',
        }
    },

    '.question-btn-container': {
        width: '100%',
        backgroundColor: 'background',
        display: 'flex',
        alignItems: 'flex-end',
        '@media (max-width: 450px)': {
            marginLeft: '20px',
        }
    },

    '.question-btn': {
        width: '200px',
        height: '35px',
        backgroundColor: 'background',
        borderRadius: '0',
        borderRight: theme => `1px solid ${theme.colors.lightGray}`,
        borderBottom: theme => `1px solid ${theme.colors.lightGray}`,
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
        '@media (max-width: 450px)': {
            height: '55px',
        },
    },

    '.question-border': {
        flex: '2 0 auto',
        borderBottom: theme => `1px solid ${theme.colors.lightGray}`,
    },

    '.myTp-container': {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '30px 50px',
        '@media (max-width: 450px)': {
            padding: '0',
            marginLeft: '20px',
            marginTop: '20px',
        },
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
            borderRight: theme => `15px solid ${theme.colors.lightPurple}`,
        }
    },

    '.my-tp-textarea': {
        margin: '8px 0',
        padding: '10px',
        resize: 'vertical',
        lineHeight: '20px',
        fontSize: '14px',
        fontFamily: 'body',
        border: theme => `1px solid ${theme.colors.lightGray}`,
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
        '@media (max-width: 450px)': {
            minWidth: '400px',
            maxWidth: '400px',
            padding: '0',
            paddingTop: '20px',
            paddingLeft: '10px',
        },
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
        border: theme => `1px solid ${theme.colors.lightGray}`,
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
            backgroundColor: 'lightGray',
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

    '.see-feedback': {
        marginLeft: '20px',
    },

    '.related-quest-container': {
        padding: '40px 50px',
        display: 'flex',
        flexWrap: 'wrap',
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
        borderTop: theme => `1px solid ${theme.colors.lightGray}`,
        paddingTop: '40px',
    },
};