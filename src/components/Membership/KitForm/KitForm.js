import React from 'react'
import './KitForm.css'

const KitForm = ({translate, kitId, messages, handleSubmit, setKitId}) => {
    const handleChange = (e) => {
        setKitId(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='kit-input-wrapper'>
                <input
                    type='text'
                    name='kitId'
                    placeholder={translate('kit-code-input')}
                    required
                    value={kitId}
                    onChange={handleChange}
                />
                {messages.error.kitCode &&
                    <small className='err-msg' style={{color: '#d80f0f', textAlign: 'left'}}>
                            {messages.error.kitCode}
                    </small>
                }
            </div>
            <button className='n-btn'>
                {translate('next-btn')}
            </button>
        </form>
    )
}

export default KitForm;