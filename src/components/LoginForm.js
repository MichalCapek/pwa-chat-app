import React, { Component } from 'react';
import { VERIFY_USER } from '../Events'
import GoogleLogin from 'react-google-login';

export default class LoginForm extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	nickname:"",
	  	email:"",
	  	error:""
	  };
	}

	setUser = ({user, isUser})=>{

		if(isUser){
			this.setError("User name taken")
		}else{
			this.setError("")
			this.props.setUser(user)
		}
	}

	handleGoogleResponse = (response)=>{
		this.setState({nickname:response.w3.ig}) //ig
		this.setState({email:response.w3.U3})

		//this.handleSubmit();
		const { socket } = this.props
		const { nickname } = this.state
		socket.emit(VERIFY_USER, nickname, this.setUser)
	}

	handleSubmit = (e)=>{
		e.preventDefault()
		const { socket } = this.props
		const { nickname } = this.state
		socket.emit(VERIFY_USER, nickname, this.setUser)
	}

	handleChange = (e)=>{
		this.setState({nickname:e.target.value})
	}

	setError = (error)=>{
		this.setState({error})
	}

	render() {	

		const responseGoogle = (response) => {
  			console.log(response);
  			this.handleGoogleResponse(response);
		}

		const { nickname, error } = this.state
		return (
			<div className="login">
			
			<form className="login-form-left">
			<h2>Sign in with Google</h2>
				<div className="google-button">
					<GoogleLogin
		    			clientId="941743507989-krbo2k7t028j0li6jfqb2ekp7j1nc17k.apps.googleusercontent.com"
		    			buttonText="Login"
		    			onSuccess={responseGoogle}
		    			onFailure={responseGoogle}
		  				/>
  				</div>
			</form>
				<form onSubmit={this.handleSubmit} className="login-form-right" autoComplete="off">

					<label htmlFor="nickname">
						<h2>Sign in with nickname</h2>
					</label>
					
					<input
						ref={(input)=>{ this.textInput = input }} 
						type="text"
						id="nickname"
						value={nickname}
						onChange={this.handleChange}
						placeholder={'Your nickname'}
						/>
					
						<div className="error">{error ? error:null}</div>

				</form>
			</div>
			
		);
	}
}
