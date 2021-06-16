// used in PageLogin, PageRegister, and PageOnboard

export const FormSx = {
  '.page-container': {
    position: 'relative',
    margin: '50px auto',
    padding: '30px 50px',
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

  '.form-title': {
    fontSize: '25px',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: '100',
  },

  '.form-input': {
    marginBottom: '10px',
    width: '100%',
    borderRadius: '0px',
    padding: '8px 12px',
  },

  '.form-link': {
    textDecoration: 'none',
    color: 'purple',
  },

  '.form-btn': {
    width: '100%',
    fontSize: '18px',
    fontWeight: 'normal',
    borderRadius: '0px',
    backgroundColor: 'purple',
    color: 'white',
    transition: '.5s ease',
    '&:hover': {
      backgroundColor: 'purple2',
    },
  },

  '.form-small-text': {
    marginBottom: '10px',
    fontSize: '13px',
  },

  '.auth-input-container, .auth-btn-container': {
    width: '100%',
  },

  '.auth-error': {
    textAlign: 'center',
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

  '#confirm-email-container': {
    maxWidth: '450px',
    paddingBottom: '25px',
  },

  '.confirm-email-title': {
    color: 'purple',
    fontSize: '25px',
    textAlign: 'center',
    marginBottom: '20px',
  },

  '.confirm-email-btn': {
    marginTop: '15px',
    backgroundColor: 'white',
    color: 'mediumGrey',
    fontSize: '14px',
    fontWeight: '100',
    '&:hover': {
      backgroundColor: 'white',
    },
  },

  '#onboard-btn': {
    margin: '5px 0 20px 0',
  },

  '#contact-submit-btn': {
    width: '100%',
    fontSize: '18px',
    fontWeight: 'normal',
    borderRadius: '0',
  },

  '.contact-textarea': {
    width: '100%',
    resize: 'vertical',
    lineHeight: '20px',
    borderRadius: '0',
    marginBottom: '10px',
  },

  '.contact-message': {
    marginTop: '20px',
    fontSize: '13px',
  },

  '.notif-text': {
    lineHeight: 'body',
  },
};
