// used in PageLogin, PageRegister, and PageOnboard

export const LoginRegisterSx = {
  '.page-container': {
    margin: '50px auto',
    padding: '40px 50px',
    width: ['80%','35%'],
    maxWidth: ['450px'],
    minWidth: ['300px', '400px'],
    height: 'auto',
    background: 'white',
    fontFamily: 'Open-Sans',
    boxShadow: '0px 0px 4px 0px rgba(128, 128, 128, 0.322)',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  '.auth-title': {
    fontSize: '25px',
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: '100',
  },

  '.input-container, .btn-container': {
    width: '100%',
  },

  '.auth-input': {
    marginBottom: '10px',
    width: '100%',
  },

  '.auth-button': {
    width: '100%',
    fontFamily: 'Open-Sans',
    fontSize: '18px',
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
