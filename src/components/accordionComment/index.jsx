import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';

export default function AccordionComment({ post }) {
  return (
    <div>
      <>
        <Accordion style={{ color: '#037199' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Ver comentarios...</Typography>
          </AccordionSummary>
          {post.comments.map((comment) => (
            <AccordionDetails>
              <Card
                variant="outlined"
                style={{ padding: 20, wordBreak: 'break-word' }}
              >
                <div>
                  <div>
                    <h1>{comment.user.name}</h1>
                    <hi
                      style={{
                        color: '#808080',
                        fontFamily: 'sans-serif',
                        fontSize: 13,
                        fontWeight: 400,
                      }}
                    >
                      {comment.text}
                    </hi>
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
