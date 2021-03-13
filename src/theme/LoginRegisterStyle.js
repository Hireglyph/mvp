// used in PageLogin, PageRegister, and PageOnboard

export const LoginRegisterSx = {
  position: 'relative',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '50px',
  marginBottom: '50px',
  paddingTop: '30px',
  paddingBottom: '50px',
  width: '500px',
  height: 'auto',
  background: 'lightGrey',
  fontFamily: 'Open-Sans',
  border: '2px solid #000000',

  '.auth-title': {
    fontSize: '30px',
    textAlign: 'center',
    marginBottom: '30px',
  },

  '.auth-input': {
    marginRight: '60px',
    marginLeft: '60px',
    marginBottom: '10px',
    width: 'calc(100% - 120px)',
    height: '35px',
    lineHeight: '35px',
    border: '1px solid #000000',
  },

  '.auth-button': {
    marginRight: '60px',
    marginLeft: '60px',
    width: 'calc(100% - 120px)',
    height: '35px',
    lineHeight: '35px',
    border: '1px solid #000000',
    backgroundColor: 'orange',
    color: 'black',
    cursor: 'pointer',
    fontSize: '20px',
    '&:hover': {
      backgroundColor: 'darkOrange',
    },
    '&:disabled': {
      backgroundColor: 'orange',
      cursor: 'default',
    }
  },

  '.auth-error': {
    marginTop: '10px',
    textAlign: 'center',
    color: 'red',
  },

  '.auth-line': {
    textAlign: 'center',
    fontSize: '15px',
    marginTop: '20px',
    marginBottom: '20px',
  },

  '.auth-closing': {
    marginTop: '20px',
    textAlign: 'center',
  },

  '.auth-closing-link': {
    textDecoration: 'none',
    color: 'orange',
    '&:hover': {
      color: 'darkOrange',
    },
  },
};
