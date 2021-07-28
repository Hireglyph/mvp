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
    borderLeft: 'none',
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
    padding: '20px',
    display: 'flex',
  },

  '.profile-box-right': {
    width: '100%',
  },

  '.profile-header': {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    margin: '0',
    fontSize: '16px',
  },

  '.profile-box-title': {
    margin: '0',
    padding: '0'
  },

  '.profile-box-bottom': {
    display: 'flex',
    margin: '0 10px',
  },

  '.profile-btn': {
    minWidth: 'fit-content',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: 'body',
    fontWeight: 'bold',
    color: 'purple',
  },

  '.profile-open-thread': {
    margin: '0 10px',
    fontSize: '14px',
    fontFamily: 'body',
    fontWeight: 'bold',
  },

  '.profile-message': {
    minWidth: '80px',
    margin: '0',
  },

  '.profile-delete-btn': {
    color: 'hardRed',
  },

  '.moment-posted': {
    fontSize: '14px',
    color: 'gray',
  },

  '.profile-box-content': {
    display: 'flex',
    margin: '10px 0 5px 0',
  },

  '.profile-box-interior': {
    backgroundColor: 'white',
    width: '100%',
    fontFamily: 'Gotham-Book',
    overflow: 'hidden',
    fontSize: '13px',
  },

  '.format-text': {
    whiteSpace: 'pre-wrap',
  },

  '.profile-box-score': {
    width: '20px',
    margin: '20px 10px 0 5px',
    color: 'purple',
  },

  '.positive-score': {
    color: 'easyGreen',
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
    fontSize: '14px',
    textAlign: 'right',
  },

  '.tp-stats-number': {
    backgroundColor: 'purple',
    minWidth: '28px',
    height: '22px',
    color: 'white',
    textAlign: 'center',
    borderRadius: '15px',
    padding: '2px',
    marginLeft: '15px',
    fontSize: '13px',
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