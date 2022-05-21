import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const Search = () => {
    const { t } = useTranslation()
    const [location, setLocation] = useState('');
    const [guests, setGuests] = useState('');
    const [category, setCategory] = useState('');

    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();

        if (location.trim()) {
            router.push(`/?location=${location}&guests=${guests}&category=${category}`)
        } else {
            router.push('/')
        }
    }


    return (
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h2 className="mb-3">{t('search.search')}</h2>
                        <div className="form-group">
                            <label htmlFor="location_field">{t('search.location')}</label>
                            <input
                                type="text"
                                className="form-control"
                                id="location_field"
                                placeholder="new york"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="guest_field">{t('search.guest')}</label>
                            <select
                                className="form-control"
                                id="guest_field"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                            >
                                {[1, 2, 3, 4, 5, 6].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="room_type_field">{t('search.type')}</label>
                            <select
                                className="form-control"
                                id="room_type_field"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {[`${t('search.king')}`, `${t('search.single')}`, `${t('search.twins')}`].map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-block py-2">{t('search.search')}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Search
