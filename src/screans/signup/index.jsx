import * as React from 'react';

import FormSignup from '../../components/formSignup/index';
import { Box, Marca, H1, Form } from './style';

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
