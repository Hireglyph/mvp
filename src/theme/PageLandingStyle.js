export const PageLandingSx = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    fontFamily: 'Open-Sans',
    lineHeight: '30px',

    '.title': {
        marginRight: '30px',
        fontFamily: 'Open-Sans-Bold',
        color: 'black',
        fontSize: '35px',
        marginBottom: '30px',
        '@media(max-width: 475px)': {
            fontSize: '20px',
            lineHeight: '20px',
        },
    },

    '.main-box': {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '80px',
        justifyContent: 'center',
    },

    '.aesthetic': {
        background: theme => `linear-gradient(to bottom left, transparent 0%, transparent 50%, ${theme.colors.lightPurpleGray} 50%, ${theme.colors.lightPurpleGray} 100%)`,
        height: '120px',

        '@media(max-width: 720px)': {
            height: '100px',
        },
    },

    '.purple-background': {
        backgroundColor: 'lightPurpleGray',
    },

    '.main-image': {
        margin: '30px 0 0 60px',
        height: '350px',
        '@media(max-width: 1300px)': {
            height: '250px',
        },
        '@media(max-width: 1050px)': {
            margin: '60px 60px 0 60px',
        },
        '@media(max-width: 475px)': {
            height: '150px',
        },
    },

    '.main-text': {
        width: '600px',
        margin: '20px 0 0 60px',
        '@media(max-width: 1200px)': {
            width: '400px',
        },
        '@media(max-width: 1050px)': {
            marginTop: '20px',
            marginLeft: '60px',
        },
        '@media(min-width: 721px) and (max-width: 1050px)': {
            width: '600px',
        },
        '@media(max-width: 720px)': {
            width: '380px',
        },
    },

    '.join-btn': {
        width: '220px',
        fontSize: '18px',
        fontWeight: 'bold',
        marginTop: '20px',
        '@media(max-width: 475px)': {
            width: '120px',
            height: '40px',
            padding: '6px',
            fontSize: '14px',
        },
    },

    '.sub-title': {
        fontFamily: 'Gotham-Book',
        fontSize: '18px',
        marginRight: '30px',
        '@media(max-width: 1200px)': {
        fontSize: '14px',
        lineHeight: '20px',
        },
        '@media(max-width: 1050px)': {
        fontSize: '18px',
        },
        '@media(max-width: 475px)': {
        fontSize: '14px',
        },
    },

    '.bold': {
        fontFamily: 'Gotham-SemiBold',
    },

    '.mailing-list-section': {
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        '@media(max-width: 1000px)': {
            flexDirection: 'column',
        },
    },

    '.join-mailing': {
        margin: '30px 0',
        fontSize: '28px',
        fontFamily: 'Open-Sans-Bold',
        '@media(max-width: 1200px)': {
            marginTop: '10px',
            fontSize: '20px',
        },
        '@media(max-width: 1050px)': {
            marginTop: '20px',
            fontSize: '22px',
        },
        '@media(max-width: 475px)': {
            fontSize: '20px',
        },
    },

    '.mailing-li': {
        margin: '15px 0 0 60px',
        marginRight: '30px',
        fontFamily: 'Gotham-Book',
        fontSize: '18px',
        '@media(max-width: 1200px)': {
            marginTop: '10px',
            fontSize: '14px',
            lineHeight: '20px',
        },
        '@media(max-width: 1050px)': {
            lineHeight: '30px',
            marginTop: '15px',
            fontSize: '18px',
            width: '400px',
        },
        '@media(max-width: 720px)': {
            width: '350px',
        },
        '@media(max-width: 475px)': {
            lineHeight: '20px',
            fontSize: '14px',
        },
    },

    '.logo-box': {
        margin: '20px 50px 40px 50px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    '.logo-banner': {
        '@media(min-width: 1051px)': {
            paddingTop: '40px',
        },
    },

    '.logo-text': {
        padding: '20px',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '22px',
    },

    '.logo': {
        marginBottom: '40px',
        marginLeft: '20px',
        marginRight: '20px',
        height: '90px',
        '@media(max-width: 1200px)': {
        height: '60px',
        },
        '@media(max-width: 475px)': {
        height: '35px',
        },
    },

    '.explain-banner': {
        backgroundColor: '#2F2E2E',
    },

    '.explain-text': {
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'Open-Sans-SemiBold',
        fontSize: '28px',
        color: 'white',
        padding: '30px',
    },

    '.image-box': {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: '50px',
        marginRight: '50px',
        justifyContent: 'center',
    },

    '.icon': {
        marginBottom: '20px',
        marginLeft: '100px',
        marginRight: '100px',
        height: '150px',
        alignSelf: 'center',
        '@media(max-width: 1200px)': {
            height: '100px',
        },
        '@media(max-width: 475px)': {
            height: '75px',
        },
    },

    '.icon-text': {
        width: '250px',
        margin: 'auto',
        textAlign: 'center',
        fontFamily: 'Open-Sans-SemiBold',
        fontSize: '20px',
        marginBottom: '30px',
    },

    '.center': {
        textAlign: 'center'
    },

    '.email-input': {
        width: '300px',
        height: '40px',
        border: '1px solid rgba(0, 0, 0, 0.5)',
        borderRadius: '5px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        paddingLeft: '8px',
        fontSize: '18px',
        '@media(max-width: 1200px)': {
        width: '200px',
        },
        '@media(min-width: 721px) and (max-width: 1050px)': {
        width: '300px',
        },
        '@media(max-width: 475px)': {
        width: '150px',
        fontSize: '14px',
        },
    },

    '.subscribe-button': {
        fontWeight: 'bold',
        fontSize: '18px',
        marginLeft: '15px',
        width: '138px',
        '@media(max-width: 475px)': {
            width: '120px',
            height: '40px',
            padding: '6px',
            fontSize: '14px',
        },
    },

    '.disabled': {
        backgroundColor: 'gray',
    },

    '.worry-message': {
        fontFamily: 'Gotham-LightItalic',
        marginTop: '15px',
        '@media(max-width: 475px)': {
            fontSize: '12px',
        },
    },
};
