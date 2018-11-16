import React from "react";
import styled from "styled-components";
import logo from "./logo.svg";
import {
  Collapse,
  Navbar as navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

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
      color: ${palette.lightYellow};
      &:hover {
        background: ${palette.turqoise};
        border-radius: 5px;
      }
    }
  }
`;

export default class Header extends React.Component {
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
      <div style={{height: '10%'}}>
        <NavBar light expand="md">
          <NavbarBrand href="/" style={{height: '100%', width: '36%'}}>
            <img src={logo} alt="logo" width="73%" height="100%" />
          </NavbarBrand>
          {this.props.isLoggedIn ? (
            <React.Fragment>
              <NavbarToggler onClick={this.toggle} />
              <Collapse className='' isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  {
                    /*<NavItem>
                      <Anchor href="/components/">Components</Anchor>
                    </NavItem>
                    <NavItem>
                      <Anchor href="https://github.com/reactstrap/reactstrap">
                    GitHub
                      </Anchor>
                    </NavItem>*/
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
