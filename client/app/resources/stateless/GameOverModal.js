// pass the game state into the modal
// if game state is over, then show modal
// if not, hide modal 
// if stateName is gameOver then show this.refs.show 

import React from 'react';
import Modal from 'boron/OutlineModal';


export default class ModalExample extends React.Component {
  componentDidUpdate(prevProps) {
    console.log('status of game over', this.props.status);
    if (this.props.status === 'GAMEOVER' && prevProps.status !== 'GAMEOVER') {
      this.showModal();
      // debugger;
    } else if (this.props.status !== 'GAMEOVER') {
      // debugger;
      this.hideModal();
    }
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.status !== this.props.status;
  }
  showModal() {
    this.refs.modal.show(); 
  }
  hideModal() {
    this.refs.modal.hide();
  }
  render() {
    return (
        <div>
            <Modal ref="modal">
                <h1>I am a dialog</h1>
            </Modal>
        </div>
    );
  }
};

// export default (props) => {
  
// }