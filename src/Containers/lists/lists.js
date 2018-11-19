import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { darken } from "polished";
import { withRouter } from "react-router-dom";
import List from "../../components/list/list";
import { palette, Button } from "../dashboard/dashboard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  getListsAction,
  updateListAction,
  deleteListAction,
  createListAction,
  createCardAction,
  updateCardAction,
  deleteCardAction,
  reorderListAction,
} from "../../redux/actions/lists.action";
import { updateBoardAction } from "../../redux/actions/dashboard.action";
import { XSquare } from "react-feather";
import Spinner from "../../components/spinner/spinner";
import { Add } from "../dashboard/dashboard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: center;
  align-items: flex-start;
  padding: 11px;
  overflow-x: scroll;
  height: 90%;
  ${({isDraggingOver}) => isDraggingOver &&`
    background: linear-gradient(to right top, #6d327c, #485DA6, #00a1ba, #00BF98, #36C486);
  `}
`;
const AddButton = styled(Button)`
  font-size: 20px;
  min-width: 250px;
  height: 60px;
  background: ${palette.blue};
  color: ${palette.green};
  border: 2px solid ${palette.lightYellow};
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

const Row = styled(Wrapper)`
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
  border: 1px solid #00a88c;
  display: inline-block;
  color: #00456a;
  border-radius: 3px;
  margin-right: 5px;
  min-width: 36px;
  min-height: 36px;
  padding: 5px;
  background: #f9f871;
  transition: all 0.5s ease;
  &:hover {
    color: #7ed57b;
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const mapStateToProps = state => {
  return {
    boardId: state.listsReducer.boardId,
    lists: state.listsReducer.lists,
    isFetching: state.listsReducer.isFetching,
    error: state.listsReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLists: id => dispatch(getListsAction(id)),
    updateList: (obj, i) => dispatch(updateListAction(obj, i)),
    createList: (id, value) => dispatch(createListAction(id, value)),
    deleteList: (id, i) => dispatch(deleteListAction(id, i)),
    createCard: (obj, listIndex) => dispatch(createCardAction(obj, listIndex)),
    onUpdateCard: (obj, i, listIndex) => dispatch(updateCardAction(obj, i, listIndex)),
    onDeleteCard: (cardId, i, listIndex) => dispatch(deleteCardAction(cardId, i, listIndex)),
    reorderLists: (arr) => dispatch(reorderListAction(arr)),
    updateBoard: (obj, i) => dispatch(updateBoardAction(obj, i)),
  };
};

class Lists extends React.Component {
  constructor() {
    super();
    this.state = {
      isCreating: false,
      disabled: true
    };
  }

  componentWillMount() {
    const id = this.props.match.params.boardId;

    this.props.getLists(id);
  }

  toggleCreating = () => {
    this.setState({
      isCreating: !this.state.isCreating
    });
  };

  onCreateList = () => {
    const id = this.props.match.params.boardId;
    const value = this.state.inputValue;
    const obj = {
      board: id,
      listName: value
    };

    this.props.createList(obj);
    this.toggleCreating();
  };

  handleInput = event => {
    this.setState({
      inputValue: event.target.value,
      disabled: false
    });

    if (event.target.value === "") {
      this.setState({
        disabled: true
      });
    }
  };

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "lists") {
      const lists = Array.from(this.props.lists);
      const list = lists.find(list => list.id === draggableId);
      lists.splice(source.index, 1);
      lists.splice(destination.index, 0, list);


      this.props.reorderLists([...lists]);
      let obj = {
        boardId: source.droppableId,
        boardParams: {
          lists: [...lists]
        }
      };

      this.props.updateBoard(obj, undefined);

    } else if (type === "cards") {
      if (source.droppableId === destination.droppableId) {
        const lists = Array.from(this.props.lists);
        const list = lists.find(list => list.id === source.droppableId);

        console.table(list);
        const listIndex = lists.findIndex(
          list => list.id === source.droppableId
        );

        const card = list.cards.find(card => card.id === draggableId);

        list.cards.splice(source.index, 1);
        list.cards.splice(destination.index, 0, card);

        let obj = {
          listId: source.droppableId,
          listParams: {
            cards: [...list.cards]
          }
        };

        this.props.updateList(obj, listIndex);
      } else {
        const lists = Array.from(this.props.lists);
        const startList = lists.find(list => list.id === source.droppableId);
        const startIndex = lists.findIndex(
          list => list.id === source.droppableId
        );
        const finishList = lists.find(
          list => list.id === destination.droppableId
        );
        const finishIndex = lists.findIndex(
          list => list.id === destination.droppableId
        );

        const card = startList.cards.find(card => card.id === draggableId);

        startList.cards.splice(source.index, 1);

        this.props.updateList(
          {
            listId: source.droppableId,
            listParams: {
              cards: [...startList.cards]
            }
          },
          startIndex
        );

        finishList.cards.splice(destination.index, 0, card);

        this.props.updateList(
          {
            listId: destination.droppableId,
            listParams: {
              cards: [...finishList.cards]
            }
          },
          finishIndex
        );
      }
    }
  };

  render() {
    // if(this.props.isFetching) {
    //
    //   return <Spinner />
    //
    // } else
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          droppableId={this.props.match.params.boardId}
          direction="horizontal"
          type="lists"
        >
          {(provided, snapshot) => (
            <Wrapper
              transitionName="example"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.lists.map((list, i) => (
                <List
                  list={list}
                  id={list.id}
                  key={i}
                  index={i}
                  updateList={this.props.updateList}
                  deleteList={this.props.deleteList}
                  createCard={this.props.createCard}
                  onUpdateCard={this.props.onUpdateCard}
                  onDeleteCard={this.props.onDeleteCard}
                />
              ))}
              {provided.placeholder}

              {this.state.isCreating ? (
                <CreateForm>
                  <Row>
                    <h5>Create New List</h5>
                    <Icons>
                      <Cancel onClick={this.toggleCreating} />
                    </Icons>
                  </Row>
                  <Input
                    style={{ margin: 0 }}
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
              )}
            </Wrapper>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Lists)
);
