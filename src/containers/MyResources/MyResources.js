import React, { Component } from 'react'
import './MyResources.css'
import {connect} from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import CardHead from '../../components/CardHead/CardHead'
import ResourceCard from '../../components/MyResources/ResourceCard/ResourceCard'
import {setActiveSideItem} from '../../store/actions/general'
import {handleGetResources} from '../../store/actions/resources'

class MyResources extends Component {
    state = {
        loading: this.props.resources.length === 0,
        errMessage: ''
    }

    componentDidMount(){
        const {setActiveSideItem, resources, handleGetResources} = this.props;
        
        setActiveSideItem('resource');

        if(resources.length === 0){
            handleGetResources()
                .then(() => {
                    return this.setState({
                        loading: false,
                        errMessage: ''
                    });
                })
                .catch(err => {
                    return this.setState({
                        loading: false,
                        errMessage: err.resource
                    });
                })
        }
    }

    componentDidUpdate(prevProps){
        const {activeLanguage, handleGetResources} = this.props;

        if(activeLanguage !== prevProps.activeLanguage){
            this.setState({
                loading: true
            });
            handleGetResources()
                .then(() => {
                    return this.setState({
                        loading: false,
                        errMessage: ''
                    });
                })
                .catch(err => {
                    return this.setState({
                        loading: false,
                        errMessage: err.resource
                    });
                });
        }
    }

    render(){
        const {loading, errMessage} = this.state;
        const {translate, resources} = this.props;
        let resourcesList = [];
        if(resources.length !== 0){
            resourcesList = resources.map((resource, index) => 
                <ResourceCard 
                    key={index}
                    imageUrl={resource.imageUrl}
                    videoUrl={resource.videoUrl}
                    desc={resource.description}
                />
            )
        }
        return (
            loading ? 
                <div className='loading'>
                    <div className='loading-logo'></div>
                </div> : 
                <div className='main-card'>
                    <CardHead
                        headIcon='kaynaklar-icon.png'
                        smallText={translate('res-smallText')}
                        pText={translate('res-pText')}
                    />
                    <div className='res-desc'>
                        <strong>
                            {translate('res-desc')}
                        </strong>
                    </div>
                    {errMessage !== '' ? 
                        <div
                            style={{fontSize: '1.2rem', textAlign: 'center', textTransform: 'capitalize'}}
                        >
                            <strong>{errMessage}</strong>
                        </div> : 
                        <div className='res-container'>
                            {resourcesList}
                        </div>
                    }
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activeLanguage: getActiveLanguage(state.localize),
        translate: getTranslate(state.localize),
        resources: state.resources
    }
}

export default connect(mapStateToProps, {setActiveSideItem, handleGetResources})(MyResources);