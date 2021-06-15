// used in PageLogin, PageRegister, and PageOnboard

export const LoginRegisterSx = {
  '.page-container': {
    position: 'relative',
    margin: '50px auto',
    padding: '40px 50px',
    width: ['100%', '80%','35%'],
    maxWidth: '430px',
    minWidth: ['none', '300px', '400px'],
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
    marginBottom: '20px',
    fontWeight: '100',
  },

  '.input-container, .btn-container': {
    width: '100%',
  },

  '.auth-input': {
    marginBottom: '10px',
    width: '100%',
    borderRadius: '0',
  },

  '.auth-btn': {
    width: '100%',
    fontSize: '18px',
    borderRadius: '0',
  },

  '.auth-error': {
    marginBottom: '10px',
    textAlign: 'center',
    fontSize: '14px',
    color: 'red',
  },

  '.auth-line': {
    textAlign: 'center',
    fontSize: '15px',
    margin: '20px 0',
  },

  '.auth-closing': {
    marginTop: '20px',
    textAlign: 'center',
  },

  '.auth-closing-link': {
    textDecoration: 'none',
    transition: '.5s ease',
    color: 'purple',
  },
};
