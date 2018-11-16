import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { darken } from 'polished';
import { withRouter } from 'react-router-dom';
import List from '../../components/list/list';
import { palette, Button } from '../dashboard/dashboard';
import {  getListsAction,
          updateListAction,
          deleteListAction,
          createListAction,
          createCardAction,
          updateCardAction,
          deleteCardAction
        } from '../../redux/actions/lists.action';
import { Trash2, XSquare } from 'react-feather';
import Spinner from '../../components/spinner/spinner';
import { Add } from '../dashboard/dashboard';
import { CSSTransitionGroup } from 'react-transition-group'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row ;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: center;
  align-items: flex-start;
  padding: 11px;
  padding-bottom: 40px;
  overflow-x: scroll;
  height: 90%;
`
const AddButton = styled(Button)`
  font-size: 20px;
  min-width: 250px;
  height: 60px;
  background: ${palette.blue};
  color: ${palette.green};
  border: 2px solid ${palette.lightYellow}
`;

const CreateForm = styled.div`
  background: ${palette.darkblue};
  color: ${palette.lightYellow};
  border-radius: 5px;
  box-shadow: 2px 2px 5px black;
  margin: 10px 10px;
  padding: 8px;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  align-items: stretch;
`;

const Icons = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 10px;
`;

const Row  = styled(Wrapper)`
  width: 100%;
  height: auto;
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

const ListButton = styled.button`
  font-size: 16px;
  height: 45px;
  margin-top: 8px;
  background: ${palette.green};
  color: ${palette.lightYellow};
  border: 1px solid ${palette.grayblue};
  border-radius: 10px;
  outline: none;
  &:hover {
    box-shadow: 0 0 2px ${palette.darkblue};
    outline: none;
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
    background: ${darken(0.2, palette.green)};
  }
  &:active {
    box-shadow: 0 0 4px ${palette.lightYellow};
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

const Input = styled(Add)`
  width: auto;
`;

const Cancel = styled(XSquare)`
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
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const mapStateToProps = (state) => {
  return {
    boardId: state.listsReducer.boardId,
    lists: state.listsReducer.lists,
    isFetching: state.listsReducer.isFetching,
    error: state.listsReducer.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getLists: (id) => dispatch(getListsAction(id)),
    updateList: (obj, i) => dispatch(updateListAction(obj, i)),
    createList: (id, value) => dispatch(createListAction(id, value)),
    deleteList: (id, i) => dispatch(deleteListAction(id, i)),
    createCard: (obj, listIndex) => dispatch(createCardAction(obj, listIndex)),
  }
}


class Lists extends React.Component {
  constructor() {
    super();
    this.state = {
      isCreating: false,
      disabled: true,
    }
  }

  componentWillMount() {
    const id = this.props.match.params.boardId;

    this.props.getLists(id);
  }


  toggleCreating = () => {
    this.setState({
      isCreating: !this.state.isCreating
    })
  }

  onCreateList = () => {
    const id = this.props.match.params.boardId;
    const value = this.state.inputValue;
    const obj = {
      board: id,
      listName: value
    }

    this.props.createList(obj);
    this.toggleCreating();
  }

  handleInput = (event) => {
    this.setState({
        inputValue: event.target.value,
        disabled: false,
    })

    if(event.target.value === '') {
      this.setState({
        disabled: true
      })
    }
  }

  render() {
    // if(this.props.isFetching) {
    //
    //   return <Spinner />
    //
    // } else
    return(
      <Wrapper as={CSSTransitionGroup}
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >

          {
            this.props.lists.map(
              (list, i) => (
                <List list={list} id={list.id}
                  key={i} index={i}
                  updateList={this.props.updateList}
                  deleteList={this.props.deleteList}
                  createCard={this.props.createCard}
                />
              )
            )
          }

        {
          this.state.isCreating ? (
            <CreateForm>
              <Row>
                <h5>Create New List</h5>
                <Icons>
                  <Cancel onClick={this.toggleCreating}/>
                </Icons>
              </Row>
              <Input style={{margin: 0}}
                onChange={this.handleInput}
                placeholder="The name of new List"
              />
              <ListButton
                disabled={this.state.disabled}
                onClick={this.onCreateList}
              >
                Create List
              </ListButton>
            </CreateForm>
          ) : (
            <AddButton onClick={this.toggleCreating}>
              + ADD NEW LIST
            </AddButton>
          )
        }
      </Wrapper>
        )
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lists));
