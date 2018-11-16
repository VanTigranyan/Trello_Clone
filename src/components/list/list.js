import React from "react";
import styled from "styled-components";
import { placeholder, darken } from 'polished';
import { withRouter } from "react-router-dom";
import { palette, Button } from "../../Containers/dashboard/dashboard";
import Card from './card';
import { Trash2, Edit, Save, XCircle, XSquare, PlusSquare } from 'react-feather';
import { Add } from '../../Containers/dashboard/dashboard';
import { CSSTransitionGroup } from 'react-transition-group';

const Wrapper = styled.div`
  background: ${palette.darkblue};
  color: ${palette.lightYellow};
  border-radius: 5px;
  box-shadow: 2px 2px 5px black;
  margin: 10px 10px;
  padding: 5px;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  align-items: stretch;
`;

const CardWrapper = styled.div`
  width: auto;
  height: auto;
  background: ${palette.grayblue};
  color: ${palette.green};
  margin: 5px;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  flex-flow: column nowrap;
`;

const ContWrapper = styled(CardWrapper)`
  width: auto;
  margin: 0;
  height: auto;
  background: ${palette.blue};
  color: ${palette.lightYellow};
`;

const Row  = styled(Wrapper)`
  width: 100%;
  height: auto;
  min-width: auto;
  background: transparent;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  border: 0;
  box-shadow: none;
  padding: 5px;
  margin: 0 5px;
`;

const Icons = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: flex-end;
`;

const ListButton = styled(Button)`
  font-size: 16px;
  width: auto;
  height: 45px;
`;

const Wr = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;


const CardInput = styled.input`
  border: 2px solid ${palette.lightYellow};
  color: ${palette.turqoise};
  border-radius: 5px;
  height: 40px;
  margin: 5px;
  background: ${palette.darkblue};
  padding: 4px;
  height: ${(props) => props.height};
  ${placeholder({
    'color': palette.grayblue
    })}
`;


const DeleteBtn = styled(Trash2)`
  border: 1px solid #00A88C;
  display: inline-block;
  color: #00456A;
  border-radius: 3px;
  margin-right: 5px;
  min-width: 36px;
  min-height: 36px;
  padding: 5px;
  background: #F9F871;
  transition: all 0.5s ease;
  &:hover {
    color: #7ED57B;
    transform: scale(1.3);
    cursor: pointer;
  }
`;

const CardButton = styled.button`
  font-size: 16px;
  height: 45px;
  margin-top: 8px;
  background: ${palette.grayblue};
  color: ${palette.lightYellow};
  border: 1px solid ${palette.darkblue};
  border-radius: 10px;
  outline: none;
  &:hover {
    box-shadow: 0 0 2px ${palette.lightYellow};
    outline: none;
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    background: ${darken(0.2, palette.grayblue)};
  }
  &:active {
    box-shadow: inset 0px 0px 30px 2px ${palette.lightYellow};
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
      isCardCreating: false,
      carddisabled: true,
      participants: [],
      cardName: '',
      cardDesc: '',
      particip: '',
    };
  }

  onEdit = () => {
    this.setState({
      isEditable : true,
      updateValue: this.props.list.listName,
      disabled: false,

    })
  }

  onEditCancel = () => {
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

  onCreateChange = (event) => {

    this.setState({
      [event.target.name]: event.target.value,
      carddisabled: false,
    })

    if(event.target.value === '') {
      this.setState({
        carddisabled: true
      })
    }

    if(this.state.cardName.length <= 0) {
      this.setState({
        carddisabled: true
      })
    }
  }

  onPartAdd = (event) => {
    let person = this.state.particip;
    if(person.trim().length !== 0) {
      this.setState({
        participants: [...this.state.participants, person]
      })
      let el = document.querySelector('input[name="particip"]');
      el.value = null;
    }

  }

  onCardCreate = () => {
    let obj = {
      cardName: this.state.cardName,
      list: this.props.id,
      description: this.state.cardDesc,
      participants: this.state.participants
    }
    let i = this.props.index;

    this.props.createCard(obj, i);

    this.toggleCreating();
  }

  onListUpdate = () => {
    let obj = {
      listId: this.props.id,
      listParams: {
        listName: this.state.updateValue
      }
    }
console.log('args----', obj)
    let i = this.props.index;

    this.props.updateList(obj, i);
    this.onEditCancel();
  }

  onDeleteList = () => {
    let i = this.props.index;
    let id = this.props.id;
    this.props.deleteList(id, i);
  }

  toggleCreating = () => {
    this.setState({
      isCardCreating: !this.state.isCardCreating
    })
  }

  render() {
    return (
      <Wrapper>
        <Row>
          {
            this.state.isEditable ? (
              <Add key={1} style={{margin: 0}} value={this.state.updateValue}
                onChange={this.handleInput}
              />
            ) : (
              <h4 key={2}>{this.props.list.listName}</h4>
            )
          }
          <Icons>

            {
              this.state.isEditable ?
                <DeleteBtn as={ Save }
                  onClick={this.onListUpdate}
                /> : <DeleteBtn onClick={this.onDeleteList}/>
            }
            {
              this.state.isEditable ?
                <DeleteBtn as={ XCircle } onClick={this.onEditCancel}/> : <DeleteBtn as={Edit} onClick={this.onEdit}/>
            }

          </Icons>
        </Row>
        {
          this.state.isCardCreating ? (
            <CardWrapper as={CSSTransitionGroup}
              transitionName="example"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
              key={1}
            >
              <Row>
                <h5>Create Card</h5>
                <DeleteBtn as={XSquare} onClick={this.toggleCreating}/>
              </Row>
              <CardInput
                placeholder='The name of the Card'
                name='cardName'
                onChange={this.onCreateChange}
              />
              <ContWrapper>
                <CardInput as='textarea'
                  placeholder='Input Description'
                  height='75px'
                  onChange={this.onCreateChange}
                  name='cardDesc'
                />
                {
                  this.state.participants.map((part, i) => {
                    return <p key={i}>{part}</p>
                  })
                }
                <Wr style={{position: 'relative'}}>
                  <CardInput
                    placeholder='Input Participants'
                    onChange={this.onCreateChange}
                    name='particip'
                  />
                  <DeleteBtn as={PlusSquare}  size={24} style={{
                    position: "relative",
                    top: "10px",
                    right: "39px",
                    'minHeight': '30px',
                    'minWidth': '30px'
                  }}
                    onClick={this.onPartAdd}
                  />
                </Wr>
                <CardButton onClick={this.onCardCreate} disabled={this.state.carddisabled}>Create Card</CardButton>
              </ContWrapper>
            </CardWrapper>
          ) : (
            <ListButton onClick={this.toggleCreating}>+ Add new Card</ListButton>
          )
        }
        <div style={{overflowY: 'scroll', maxHeight: '410px'}}>
          {
            this.props.list.cards.map((card, i) =>  (

              <Card
                card={card}
                key={i}
                index={i}
                listIndex={this.props.index}
              />

            ))
          }
        </div>
      </Wrapper>
    );
  }
}
