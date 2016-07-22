import React from 'react';

export default (props) => {
  console.log(props);
  return (
    <footer>
      <h1>Now Playing: <span>{props.fileName}</span></h1>
    </footer>
  );
};
