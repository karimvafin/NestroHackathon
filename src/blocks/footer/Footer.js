import React, { useState } from 'react';
import './Footer.css';
import { roadsData } from '../../assets/utils/roads';

export const Footer = () => {
    const [showAllRoads, setShowAllRoads] = useState(false);

    const toggleRoads = () => {
        setShowAllRoads(!showAllRoads);
    };

    const displayedRoads = showAllRoads ? roadsData : roadsData.slice(0, 20);

    return (
        <div className='footer'>
            <div className='list-wrapper'>
                <div className='list'>
                    <div className='text'>Cool gyus team:</div>
                    <div className='text'>Dibrovenko Pavel</div>
                    <div className='text'>Vafin Karim</div>
                    <div className='text'>Plahotnyuk Arseniy</div>
                    <div className='text'>Bekmina Julia</div>
                </div>
            </div>
            <div className="line"></div>
            <div className="toggle-button" onClick={toggleRoads}>
                {showAllRoads ? 'Скрыть дороги' : 'Показать все дороги'}
            </div>
            <div className={`list-wrapper${showAllRoads ? ' expanded' : ''}`}>
                {displayedRoads.map((road) => (
                    <div className='list' key={road.id}>
                        <div className='road-name'>{road.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
