import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 510px;
  margin-left: -15px;
  height: 640px;
  margin-top: 20px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
`;

export const CardText = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  width: 521px;
  height: 160px;
  margin-top: 20px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
`;

const styles = {
  nameText: {
    margin: 5,
    fontFamily: 'sans-serif',
    fontSize: 13,
    fontWeight: 400,
    color: '#037199',
    cursor: 'pointer',
  },
  conteudoText: {
    margin: 5,
    fontFamily: 'sans-serif',
    fontSize: 13,
    fontWeight: 400,
    color: '#037199',
  },
  box: {
    boxShadow: ' 0 8px 16px 0 rgba(0, 0, 0, 0.2)',
    marginTop: 10,
    width: 520,
  },
  text: {
    margin: 5,
    fontFamily: 'sans-serif',
    fontSize: 13,
    fontWeight: 400,
    color: '#037199',
  },
};

export default styles;
