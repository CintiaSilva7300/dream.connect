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
  lineHorizont: {
    boxShadow:' 0 0.10px 0 0 #6f6f6f',
    height: 1,
    margin: '0px 0px',
    width:'100%'
    
  }
};
export const Box = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
`;

export const Marca = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #037199;
  width: 50%;
  height: 100vh;
  color: #fff;
`;

export const H1 = styled.div`
  margin: 0;
  font-size: 80px;
  font-family: cursive;
`;

export const Form = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100vh;
`;
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;


export default styles;

