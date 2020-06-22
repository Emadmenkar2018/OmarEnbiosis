import React, { Component } from 'react';
import {renderToStaticMarkup} from 'react-dom/server'
import {initialize} from 'react-localize-redux'
import {connect} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import mainTrans from '../translations/mainTrans.json'
import Main from '../components/Routes/Main'
import Sub from '../components/Routes/Sub'
import VerifyRoutes from '../components/Routes/VerifyRoutes'

class App extends Component {
  constructor(props){
    super(props);
    if(!localStorage.lang){
      localStorage.setItem('lang', 'tr');
    }
    // initialize localize props for translation
    this.props.initialize({
      languages: [
        {name: 'Turkish', code: 'tr'},
        {name: 'English', code: 'en'}
      ],
      translation: mainTrans,
      options: {
        renderToStaticMarkup, 
        renderInnerHtml: true, 
        defaultLanguage: localStorage.lang
      }
    });
    this.state = {
      loading: false
    }
  }

  // componentDidMount(){
  //   console.log('MOUNT ENTERED');
  // }

  // componentDidUpdate(){
  //   console.log('UPDATE ENTERED');
  // }

  render(){
    const {currentUser} = this.props;
    return (
      <Router>
        {!localStorage.userToken ? 
          <Main/> : 
          currentUser.isAuthenticated ? 
          currentUser.user.email_verified_at === null ? 
          <VerifyRoutes/> : 
          <Sub
            user={currentUser.user}
          /> : 
          <div className='loading'>
              <div className='loading-logo'></div>
          </div>
        }
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, {
  initialize
})(App);
