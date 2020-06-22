import React, { Component, Fragment } from 'react'
import './ResourceCard.css'
import Modal from 'react-modal'

Modal.setAppElement('#root');
class ResourceCard extends Component {
    state = {
        showModal: false
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    }
    
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    render() {
        const {showModal} = this.state;
        const {imageUrl, videoUrl, desc} = this.props;
        return (
            <Fragment>
                <div onClick={this.handleOpenModal} className='res-card'>
                    <img className='vid-img' src={imageUrl} alt='resource'/>
                    <div className='play-button'></div>
                    <div className='video-desc'>{desc}</div>
                </div>
                <Modal
                    isOpen={showModal}
                    onRequestClose={this.handleCloseModal}
                    className='res-modal'
                    overlayClassName='Overlay'
                >
                    <iframe 
                        width='100%' 
                        height='100%' 
                        src={videoUrl}
                        frameBorder='0' 
                        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' 
                        allowFullScreen
                        title='res-video'
                    >
                    </iframe>
                </Modal>
            </Fragment>
        )
    }
}

export default ResourceCard;