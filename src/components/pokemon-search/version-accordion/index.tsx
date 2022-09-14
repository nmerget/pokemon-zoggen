import React from 'react';
import { AccordionType } from '../../base/accordion-group/data';
import VERSIONS from '../../../data/versions';
import VersionSelect from '../../base/version-select';

const getVersionAcc = (
  setVersion: (v: string) => void,
  version?: string,
): AccordionType => ({
  title: 'Version wählen:',
  summary: <span>{VERSIONS.find((ver) => ver.version === version)?.name}</span>,
  detail: (
    <div className="w-full">
      <VersionSelect version={version} onChangeVersion={setVersion} />
    </div>
  ),
});

export default getVersionAcc;
