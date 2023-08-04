import styled from 'styled-components';

export const H1 = styled.div``;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100vh',
  },
  title: {
    fontSize: 22,
    fontFamily: 'sans-serif',
    fontWeight: 400,
    color: '#037199',
    marginTop: 20,
    marginBottom: 20,
  },
  textField: {
    width: '50%',
    margin: 10,
  },
  date: {
    width: '50%',
    margin: 10,
  },
  button: {
    backgroundColor: 'c',
    width: '50%',
    margin: 10,
    height: 50,
    borderRadius: 20,
  },
};

export default styles;
