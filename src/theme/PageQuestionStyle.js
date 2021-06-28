export const QuestionSx = {
  display: 'flex',

  '.page-container': {
    display: 'flex',
    alignItems: 'flex-start',
    fontFamily: 'Open-Sans',
    width: '950px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px',
    marginBottom: '50px',
  },

  '.check': {
    color: 'easyGreen',
  },

  '.question-block': {
    position: 'sticky',
    top: '112px',
    height: '492px',
    overflowY: 'auto',
    width: '400px',
    marginRight: '25px',
    backgroundColor: 'white',
    paddingRight: '40px',
    paddingLeft: '40px',
    paddingTop: '60px',
    paddingBottom: '60px',
  },

  '.question-title': {
    fontSize: '20px',
    marginBottom: '15px',
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

  '.difficulty': {
    marginBottom: '15px',
  },

  '.question-description': {
    fontFamily: 'Gotham-Book',
    marginBottom: '15px',
  },

  '.display-block': {
    width: '525px',
  },

  '.tag-container': {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '15px',
  },

  '.tag': {
    fontSize: '12px',
    backgroundColor: 'orange',
    borderRadius: '4px',
    width: '107.61px',
    height: '22px',
    textAlign: 'center',
    margin: '5px',
    paddingTop: '2px',
    cursor: 'pointer',
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: 'darkOrange',
    },
  },

  '.answer-display': {
    fontSize: '12px',
    cursor: 'pointer',
    '&:hover': {
      color: 'red',
    },
  },

  '.question-button': {
    width: '33.3%',
    height: '35px',
    backgroundColor: 'lightGrey',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    fontFamily: 'Open-Sans',
    color: 'black',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'darkGrey',
    },
    '&:disabled': {
      backgroundColor: 'orange',
      cursor: 'default',
    },
  },

  '.middle-button': {
    borderRight: '1px solid black',
    borderLeft: '1px solid black',
  },

  '.orange-line': {
    width: '100%',
    height: '10px',
    backgroundColor: 'orange',
  },

  '.myTp-background': {
    width: '100%',
    height: 'auto',
    backgroundColor: 'lightGrey',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '30px',
    paddingBottom: '30px',
  },

  '.my-tp': {
    marginLeft: '50px',
    marginRight: '50px',
    marginBottom: '15px',
    paddingRight: '10px',
    paddingLeft: '10px',
    resize: 'vertical',
    lineHeight: '20px',
    fontSize: '15px',
    fontFamily: 'Open-Sans',
    border: 'none',
  },

  '.tp-submit-button': {
    height: '30px',
    width: '100px',
    backgroundColor: 'orange',
    color: 'black',
    fontFamily: 'Open-Sans',
    cursor: 'pointer',
    border: 'none',
    marginRight: '50px',
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'darkOrange',
    },
    '&:disabled': {
      backgroundColor: 'darkGrey',
      cursor: 'default',
    },
  },

  '.communityTps-background': {
    width: '100%',
    height: 'auto',
    backgroundColor: 'lightGrey',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '15px',
    paddingBottom: '15px',
  },

  '.sort-button-block': {
    display: 'flex',
    marginRight: '50px',
    marginLeft: 'auto',
    marginBottom: '15px',
  },

  '.sort-button': {
    border: '1px solid #8E8E8E',
    cursor: 'pointer',
    backgroundColor: 'white',
    width: '75px',
    color: 'black',
    fontFamily: 'Open-Sans',
    fontSize: '15px',
    height: '25px',
    lineHeight: '15px',
    '&:hover': {
      backgroundColor: 'darkGrey',
    },
    '&:disabled': {
      backgroundColor: 'orange',
      cursor: 'default',
    },
  },

  '.tp-header': {
    display: 'flex',
  },

  '.expand-collapse': {
    cursor: 'pointer',
    color: 'black',
    fontSize: '12px',
    marginRight: '0px',
    marginLeft: 'auto',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  '.see-feedback': {
    color: 'black',
    backgroundColor: 'white',
    fontStyle: 'italic',
    width: '150px',
    paddingLeft: '5px',
  },

  '.see-feedback-link': {
    color: 'black',
  },

  '.tp-preview': {
    backgroundColor: 'white',
    padding: '5px',
    fontFamily: 'Gotham-Book',
  },

  '.tp-interior':{
    overflow: 'hidden',
    width: '100%',
  },

  '.tp-block': {
    display: 'flex',
    minHeight: '60px',
    marginBottom: '30px',
    marginRight: '60px',
  },

  '.message-section': {
    width: '100%',
    height: 'auto',
    backgroundColor: 'lightGrey',
    padding: '30px',
    fontStyle: 'italic',
  },

  '.message-link': {
    color: 'darkOrange',
  },

  '.tp-arrows': {
    textAlign: 'center',
    marginTop: '20px',
  },

  '.fa-layers': {
    height: '18px',
    width: '50px',
  },

  '.upvoted-arrow': {
    color: '#00D305',
  },

  '.downvoted-arrow': {
    color: '#E44C4C',
  },

  '.blank-arrow': {
    color: 'white',
  },

  '.fa-caret-up, .fa-caret-down': {
    stroke: 'black',
    strokeWidth: '7',
    transform: 'scaleY(0.8)',
  },
};