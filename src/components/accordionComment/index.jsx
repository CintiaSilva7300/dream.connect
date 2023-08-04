import * as React from 'react';
import Card from '@mui/material/Card';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import styles from './styles';
import { BLUE } from '../../utils/constants';

export default function AccordionComment({ post }) {
  return (
    <div>
      <>
        <Accordion style={{ color: BLUE }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Ver comentarios...</Typography>
          </AccordionSummary>
          {post.comments.map((comment) => (
            <AccordionDetails>
              <Card variant="outlined" style={styles.card}>
                <div>
                  <div>
                    <h1>{comment.user.name}</h1>
                    <hi style={styles.text}>{comment.text}</hi>
                  </div>
                </div>
              </Card>
            </AccordionDetails>
          ))}
        </Accordion>
      </>
    </div>
  );
}
