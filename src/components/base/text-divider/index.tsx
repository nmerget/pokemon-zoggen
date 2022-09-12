import React from 'react';
import { TextDividerType } from './data';

const TextDivider = ({ text }: TextDividerType) => (
  <div className="flex justify-center gap-4 w-full">
    <div className="h-[1px] bg-gray-400 w-16 my-auto" />
    <span className="text-sm text-gray-400">{text}</span>
    <div className="h-[1px] bg-gray-400 w-16 my-auto" />
  </div>
);

export default TextDivider;
