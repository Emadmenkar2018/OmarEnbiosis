import React from 'react'
import './FoodTypeMenu.css'

const FoodTypeMenu = ({foodTypeTitle, foodTypes, updateFoodType, isShow, handleShowFoodTypeMenu, foodError}) => {
    let foodTypeList = [];
    if(foodTypes.length !== 0){
        foodTypeList = foodTypes.map(fType => 
            <button 
                key={fType.id}
                className={fType.isActive ? 'selected' : ''}
                onClick={updateFoodType.bind(this, fType.id)}
            >
                {fType.title}
            </button>
        );
    }
    return (
        <div onClick={handleShowFoodTypeMenu} className='food-type-dropdown'>
            <button className='type-menu-dropbtn'>
                <strong>{foodTypeTitle}</strong>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="15" height="15"
                    viewBox="0 0 172 172"
                    id='arrow-icon'
                >
                    <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none">
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g fill="#565d68">
                            <path d="M17.2,68.8v-11.46667c0,-2.21307 1.27853,-4.2312 3.27947,-5.18293c2.00093,-0.95173 4.3688,-0.65933 6.0888,0.74533l59.43173,48.63013l59.43747,-48.63013c1.71427,-1.40467 4.08213,-1.69133 6.0888,-0.74533c2.00667,0.946 3.27373,2.96987 3.27373,5.18293v11.46667c0,1.72 -0.774,3.34827 -2.10413,4.4376l-63.06667,51.6c-2.1156,1.72573 -5.14853,1.72573 -7.26413,0l-63.06667,-51.6c-1.3244,-1.08933 -2.0984,-2.7176 -2.0984,-4.4376z"></path>
                        </g>
                    </g>
                </svg>
            </button>
            <div 
                className='type-dropdown-content'
                style={{
                    height: isShow ? 255 : 0,
                    opacity: isShow ? 1 : 0,
                    overflow: foodTypeList.length < 6 ? 'hidden' : 'auto'
                }}
            >
                {foodError !== '' ? 
                    <button>
                        Boş
                    </button> : 
                    foodTypeList
                }
            </div>
        </div>
    )
}

export default FoodTypeMenu;