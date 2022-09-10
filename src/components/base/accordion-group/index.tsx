import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionGroupType, AccordionType } from './data';

const AccordionGroup = ({ id, accordions }: AccordionGroupType) => {
  const [panel, setPanel] = useState<string | undefined>();

  if (!accordions || accordions.length === 0) {
    return null;
  }

  return (
    <div>
      {accordions.map((accordion: AccordionType, index: number) => (
        <Accordion
          expanded={panel === `${id}-accordion-${index}`}
          key={`${id}-accordion-${index}`}
          onChange={() => {
            const accordionId = `${id}-accordion-${index}`;
            setPanel(accordionId === panel ? undefined : accordionId);
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className="flex gap-2">
              <span className="font-bold my-auto">{accordion.title}</span>
              {panel !== `${id}-accordion-${index}` && accordion.summary}
            </div>
          </AccordionSummary>
          <AccordionDetails className="flex">
            {accordion.detail}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default AccordionGroup;
