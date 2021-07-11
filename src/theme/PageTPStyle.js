export const TpSx = {
    display: 'flex',
    fontSize: '14px',
  
    '.page-container': {
        position: 'relative',
        margin: 'auto',
        paddingBottom: '30px',
        width: '70%',
        minWidth: '700px',
        height: 'auto',
        background: 'white',
        fontFamily: 'Open-Sans',
    },

    '.thread-btn': {
        padding: '0',
        fontSize: '14px',
        width: '70px',
        height: '30px',
        marginRight: '10px',
        '&:disabled': {
          backgroundColor: 'purple2',
          cursor: 'default',
        },
      },
  
    '.tp-header': {
        display: 'flex',
        alignItems: 'center',
        height: '50px',
        fontSize: '18px',
        padding: '10px',
        borderBottom: '1px solid lightGray',
    },
  
    '.back-hover': {
        fontSize: '14px',
        color: 'gray',
        cursor: 'pointer',
        margin: '0 25px 0 15px',
        textAlign: 'center',
        transition: '.5s',
        '&:hover': {
            color: '#505050',
        },
    },
  
    '.tp-body': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    '.tp-content-container': {
        display: 'flex',
        width: '100%',
        paddingLeft: '20px',
    },
  
    '.tp-content': {
        backgroundColor: 'white',
        margin: '20px 80px 20px 0px',
        minHeight: '100px',
        fontFamily: 'Gotham-Book',
        overflow: 'hidden',
    },

    '.tp-content-box': {
        marginBottom: '10px',
        lineHeight: '23px',
    },
  
    '.content-label': {
        fontFamily: 'Gotham-Bold'
    },
  
    '.arrows-container': {
        width: '60px',
        position: 'relative',
        top: '10px',
    },
  
    '.centered': {
      textAlign: 'center',
    },

    '.all-feedback-container': {
        margin: '0 40px',
        padding: '30px 40px',
        borderTop: '1px solid lightGray',
    },
  
    '.input-feedback': {
        padding: '10px',
        width: '100%',
        minHeight: '100px',
        fontFamily: 'body',
        fontSize: '14px',
        lineHeight: '20px',
        border: '1px solid #DEDFDF',
        borderRadius: '0',
    },
  
    '.btn-box': {
        position: 'relative',
        top: '-10px',
        width: '100%',
        height: '40px',
        backgroundColor: 'lighterGray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    '.latex-message': {
        color: 'gray',
        marginLeft: '13px',
    },
  
    '.feedback-block': {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        minHeight: '60px',
        marginRight: '60px',
    },

    '.feedback-content-container': {
        display: 'flex',
        width: '100%',
    },  

    '.input-reply': {
        width: 'calc(100% - 30px)',
        marginLeft: '30px',
    },

    '.replies-container': {
        width: 'calc(100% - 70px)',
        margin: '0 0 10px 70px',
        borderLeft: '1px solid #DFDEDE',
    },

    '.reply-content-container': {
        marginBottom: '20px',
    },
  
    '.reply-option': {
        marginLeft: '13px',
    },
  
    '.cancel-reply': {
      color: 'red',
    },

    '.delete-reply': {
        color: 'hardRed',
    },

    '.reply-btn-box': {
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        top: '0',
        marginBottom: '10px',
    },

    '.cancel-btn': {
        backgroundColor: '#ff7373',
    },

};