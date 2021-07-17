export const PopupSx = {
    fontFamily: 'Open-Sans',

    '.popup-container': {
        zIndex: '200 !important',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    '.popup-box': {
        backgroundColor: 'white',
        width: '50%',
        maxWidth: '600px',
        minWidth: '400px',
        borderRadius: '20px',
        padding: '30px 60px 40px 60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    '.popup-x-icon': {
        position: 'relative',
        top: '-10px',
        left: '40px',
        alignSelf: 'flex-end',
        margin: '5px 0',
        fontSize: '20px',
        color: 'gray',
        cursor: 'pointer',
    },
    '.popup-title': {
        width: '100%',
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: '700 !important',
        fontFamily: 'Open-Sans-Bold',
    },
    '.popup-text': {
        fontSize: '16px',
        fontWeight: '400',
        margin: '10px 0',
    },
    '.popup-text-center': {
        fontSize: '16px',
        fontWeight: '400',
        margin: '10px auto',
    },
    '.popup-bold': {
        fontWeight: '700',
    },
    '.popup-btn-container': {
        width: '100%',
        display: 'flex',
        justifyContent: ['space-between', 'space-between', 'space-between', 'flex-end', 'flex-end'],
        margin: '15px 0 5px 0',
    },
    '.popup-btn': {
        width: '100px',
        height: '35px',
        padding: '3px',
        marginLeft: ['0', '0', '0', '13px', '13px'],
    },
    '.popup-red-btn': {
        backgroundColor: 'white',
        color: 'red',
        border: theme => `2px solid ${theme.colors.brightRed}`,
    }
};

export const BoxQuestSx = {
    // hot quest specific styles
    '.hot-quest-container': {
        display: 'flex',
        flexWrap: 'wrap',
    },
    '.hot-quest-box': {
        width: ['50%', '50%', '45%', '23%', '300px'],
        maxWidth: '300px',
        minWidth: '200px',
        height: '130px',
        margin: '15px 15px 0 0',
    },
    
    // related quest specific styles
    '.related-quest-box': {
        width: ['250px', '250px', '200px', '220px', '250px'],
        height: '130px',
        margin: '10px',
    },
    '.related-quest-box-link': {
        border: '1px solid #DFDEDE',
    },

    // shared styles
    '.box-quest-box-link': {
        width: '100%',
        height: '100%',
        fontSize: '16px',
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
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
        transition: '.5s',
        '&:hover': {
            backgroundColor: 'lightPurpleGray',
        }
    },
    '.box-quest-tags': {
        width: '100%',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '13px',
    },
    '.box-quests-dropdown': {
        margin: '-13px 0 0 10px',
        padding: '0px 10px 2px 10px',
    },
    '.box-quest-icon-box': {
        display: 'flex',
    },
    '.box-quest-diff': {
        width: '13px',
        height: '13px',
        padding: '0',
        borderRadius: '50px',
        margin: '1px 0 0 12px',
    },
};

export const QuestDisplaySx = {
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
        minWidth: 'fit-content',
        textAlign: 'center',
        marginRight: '5px',
        padding: '1px 5px',
    },
    '.topic-tag': {
        color: 'purple',
        backgroundColor: 'white',
        border: '1px solid #5A3FFF',
        minWidth: 'fit-content',
    },
    '.tag-btn:hover': {
        cursor: 'pointer',
    },
    '.dropdown': {
        position: 'absolute',
        borderRadius: '5px',
        backgroundColor: 'lightPurpleGray',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    '.dropdown-tag': {
        marginBottom: '8px',
    },
};

export const ScoreArrowsSx = {
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
        color: 'lightGray',
    },
}

export const ThreadBoxSx = {
    fontSize: '14px',

    '.thread-box-interior':{
        border: '1px solid #DFDEDE',
        borderRadius: '5px',
        padding: '10px 25px 10px 10px',
        overflow: 'hidden',
        width: '100%',
        fontSize: '14px',
        fontFamily: 'body',
    },

    '.thread-box-header': {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '14px',
    },

    '.thread-box-options': {
        display: 'flex',
        color: 'purple',
        fontFamily: 'body',
        fontSize: '13px',
        cursor: 'pointer',
        fontWeight: '600',
    },

    '.thread-box-divider': {
        width: '20px',
        borderTop: '1px solid #DFDEDE',
        margin: '7px 0',
    },

    '.thread-box-preview': {
        padding: '5px',
    },
}