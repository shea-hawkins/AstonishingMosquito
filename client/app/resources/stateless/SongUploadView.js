import React from 'react';

export default (props) => {
  return (
    <div>
      <form encType="multipart/form-data" onSubmit={props.onSubmit} >
        <input type="file" name="song"/>
        <input type="submit" />
      </form>
    </div>
  )
}
