import * as React from 'react';

import FormSignup from '../../components/formSignup/index';
import { Box, Marca, H1, Form, Card } from './style';

export default function Signup() {
  return (
    <div>
      <Box>
        <Marca>
          <H1>Deep Many</H1>
          {/* <img
            src=""
            alt="Logo"
            style={{ width: 100, height: 100, margin: 20 }}
          /> */}
        </Marca>
        <Form>
          <FormSignup />
        </Form>
      </Box>
    </div>
  );
}
