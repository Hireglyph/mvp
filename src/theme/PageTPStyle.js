export const TpSx = {
    display: 'flex',
    fontSize: '14px',
  
    '.page-container': {
        position: 'relative',
        margin: 'auto',
        paddingBottom: '30px',
        //width: '70%',
        //minWidth: '700px',
        width: ['300px', '375px', '640px', '800px', '800px'],
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
        '@media(max-width: 1025px)': {
            fontSize: '15px',
        },
        '@media(max-width: 640px)': {
            fontSize: '13px',
        },
    },

    '.tp-title': {
        display: 'flex',
        '@media(max-width: 640px)': {
            flexDirection: 'column',
        },
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
        marginTop: '20px',
    },

    '.tp-content-container': {
        display: 'flex',
        width: '100%',
        paddingLeft: '20px',
    },
  
    '.tp-content': {
        backgroundColor: 'white',
        margin: '0 80px 20px 0px',
        minHeight: '100px',
        fontFamily: 'Gotham-Book',
        overflow: 'hidden',
        '@media (max-width: 640px)': {
            marginRight: '30px',
        }
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
        top: '-10px',
    },
  
    '.centered': {
      textAlign: 'center',
    },

    '.all-feedback-container': {
        marginLeft: '25px',
        marginRight: '30px',
        paddingTop: '30px',
        borderTop: '1px solid lightGray',
        '@media (max-width: 640px)': {
            marginRight: '30px',
            marginLeft: '25px',
            paddingRight: '0px',
        },
    },
  
    '.input-feedback': {
        padding: '10px',
        width: 'calc(100% - 60px)',
        minHeight: '100px',
        fontFamily: 'body',
        fontSize: '14px',
        lineHeight: '20px',
        border: '1px solid #DEDFDF',
        borderRadius: '0',
        marginLeft: '55px',
    },
  
    '.btn-box': {
        position: 'relative',
        top: '-10px',
        width: 'calc(100% - 60px)',
        height: '40px',
        backgroundColor: 'lightGray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: '55px',
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
        display: 'flex',
    },
  
    '.cancel-reply': {
      color: 'red',
    },

    '.delete-reply': {
        color: 'hardRed',
        display: 'flex',
    },

    '.delete-tp-btn': {
        marginLeft: 'auto',
        marginRight: '40px',
        color: 'hardRed',
        display: 'flex',
        '&:hover': {
            cursor: 'pointer',
        },
    },

    '.vanish': {
        //backgroundColor: 'red',
        '@media (max-width: 1025px)': {
            display: 'none',
        }
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