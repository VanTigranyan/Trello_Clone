import React from 'react';
import styled from 'styled-components';
import { palette } from '../header/header';

const Platform = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${palette.darkblue};
  opacity: 0.8;
  transition : all 1s;
  display: ${(props) => props.show ? 'block' : 'none'}
`

const Close = styled.div`
  width: 40px;
  height: 40px;
  background: black;
  opacity: 0.5;
`
const Card = styled.div`
  width: 400px;
  height: 500px;
  padding: 10px;
  background: white;
  opacity: 1;
  border-radius: 5px;
  margin: auto;
  margin-top: 50px;
`




class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      closed: false,
    }
  }

  render() {
    return (
      <Platform show={this.props.show}>
        <Card>
          <Close onClick={this.props.toggle}/>
          {this.props.children}
        </Card>
      </Platform>
      )
  }
}

export default Modal
