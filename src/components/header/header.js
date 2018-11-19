import React from "react";
import styled from "styled-components";
import logo from "./logo.svg";
import {
  Collapse,
  Navbar as navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link, withRouter } from 'react-router-dom';

export const palette = {
  darkblue: `#051937`,
  blue: `#00456A`,
  grayblue: `#007789`,
  turqoise: `#00A88C`,
  green: `#7ED57B`,
  lightYellow: `#F9F871`
};

const NavBar = styled(navbar)`
  background: ${palette.grayblue};
  color: ${palette.lightYellow};
  height: 100%;
  display: flex;
  align-items: center;
`;

const Anchor = styled(NavLink)`
  && {
    && {
      color: ${palette.lightYellow};
      &.active{
        background: ${palette.lightYellow};
        color: ${palette.blue}
      }
      &:hover {
        background: ${palette.turqoise};
        border-radius: 5px;
      }
    }
  }
`;

const Menu = styled(DropdownMenu)`
  && {
    background: ${palette.grayblue};
  }
`;

const MenuItem = styled(DropdownItem)`
  && {
    color: ${palette.lightYellow};
    &:hover {
      background: ${palette.turqoise};
      border-radius: 5px;
    }
  }
`;

const Toggle = styled(DropdownToggle)`
  && {
    && {
      background: ${palette.grayblue};
      color: ${palette.lightYellow};
      border-radius: 5px;
      &:hover {
        background: ${palette.turqoise};

      }
    }
  }
`;

 class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    console.log(this.props)
    return (
      <div style={{minHeight: '10%'}}>
        <NavBar light expand="md">
          <NavbarBrand href="/">
            <img src={logo} alt="logo" width="73%" height="100%" />
          </NavbarBrand>
          {this.props.isLoggedIn ? (
            <React.Fragment>
              <NavbarToggler onClick={this.toggle} />
              <Collapse className='' isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  {
                    // /*<NavItem>
                    //   <Anchor href="/components/">Components</Anchor>
                    // </NavItem>
                  }
                  {
                    this.props.location.pathname !== '/dashboard' ?
                      (<NavItem>
                        <Anchor href='/dashboard'>
                          To Dashboard
                        </Anchor>
                      </NavItem>):
                      (null)
                  }

                  <UncontrolledDropdown nav inNavbar>
                    <Toggle nav caret>
                      {this.props.user.name}
                    </Toggle>
                    <Menu right>
                      <MenuItem>Profile Settings</MenuItem>
                      <DropdownItem divider />
                      <MenuItem onClick={this.props.logOut}>Exit</MenuItem>
                    </Menu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </React.Fragment>
          ) : null}
        </NavBar>
      </div>
    );
  }
}

export default withRouter(Header);
