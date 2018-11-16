import React from 'react';
import styled from 'styled-components';
import { palette } from '../header/header';

const CardWrapper = styled.div`
  width: auto;
  height: auto;
  background: ${palette.grayblue};
  color: ${palette.green};
  margin: 5px;
  padding: 8px;
  border-radius: 4px;
`;

const ContWrapper = styled(CardWrapper)`
  width: auto;
  margin: 0;
  height: auto;
  background: ${palette.blue};
  color: ${palette.lightYellow};
`;


class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card: this.props.card
    }
  }

  render() {

    const { card } = this.props;
    console.log(card)

    return (
      <CardWrapper>
        <h5>{card.cardName}</h5>
        {card.description.length >0 || card.participants.length>0 ? (
          <ContWrapper>
            <React.Fragment>
              <p>Description: {card.description}</p>
              <p>Participants: {card.participants.join(', ')}</p>
            </React.Fragment>
          </ContWrapper>
        ) : null}
      </CardWrapper>
    )
  }
}

export default Card;
