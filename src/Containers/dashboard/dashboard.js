import React from "react";
import { connect } from 'react-redux';
import styled from "styled-components";
import { darken, placeholder } from 'polished';
import { XCircle } from 'react-feather'
import BoardItem from "./boardItem";
import Spinner from '../../components/spinner/spinner';
import { getBoardsAction, createBoardAction, deleteBoardAction, updateBoardAction } from '../../redux/actions/dashboard.action';

export const palette = {
  darkblue: `#051937`,
  blue: `#00456A`,
  grayblue: `#007789`,
  turqoise: `#00A88C`,
  green: `#7ED57B`,
  lightYellow: `#F9F871`
};

export const Button = styled.button`
  background: ${palette.green};
  color: ${palette.lightYellow};
  font-size: 18px;
  margin: 10px 5px 5px 10px;
  border: 1px solid ${palette.grayblue};
  border-radius: 10px;
  outline: none;
  width: 300px;
  height: 80px;
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Add = styled.input`
  color: #F9F871;
  outline: #F9F871;
  background: #051937;
  border-radius: 4px;
  height: 40px;
  width: 170px;
  padding: 4px;
  margin: 10px;
  border: 2px solid #F9F871;
  color: ${palette.turqoise};
  ${placeholder({
  'color': darken(0.2, palette.green)})}
`;

export const AddBlock = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid black;
  background: #051937;
  color: #F9F871;
  border-radius: 5px;
  margin: 10px 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const XBtn = styled(XCircle)`
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
    transform: scale(1.3);
    cursor: pointer;
  }
`;

const Wr = styled.div`
  flex-direction: row;
  justify-content: flex-end;
  margin: 0;
  margin-bottom: 10px;
  padding: 0;
  width: 100%;
  max-height: 50px;
`;

export const AddButton = styled(Button)`
  width: 150px;
  height: 50px;
`;

const mapStatetoProps = state => {
  return {
    isFetching: state.boardsReducer.isFetching,
    boards: state.boardsReducer.boards,
    error: state.boardsReducer.error,
    newBoard: state.boardsReducer.newBoard
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    getBoards: () => dispatch(getBoardsAction()),
    createBoard: (obj) => dispatch(createBoardAction(obj)),
    deleteBoard: (id, i) => dispatch(deleteBoardAction(id,i)),
    updateBoard: (obj, i) => dispatch(updateBoardAction(obj, i)),
  }
}

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      boards: [],
      add: false,
      disabled: true,
      newBoard: {
        boardName: ''
      },
    };
  }

  componentWillMount() {
    this.props.getBoards();
  }

  addOpen = (event) => {
    event.stopPropagation();
    this.setState({
      add: true
    })
  }

  addClose = (event) => {
    if(event) {
      event.stopPropagation();
    }
    this.setState({
      add:false
    })
  }

  handleInput = (event) => {
    this.setState({
      disabled: false,
      newBoard: {
        boardName: event.target.value
      }
    })
    if(event.target.value === '') {
      this.setState({
        disabled: true
      })
    }
  }

  onCreateBoard = () => {
    const boardName = this.state.newBoard.boardName;

    this.props.createBoard({boardName});

    this.addClose();

  }



  render() {
    if(this.props.isFetching){
      return (
        <Spinner />
      )
    } else return (
      <div style={{ transition: "all 1.5s", minHeight: '100%', minWidth: "100%"}} onClick={this.addClose}>
        <Button onClick={this.addOpen}>+ Add new Board</Button>
        <Wrapper>
          {this.props.boards.map((board, i) => (
            <BoardItem name={board.boardName} id={board.id}
              key={i} index={i}
              onDelete={this.props.deleteBoard}
              onUpdate={this.props.updateBoard}
            >
            </BoardItem>
          ))}

          {
            this.state.add ? (
              <AddBlock onClick={(event)=> event.stopPropagation()}>
                <Wr><XBtn onClick={this.addClose}/></Wr>
                <Add placeholder="Input Board Name" onChange={this.handleInput}/>

                <AddButton disabled={this.state.disabled} onClick={this.onCreateBoard}>Add Board</AddButton>
              </AddBlock>
            ) : null
          }
        </Wrapper>
      </div>
    );
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Dashboard);
