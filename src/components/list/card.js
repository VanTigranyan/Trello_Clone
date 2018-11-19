import React from "react";
import styled from "styled-components";
import { palette } from "../header/header";
import { Draggable } from "react-beautiful-dnd";
import { placeholder} from 'polished';
import { Trash, Edit2, XCircle, MinusSquare, Save, PlusSquare } from 'react-feather';

const CardWrapper = styled.div`
  width: auto;
  height: auto;
  background: ${(props) => props.isDragging ? palette.turqoise : palette.grayblue};
  color: ${palette.green};
  margin: 5px;
  padding: 8px;
  border-radius: 4px;
  transform: ${({isDragging}) => isDragging ? 'rotate(-30deg)' : 'rotate(0deg)'};
  z-index: ${(props) => props.isDragging ? '999' : '0'};
  ${(props) => props.isDragging &&`
    position: absolute;
    transform: scale(0.5);
    color: red;
  `}
`;

const ContWrapper = styled(CardWrapper)`
  width: auto;
  margin: 0;
  height: auto;
  background: ${palette.blue};
  color: ${palette.lightYellow};
`;

const DeleteBtn = styled(Trash)`
  border: 2px solid #00456A;
  display: inline-block;
  color: #F9F871;
  border-radius: 3px;
  margin-right: 5px;
  min-width: 32px;
  min-height: 32px;
  padding: 5px;
  margin: 3px;
  background: #00A88C;
  transition: all 0.5s ease;
  ${({disabled}) => disabled &&`
    cursor: not-allowed;
  `}
  &:hover {
    cursor: pointer;
    ${({disabled}) => disabled &&`
      cursor: not-allowed;
    `}
    color: #7ED57B;
    transform: scale(1.3);
  }
`;

const CardInput = styled.input`
  border: 1px solid ${palette.lightYellow};
  color: ${palette.turqoise};
  border-radius: 5px;
  height: 30px;
  background: ${palette.darkblue};
  padding: 3px;
  height: ${(props) => props.height};
  ${placeholder({
    'color': palette.grayblue
    })}
`;

const Wr = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCardEditing: false,
      card: this.props.card,
      disabled: true,
      particip: '',
    };
  }

  handleInput = (event) => {
    this.setState({
        [event.target.name]: event.target.value,
        disabled: false,
    })
    if(event.target.name === 'cardName' && event.target.value === '') {
      this.setState({
        disabled: true
      })
    }
  }

  componentWillMount() {
    this.setState({
      card: this.props.card,
    })
  }

  toggleCardEdit = () => {
    this.setState({
      isCardEditing: !this.state.isCardEditing
    })
  }

  onPartAdd = (event) => {
    let parts = [...this.state.card.participants];
    if(this.state.particip.trim().length !== 0) {
      parts.push(this.state.particip);
      this.setState({
        card: {
          ...this.state.card,
          participants: [...parts],
        },
        particip: '',
        disabled: false,
      })
      let el = document.querySelector('input[name="particip"]');
      el.value = null;
    }
  }

  onDeletePart = (i) => {
    let parts = [...this.state.card.participants];
    parts.splice(i, 1);

    this.setState({
      card: {
        ...this.state.card,
        participants: [...parts],
      },
      disabled: false,
    })
  }

  onCardSave = () => {
    if(!this.state.disabled) {
      let obj = {};
      obj.cardId = this.state.card.id;
      obj.cardParams = {};
      if(this.state.cardName) obj.cardParams.cardName = this.state.cardName;
      if(this.state.desc && this.state.desc.trim().length > 0) obj.cardParams.description = this.state.desc;
      obj.cardParams.participants = [...this.state.card.participants];

      this.props.onUpdateCard(obj, this.props.index, this.props.listIndex);
      this.setState({
        card: this.props.card,
        disabled: true,
        particip: '',
      })
      this.toggleCardEdit();
    } else return;
  }

  onCardDelete = () => {
    this.props.onDeleteCard(this.state.card.id,this.props.index, this.props.listIndex);
  }

  render() {
    const { card } = this.props;

    return (
      <React.Fragment>
        {
          this.state.isCardEditing ? (
            <CardWrapper>
              <div style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'baseline',
                alignContent: 'baseline',
                flexWrap: 'nowrap',
              }}>
                <CardInput name='cardName' defaultValue={card.cardName}
                  onChange={this.handleInput}
                  style={{
                    maxWidth: '135px'
                  }}
                />
                <div style={{marginBottom: '5px'}}>
                  <DeleteBtn as={ Save } onClick={this.onCardSave} disabled={this.state.disabled}/>
                  <DeleteBtn as={XCircle} onClick={this.toggleCardEdit}/>
                </div>
              </div>
              <ContWrapper>
                <React.Fragment>
                  <p style={{marginBottom: '3px'}}>Description:
                    <CardInput name='desc'
                      defaultValue={card.description}
                      as='textarea'
                      height='65px'
                      onChange={this.handleInput}
                    />
                  </p>
                  <div style={{marginBottom: '8px'}}>
                    <h6>Participants:</h6>
                    {
                      this.state.card.participants.map((part, i) => {
                        return (

                          <div
                            key={i}
                            style={{display: "flex", justifyContent: 'space-between'}}
                          >
                            {part}
                            <DeleteBtn as={MinusSquare}
                              onClick={() => this.onDeletePart(i)}
                            />
                          </div>
                        )
                      })
                    }
                  </div>
                  <Wr style={{position: 'relative'}}>
                    <CardInput
                      placeholder='Input Participants'
                      onChange={this.handleInput}
                      name='particip'
                    />
                    <DeleteBtn as={PlusSquare}  size={24} style={{
                        position: "relative",
                        top: "-2px",
                        right: "33px",
                        'minHeight': '28px',
                        'minWidth': '28px',
                        padding: 0,
                        borderRadius: '5px',
                    }}
                      onClick={this.onPartAdd}
                    />
                  </Wr>
                </React.Fragment>
              </ContWrapper>
            </CardWrapper>
          ) :
          (
            <Draggable
              draggableId={this.props.card.id}
              index={this.props.index}
            >
              {(provided, snapshot) => (
                <CardWrapper
                  className='dragCard'
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  isDragging={snapshot.isDragging}
                >
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h5>{card.cardName}</h5>
                    <div style={{marginBottom: '5px'}}>
                      <DeleteBtn onClick={this.onCardDelete}/>
                      <DeleteBtn as={Edit2} onClick={this.toggleCardEdit}/>
                    </div>
                  </div>
                  {card.description.length > 0 || card.participants.length > 0 ? (
                    <ContWrapper>
                      <React.Fragment>
                        {
                          card.description.length > 0 ? (<p>Description: {card.description}</p>) : (null)
                        }
                        {
                          card.participants.length > 0 ? (<p>Participants: {card.participants.join(", ")}</p>) : (null)
                        }
                      </React.Fragment>
                    </ContWrapper>
                  ) : null}
                </CardWrapper>
              )}
            </Draggable>
          )
        }
      </React.Fragment>
        );
  }
}

export default Card;
