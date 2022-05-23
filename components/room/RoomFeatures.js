import React from 'react'
import { useTranslation } from 'react-i18next'

const RoomFeatures = ({ room }) => {
    const { t } = useTranslation()
    return (
        <div className="features mt-5">
            <h3 className='mb-4'>{t('room.feature')}:</h3>
            <div className='room-feature'>
                <i className="fa fa-cog fa-fw fa-users" aria-hidden="true"></i>
                <p>{room.guestCapacity} {t('search.guest')}</p>
            </div>

            <div className='room-feature'>
                <i className="fa fa-cog fa-fw fa-bed" aria-hidden="true"></i>
                <p>{room.numOfBeds} {t('room.bed')}</p>
            </div>

            <div className='room-feature'>
                <i
                    className={room.breakfast ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                    aria-hidden="true"
                ></i>
                <p>{t('room.breakfast')}</p>
            </div>

            <div className='room-feature'>
                <i
                    className={room.internet ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                    aria-hidden="true"
                ></i>
                <p>{t('room.internet')}</p>
            </div>

            <div className='room-feature'>
                <i
                    className={room.airConditioned ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                    aria-hidden="true"
                ></i>
                <p>{t('room.air_conditionor')}</p>
            </div>

            <div className='room-feature'>
                <i
                    className={room.petsAllowed ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                    aria-hidden="true"
                ></i>
                <p>{t('room.pet')}</p>
            </div>

            <div className='room-feature'>
                <i
                    className={room.roomCleaning ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                    aria-hidden="true"
                ></i>
                <p>{t('room.clean')}</p>
            </div>

        </div>
    )
}

export default RoomFeatures
