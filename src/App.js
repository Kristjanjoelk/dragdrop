import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from './components/container/Container';
import Login from './components/login/Login';

class App extends Component {
  constructor(props) {
    super(props);

    console.log('asddf:', props.auth);
  }


  render() {
    return (
      <div className='App'>
        { this.props.auth.option.isLoggedIn && 
          <Container 
            auth={this.props.auth} 
            info={this.props.info}
            game={this.props.game}
          /> 
        }
        { !this.props.auth.option.isLoggedIn && <Login/> }
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.get('auth'),
  info: state.get('info'),
  game: state.get('game')
});

export default connect(mapStateToProps)(App);
