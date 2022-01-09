import React from 'react';

// eslint-disable-next-line
const LINK_REGEX = /\[([^\]]*)\]\(([^\)]*)\)/g;
const NEW_LINE_REGEX = /\r\n|\r|\n/g;

const replaceNewlines = (text: string): React.ReactNode[] => text
  .split(NEW_LINE_REGEX)
  .flatMap((e, i) => [<br key={i} />, e])
  .slice(1);

const addLinksAndBreaks = (value: string): string | React.ReactNode[] => {
  if (!value) return '';
  const matches = value.matchAll(LINK_REGEX);
  const elements: React.ReactNode[] = [];
  let match = matches.next();
  let index = 0;

  while (!match.done) {
    const matchValue = match.value;
    if (matchValue.index !== undefined) {
      const startIndex = matchValue.index;
      const endIndex = matchValue.index + matchValue[0].length;
      elements.push(...replaceNewlines(value.slice(index, startIndex)));
      elements.push(<a href={matchValue[2]}>{matchValue[1]}</a>);
      index = endIndex;
    }
    match = matches.next();
  }

  elements.push(...replaceNewlines(value.slice(index)));
  return elements;
};

export default addLinksAndBreaks;
