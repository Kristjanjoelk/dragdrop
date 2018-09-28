import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import store from '../../store';
import todo from '../../control/todo';
import actions from '../../actions';
import './Login.css';
import { connect } from 'react-redux';

class Login extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(actions.setUserName(this.username.value, this.props.auth));
        // todo['setUserName'].setUserName(store, this.username.value, function(err, res) {
        //     if(!err) {
        //         console.log('setting info from callback');
        //         todo['getInfo'].getInfo(store, 'info test test');
        //     }
        // });
    };
    render() {
        return (
            <div className='login-container'>
                Hello world from login container

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input className="form-control" ref={(username) => this.username = username} placeholder="username ... " />
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.get('auth')
  });
export default connect(mapStateToProps)(Login);