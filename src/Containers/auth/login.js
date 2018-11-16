import React from "react";
import styled from "styled-components";
import { withRouter, Redirect, Link } from "react-router-dom";
import { loginAction, clearStateAction } from "../../redux/actions/auth.action";
import { getBoardsAction } from '../../redux/actions/dashboard.action';
import { connect } from "react-redux";
import { placeholder, darken } from "polished";
import { validate, checkForm } from "../../util/helper";
import Spinner from "../../components/spinner/spinner";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Card,
  CardTitle,
  CardBody,
  Alert
} from "reactstrap";

const LoginButton = styled(Button)`
  && {
    background: #00456a;
    color: #f9f871;
    margin: 5px;
    :hover {
      background: #00a88c;
    }
  }
`;

const LoginCard = styled(Card)`
  && {
    min-width: 400px;
    max-width: 450px;
    margin: 100px auto;
    background: #007789;
    color: #f9f871;
    border: 2px solid #7ed57b;
  }
`;

const Wrapper = styled.div`
  && {
    display: flex;
    justify-content: center;
    align-content: space-around;
    height: 100%;
  }
`;

const LoginInput = styled(Input)`
  && {
    color: #f9f871;
    background: #051937;
    ${placeholder({
      color: darken(0.2, "#F9F871")
    })};
  }
`;

const FormLink = styled(Link)`
  && {
    color: #f9f871;

    :hover {
      color: ${darken(0.3, "#F9F871")};
    }
  }
`;

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    isLoggedIn: state.authReducer.isLoggedIn,
    isFetching: state.authReducer.isFetching,
    error: state.authReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestLogin: obj => dispatch(loginAction(obj)),
    clearState: () => dispatch(clearStateAction),
    getBoards: () => dispatch(getBoardsAction),
  };
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailIsValid: true,
      passwordIsValid: true,
      emailErrorMessage: "",
      passwordErrorMessage: "",
      formIsDirty: false,
      formIsTouched: false,
      formIsValid: false,
      formFields: {
        email: "",
        password: ""
      }
    };
  }

  validation = event => {
    const target = event.target.name;
    const stateName = target + "ErrorMessage";
    const stateValid = target + "IsValid";
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
      formIsTouched: true,
    });



  };

  onFieldChange = event => {
    this.setState({
      formFields: {
        ...this.state.formFields,
        [event.target.name]: event.target.value
      }
    });
  };

  onFormChange = () => {
    const result = checkForm();

    this.setState({
      formIsValid: result
    })
  }

  onLoginRequest = () => {
    this.props.requestLogin({
      email: this.state.formFields.email,
      password: this.state.formFields.password
    });
    this.props.getBoards();
  };

  componentWillMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(props) {
    if (props.isLoggedIn) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    if (this.props.isFetching) {
      return <Spinner />;
    } else
      return (
        <Wrapper>
          <LoginCard>
            <CardBody>
              <CardTitle>LOGIN</CardTitle>
              <Form
                onSubmit={event => event.preventDefault()}
                onChange={this.onFormChange}
              >
                <FormGroup>
                  <Label for="email">Email</Label>
                  <LoginInput
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Input Your Email"
                    onChange={event => this.onFieldChange(event)}
                    onBlur={event => this.validation(event)}
                    valid={this.state.emailIsValid && this.state.formIsTouched}
                    invalid={!this.state.emailIsValid}
                  />
                  <FormFeedback tooltip>
                    {this.state.emailErrorMessage}
                  </FormFeedback>
                </FormGroup>

                <FormGroup>
                  <Label for="password">Password</Label>
                  <LoginInput
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Input Your Password"
                    onChange={event => this.onFieldChange(event)}
                    onBlur={event => this.validation(event)}
                    valid={
                      this.state.passwordIsValid && this.state.formIsTouched
                    }
                    invalid={!this.state.passwordIsValid}
                  />
                  <FormFeedback tooltip>
                    {this.state.passwordErrorMessage}
                  </FormFeedback>
                </FormGroup>

                <h6>
                  Don't have an account yet?
                  <span>
                    <FormLink to="/register" onClick={this.props.clearState}>
                      Register Now!
                    </FormLink>
                  </span>
                </h6>

                <LoginButton
                  type="submit"
                  color="primary"
                  disabled={!this.state.formIsValid}
                  onClick={this.onLoginRequest}
                >
                  Login
                </LoginButton>

                {this.props.error ? (
                  <Alert color="danger">
                    <h4 className="alert-heading">Something went wrong!</h4>
                    <hr />
                    <p className="mb-0">
                      You entered wrong credentials! Check them and try again!
                    </p>
                  </Alert>
                ) : null}
              </Form>
            </CardBody>
          </LoginCard>
        </Wrapper>
      );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
