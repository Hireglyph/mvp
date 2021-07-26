import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ProfileSx = {
  display: 'flex',

  '.page-container': {
    position: 'relative',
    margin: '50px',
    width: '100%',
    fontFamily: 'Open-Sans',
    display: 'flex',
    justifyContent: 'space-around',
  },

  // history block specific styles

  '.history-block': {
    width: '60%',
  },

  '.history-header': {
    width: '100%',
    height: '60px',
    backgroundColor: 'white',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },

  'h6': {
    margin: '0',
    fontSize: '18px',
  },

  '.sort-btn': {
    border: theme => `1px solid ${theme.colors.lightGray}`,
    backgroundColor: 'white',
    width: '75px',
    height: '25px',
    color: 'black',
    fontSize: '12px',
    padding: '3px',
    '&:hover': {
      backgroundColor: 'lightGray',
    },
    '&:disabled': {
      backgroundColor: 'lightGray',
      cursor: 'default',
    },
  },

  '.tp-sort-btn': {
    borderRadius: '5px 0 0 5px',
    width: '50px',
  },

  '.feedback-sort-btn': {
    borderRadius: '0 0 0 0',
    borderRight: 'none',
  },

  '.reply-sort-btn': {
    borderRadius: '0 5px 5px 0',
    width: '60px',
  },

  '.profile-page-buttons': {
    width: '33.3%',
    height: '35px',
    backgroundColor: 'lightGrey',
    border: 'none',
    fontFamily: 'Open-Sans',
    color: 'black',
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.8',
    },
    '&:disabled': {
      backgroundColor: 'orange',
      cursor: 'default',
      opacity: '1.0',
    },
  },

  '.profile-box': {
    width: '100%',
    margin: '10px 0',
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '10px',
  },

  '.profile-header': {
    display: 'flex',
    margin: '10px 20px 0 10px',
    fontSize: '16px',
  },

  '.profile-header-button': {
    marginRight: '0px',
    marginLeft: 'auto',
  },

  '.profile-box-bottom': {
    display: 'flex',
    float: 'right',
    marginRight: '20px',
    marginBottom: '5px',
  },

  '.profile-link': {
    marginLeft: '10px',
    textDecoration: 'none',
  },

  '.profile-onclick': {
    fontFamily: 'Open-Sans',
    fontSize: '14px',
    padding: '0 5px',
    textAlign: 'center',
    cursor: 'pointer',
  },

  '.profile-delete-btn': {
    cursor: 'pointer',
    color: 'hardRed',
    fontSize: '14px',
  },

  '.profile-message': {
    cursor: 'pointer',
    color: 'black',
    fontSize: '12px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  '.profile-box-content': {
    display: 'flex',
    marginTop: '5px',
    marginBottom: '5px',
    marginRight: '20px',
  },

  '.profile-box-interior': {
    backgroundColor: 'white',
    width: '100%',
    padding: '5px',
    fontFamily: 'Gotham-Book',
    overflow: 'hidden',
    fontSize: '13px',
  },

  '.format-text': {
    whiteSpace: 'pre-wrap',
  },

  '.profile-box-score': {
    textAlign: 'center',
    width: '40px',
  },

  '.positive-score': {
    color: '#27B12A',
  },

  '.negative-score': {
    color: 'red',
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

  // profile block specific styles

  '.profile-block': {
    width: '20%',
    maxWidth: '413px',
    minWidth: '350px'
  },

  '.profile-container': {
    width: '100%',
    padding: '10px',
    backgroundColor: 'white',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    padding: '30px 30px',
    display: 'flex',
    flexDirection: 'column',

  },

  '.profile-stats': {
    display: 'flex',
    margin: '10px 0',
  },

  '.profile-stat': {
    width: '50%',
  },

  '.tp-stats-header': {
    borderBottom: theme => `1px solid ${theme.colors.lightGray}`,
    width: '100%',
    padding: '5px',
    fontFamily: 'Open-Sans-SemiBold'
  },


  '.tag-stats': {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '10px 0',
  },

  '.tp-stats': {
    width: '50%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '10px 20px',
  },

  '.tp-stats-label': {
    textTransform: 'capitalize',
  },

  '.tp-stats-number': {
    backgroundColor: 'purple',
    minWidth: '35px',
    height: '25px',
    color: 'white',
    textAlign: 'center',
    borderRadius: '15px',
    padding: '1px',
    marginLeft: '15px',
    fontSize: '15px',
  },

  '.tp-stats-easy': {
    backgroundColor: 'easyGreen',
  },

  '.tp-stats-medium': {
    backgroundColor: 'medOrange',
  },

  '.tp-stats-hard': {
    backgroundColor: 'hardRed',
  },
};