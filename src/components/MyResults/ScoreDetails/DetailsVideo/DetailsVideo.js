import React, { Component } from 'react'
import './DetailsVideo.css'
import Modal from 'react-modal'

export default class DetailsVideo extends Component {
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
        return (
            <div className='details-video'>
                <div className='video-title'>
                    Bağırsak Bariyeri Sağlığı Hakkında
                </div>
                <div 
                    className='video-resource'
                    onClick={this.handleOpenModal}
                >
                    <img className='vid-img' src='https://img.youtube.com/vi/VHbbKeXsC_g/maxresdefault.jpg' alt='resource'/>
                    <div className='play-button'></div>
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
                        src='https://www.youtube.com/embed/VHbbKeXsC_g' 
                        frameBorder='0' 
                        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' 
                        allowFullScreen
                        title='res-video'
                    >
                    </iframe>
                </Modal>
            </div>
        )
    }
}
