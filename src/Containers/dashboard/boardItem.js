import React from 'react';
import styled from 'styled-components';
import { Trash2, Edit, Save, XSquare } from 'react-feather';
import {AddBlock, Add, AddButton} from './dashboard';
import { Link } from 'react-router-dom';


const Div = styled.div`
  width: 200px;
  min-height: 100px;
  border: 1px solid black;
  background: #051937;
  color: #F9F871;
  border-radius: 5px;
  margin: 10px 15px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  transition: all 1s ease;
`;

const Wrapper = styled.div`
  &&{
    flex-direction: row;
    margin: 0;
    margin-bottom: 10px;
    padding: 0;
    border: ;
    width: auto;
    max-height: 50px;
  }
`;

const DeleteBtn = styled(Trash2)`
  border: 1px solid #00A88C;
  color: #00456A;
  border-radius: 3px;
  margin-right: 15px;
  min-width: 36px;
  min-height: 36px;
  padding: 5px;
  background: #F9F871;
  transition: all 0.5s ease;
  &:hover {
    color: #7ED57B;
    transform: scale(2);
    cursor: pointer;
  }
`;

const Href = styled(Link)`
  &&{
    padding: 5px;
    display: flex;
    color: #F9F871;
    transition: all 0.5s ease;
    &:hover {
      transition: all 0.5s ease;
      text-decoration: none;
      color: #7ED57B;
      border: 1px solid #7ED57B;
      border-radius: 5px;
      transform: scale(1.1);
    }
}
`;

export default class BoardItem extends React.Component {

  constructor() {
    super();
    this.state ={
      isEditable: false
    }
  }

  onDelete = (event) => {
    event.stopPropagation();
    this.props.onDelete(this.props.id, this.props.index);
  }

  onEdit = (event) => {
    event.stopPropagation();

    this.setState({
      isEditable : true,
      updateValue: this.props.name,
      disabled: false
    })
  }

  onEditCancel = (event) => {
    event.stopPropagation();

    this.setState({
      isEditable: false
    })
  }

  handleInput = (event) => {
    this.setState({
        updateValue: event.target.value,
        disabled: false,
    })
    if(event.target.value === '') {
      this.setState({
        disabled: true
      })
    }
  }

  onUpdate = (event) => {
    event.stopPropagation();
    this.props.onUpdate(this.props.id, this.props.index, this.state.updateValue);
  }

  render() {
    return (
        <Div>

          <Wrapper>
            <DeleteBtn size={36} onClick={this.onDelete}/>
            {
              this.state.isEditable ?
                (
                  this.state.disabled ? (
                    <React.Fragment>
                      <DeleteBtn as={XSquare} size={36}
                        onClick={this.onEditCancel}
                      />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <DeleteBtn as={Save} size={36}
                        onClick={this.onUpdate}
                      />
                      <DeleteBtn as={XSquare} size={36}
                        onClick={this.onEditCancel}
                      />
                    </React.Fragment>
                  )
                ) : (
                  <DeleteBtn as={Edit} size={36}
                    onClick={this.onEdit}
                  />
                )
            }
          </Wrapper>

          {
            this.state.isEditable ? (
              <Add style={{margin: 0}} value={this.state.updateValue}
                onChange={this.handleInput}
              />
            ) : (
              <Href to={`/board/${this.props.id}`}>
                <h5>
                  {this.props.name}
                </h5>
              </Href>
            )
          }


          </Div>
    )
  }
}
