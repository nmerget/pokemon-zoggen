import { ReactElement } from 'react';

export type AccordionType = {
  title: string;
  summary?: ReactElement | undefined;
  detail: ReactElement | undefined;
};

export type AccordionGroupType = {
  id: string;
  accordions: AccordionType[];
};
