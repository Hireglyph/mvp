export const ProfileSx = {
  display: 'flex',

  '.page-container': {
    position: 'relative',
    margin: '40px',
    width: '100%',
    fontFamily: 'Open-Sans',
    display: 'flex',
    flexDirection: ['column-reverse', 'column-reverse', 'column-reverse', 'row', 'row'],
    justifyContent: 'space-around',
    '@media (max-width: 450px)' : {
      marginLeft: '10px',
      marginRight: '10px',
    },
  },

  // history block specific styles

  '.history-block': {
    minWidth: ['400px', '400px', '600px', '575px', '800px'],
    maxWidth: ['400px', '400px', '600px', '575px', '800px'],
    marginTop: ['30px', '30px', '30px', '0', '0'],
    marginLeft: 'auto',
    marginRight: ['auto', 'auto', 'auto', '25px', '25px'],
    '@media (max-width: 450px)' : {
      minWidth: '350px',
      maxWidth: '350px',
    },
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
    flexDirection: ['column-reverse', 'column-reverse', 'row', 'row', 'row'],
    width: '100%',
    margin: '0',
    fontSize: '16px',
  },

  '.profile-box-title': {
    margin: '0',
    padding: '0', 
    maxWidth: ['100%', '100%', '50%', '50%', '70%'],
  },

  '.profile-btn-block': {
    display: 'flex',
    marginBottom: ['10px', '10px', '0', '0', '0'],
    fontSize: ['13px', '13px', '14px', '14px', '14px'],
  },

  '.profile-btn': {
    minWidth: 'fit-content',
    cursor: 'pointer',
    fontFamily: 'body',
    fontWeight: 'bold',
    color: 'purple',
    marginLeft: '10px',
  },

  '.profile-open-thread': {
    fontFamily: 'body',
    fontWeight: 'bold',
    margin: '0',
  },

  '.expand-collapse-btn': {
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
    backgroundColor: 'white',
    padding: '30px',
    fontStyle: 'italic',
  },

  '.message-link': {
    color: 'purple',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  // profile block specific styles

  '.profile-block': {
    //width: ['100%', '100%', '100%', '20%', '20%'],
    //maxWidth: ['none', 'none', 'none', '413px', '413px'],
    //minWidth: ['none', 'none', 'none', '350px', '350px'],

    minWidth: ['400px', '400px', '600px', '325px', '325px'],
    maxWidth: ['400px', '400px', '600px', '325px', '325px'],
    marginRight: 'auto',
    marginLeft: ['auto', 'auto', 'auto', '25px', '25px'],
    '@media (max-width: 450px)' : {
      minWidth: '350px',
      maxWidth: '350px',
    },
  },

  '.profile-container': {
    width: '100%',
    backgroundColor: 'white',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
  },

  '.tp-stats-block': {
    display: 'flex',
    flexDirection: ['column', 'column', 'row', 'column', 'column'],
  },

  '.solved-tps-block': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0',
  },

  '.solved-tps-chart-label': {
    paddingLeft: '10px',
    fontFamily: 'Open-Sans-Semibold',
    width: '100px',
  },

  '.solved-tps-chart-block': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  '.solved-tps-chart-center': {
    position: 'absolute',
    marginTop: '60px',
    minWidth: 'fit-content',
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
    fontFamily: 'Open-Sans-SemiBold',
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
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
