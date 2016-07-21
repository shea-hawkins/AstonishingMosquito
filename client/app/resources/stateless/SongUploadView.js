import React from 'react';

export default (props) => {
  return (
    <div>
      <form encType="multipart/form-data" onSubmit={props.onSubmit} >
          <input className="custom-file-upload" type="file" name="song"/>
        <input className="submit" type="submit" />
      </form>
    </div>
  )
}
