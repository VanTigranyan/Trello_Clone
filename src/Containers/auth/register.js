import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { registerAction, clearStateAction } from '../../redux/actions/auth.action';
import { placeholder,darken } from 'polished';
import { validate, checkForm } from '../../util/helper';
import Spinner from '../../components/spinner/spinner';
import { Button, Form,
        FormGroup, Label,
        Input, FormFeedback,
        Card, CardTitle, CardBody,
        Alert
      } from 'reactstrap';


const LoginButton = styled(Button)`
  &&{background: #00456A;
  color: #F9F871;
  margin: 5px;
  :hover {
    background: #00A88C;
  }
}
`

const LoginCard = styled(Card)`
  &&{min-width: 400px;
  max-width: 450px;
  margin: 30px auto;
  background: #007789;
  color: #F9F871;
  border: 2px solid #7ED57B;}
`

const Wrapper = styled.div`
  &&{display: flex;
  justify-content: center;
  align-content: space-around;
  height: 100%;}
`

const LoginInput = styled(Input)`
  &&{
    color: #F9F871;
    background: #051937;
    ${placeholder({'color': darken(0.2,'#F9F871')})}
  }
`
const FormLink = styled(Link)`
  &&{
    color: #F9F871;

    :hover {
      color: ${ darken(0.3,'#F9F871') }
    }
  }
`

const mapStatetoProps = (state) => {
  return{
    isRegistered: state.authReducer.isRegistered,
    isFetching: state.authReducer.isFetching,
    error: state.authReducer.error
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    onRegister: (data) => dispatch(registerAction(data)),
    clearState: () => dispatch(clearStateAction),
  }
}

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      emailIsValid: true,
      passwordIsValid: true,
      nameIsValid: true,
      surnameIsValid: true,
      emailErrorMessage: '',
      passwordErrorMessage: '',
      nameErrorMessage: '',
      surnameErrorMessage: '',
      formIsDirty: false,
      formIsTouched: false,
      formIsValid: false,
      formFields: {},
    }
  }

  validation = (event) => {
    const target = event.target.name;
    const stateName = target + 'ErrorMessage';
    const stateValid = target + 'IsValid';
    const res = validate(target, event.target.value);

    const formisvalid = checkForm();

    if(!res.isValid) {

      this.setState({
        formIsValid: false
      })

    } else {

      this.setState({
        formIsValid: formisvalid && res.isValid
      })

    }


    this.setState({
      [stateName]: res.message,
      [stateValid]: res.isValid,
      formIsDirty: true,
      formIsTouched:true,
    })
  }

  onFieldChange = (event) => {
    this.setState({
      formFields: {
        ...this.state.formFields,
        [event.target.name]: event.target.value
      }
    })
  }

  onFormChange = () => {
    const result = checkForm();

    this.setState({
      formIsValid: result
    })
  }

  componentWillReceiveProps(props) {

    if(props.isRegistered) {
      this.props.history.push('/login')
    }

  }

  render() {

    if(this.props.isFetching) {
      return (
        <Spinner />
      )
    } else return (
      <Wrapper>
        <LoginCard>
          <CardBody>
            <CardTitle>Register</CardTitle>

            <Form
              onSubmit={(event) => event.preventDefault()}
              onChange={this.onFormChange}
            >

              <FormGroup>
                <Label for="email">Email</Label>
                <LoginInput type="email" name="email"
                  id="email" placeholder="Input Your Email"
                  onBlur={(event) => this.validation(event)}
                  onChange={(event) => this.onFieldChange(event)}
                  valid={this.state.emailIsValid && this.state.formIsTouched}
                  invalid={!this.state.emailIsValid}
                />
                <FormFeedback tooltip>{this.state.emailErrorMessage}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="password">Password</Label>
                <LoginInput type="password" name="password"
                  id="password" placeholder="Input Your Password"
                  onBlur={(event) => this.validation(event)}
                  onChange={(event) => this.onFieldChange(event)}
                  valid={this.state.passwordIsValid && this.state.formIsTouched}
                  invalid={!this.state.passwordIsValid}
                />
                <FormFeedback tooltip>{this.state.passwordErrorMessage}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="name">Name</Label>
                <LoginInput type="text" name="name"
                  id="name" placeholder="Input Your Name"
                  onBlur={(event) => this.validation(event)}
                  onChange={(event) => this.onFieldChange(event)}
                  valid={this.state.nameIsValid && this.state.formIsTouched}
                  invalid={!this.state.nameIsValid}
                />
                <FormFeedback tooltip>{this.state.nameErrorMessage}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="surname">Surname</Label>
                <LoginInput type="text" name="surname"
                  id="surname" placeholder="Input Your Surname"
                  onBlur={(event) => this.validation(event)}
                  onChange={(event) => this.onFieldChange(event)}
                  valid={this.state.surnameIsValid && this.state.formIsTouched}
                  invalid={!this.state.surnameIsValid}
                />
                <FormFeedback tooltip>{this.state.surnameErrorMessage}</FormFeedback>
              </FormGroup>

              <h6>
                Already have an account?
                <span>
                  <FormLink to="/login" onClick={this.props.clearState}>Login Now!</FormLink>
                </span>
              </h6>

              <LoginButton
                type='submit'
                color='primary'
                disabled={!this.state.formIsValid}
                onClick={() => this.props.onRegister(this.state.formFields)}
              >
                Register
              </LoginButton>

              {this.props.error ? (
                <Alert color="danger">
                  <h4 className='alert-heading'>Something went wrong!</h4>
                  <hr/>
                  <p className="mb-0">
                    The mail used by you in form already registered!
                    If you would like to reset your password go to Restore Page!
                  </p>
                </Alert>
              ) :  null}

            </Form>
          </CardBody>
        </LoginCard>

      </Wrapper>
    )
  }
}

const connected = connect(mapStatetoProps, mapDispatchtoProps)(Register);

export default withRouter(connected);
