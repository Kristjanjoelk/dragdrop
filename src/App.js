import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from './components/container/Container';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Container container={this.props.container}/>
      </div>
    );
  }
}

App.propTypes = {
  container: PropTypes.object
};

const mapStateToProps = (state) => ({
  container: state.get('container')
});

export default connect(mapStateToProps)(App);
