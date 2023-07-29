import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionComment({ post }) {
  React.useEffect(() => {
    console.log('post ->>>', post);
  }, []);

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
          {post.map((p) => (
            <AccordionDetails>
              {p.comments.map((comment) => (
                <div>
                  {!p.comments.text ? (
                    <div>
                      <Typography
                        style={{
                          color: '#808080',
                          fontFamily: 'sans-serif',
                          fontSize: 13,
                          fontWeight: 400,
                        }}
                      >
                        {comment.text}
                      </Typography>
                    </div>
                  ) : (
                    <div>
                      <p>SEILA</p>
                    </div>
                  )}
                </div>
              ))}
            </AccordionDetails>
          ))}
        </Accordion>
      </>
    </div>
  );
}
