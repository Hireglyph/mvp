export const PopupSx = {
    fontFamily: 'Open-Sans',

    '.popup-container': {
        zIndex: '200 !important',
        position: 'absolute',
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
        maxWidth: '540px',
        minWidth: '400px',
        borderRadius: '20px',
        padding: '30px 70px 40px 70px',
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
    },

    '.popup-text': {
        fontSize: '16px',
        fontWeight: '400',
        margin: '10px 0',
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
        padding: '5px',
        marginLeft: ['0', '0', '0', '13px', '13px'],
    },

    '.popup-red-btn': {
        backgroundColor: 'white',
        color: 'red',
        border: '2px solid #ff7a7a',
    }
};