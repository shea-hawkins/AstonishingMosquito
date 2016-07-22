// pass the game state into the modal
// if game state is over, then show modal
// if not, hide modal 
// if stateName is gameOver then show this.refs.show 

import React from 'react';
import Modal from 'boron/OutlineModal';
import { Link } from 'react-router';

var backdropStyle = {
  backgroundColor: 'black'
};

var modalStyle = {
  margin: '2px'
};

var contentStyle = {
  margin: '0',
  padding: '20px 20px 40px 20px',
  textAlign: 'center'
};

export default class ModalExample extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.status === 'GAMEOVER' && prevProps.status !== 'GAMEOVER') {
      this.showModal();
    } else if (this.props.status !== 'GAMEOVER') {
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
            <Modal ref="modal" modalStyle={modalStyle} backdropStyle={backdropStyle} contentStyle={contentStyle}>
                <div>
                  <span id="game-over"> Game Over </span>
                </div>
                <div id="try-again">
                  <div>
                    <div onClick={() => location.reload(true)}>
                      <img src='assets/img/try-again.png' /> 
                      <figcaption className="black-text"> Try Again </figcaption> 
                    </div>
                  </div>
                  <div>
                    <Link to={`/`}>
                      <img src='assets/img/game-over.png' /> 
                      <figcaption className="black-text"> Choose Another Song </figcaption> 
                    </Link>
                    
                  </div>
                </div>

            </Modal>
        </div>
    );
  }
};

// export default (props) => {
  
// }