import React from 'react';

import { Box, Marca, H1, Form } from './style';
import FormLogin from '../../components/formLogin/FormLogin';

// import Icon from '../../utils/img/icons.png'

export default function Home() {
  return (
    <>
    <Box>
      <Marca>
          <H1>Deep Fans</H1>
          {/* <img src={Icon} alt='Logo' style={{width: 100, height:100, margin:20}}/> */}
      </Marca>
      <Form>
      <FormLogin/>
      </Form>
    </Box>
    </>
  );
}
