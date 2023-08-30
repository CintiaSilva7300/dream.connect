import styled from 'styled-components';

export const Box = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
`;
export const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 475px;
  height: 610px;
  margin-top: 30px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 50px;
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

const styles = {
  example: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
};

export default styles;
