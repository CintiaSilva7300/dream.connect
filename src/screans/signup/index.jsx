import * as React from 'react';

import { Box, Marca, H1, Form } from './styles';
import FormSignup from '../../components/formSignup/index';

export default function Signup() {
  return (
    <div>
      <Box>
        <Marca>
          <H1>Dream Connect</H1>
        </Marca>
        <Form>
          <FormSignup />
        </Form>
      </Box>
    </div>
  );
}
