import React, { useState, useEffect } from 'react';
import { createArea, updateArea } from '../../services/areaServices';
import AreaList from './AreaList';

function AreaForm({ area, onSaved }) {
    const [name, setName] = useState('');

    useEffect(() => {
        if (area) {
            setName(area.name);
        }
    }, [area]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const areaData = name;
        try {
            if (area) {
                await updateArea(area.id, areaData);
            } else {
                await createArea(areaData);
            }
            onSaved();
        } catch (error) {
            console.error('Error saving area:', error);
        }
        window.location.reload(AreaList);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Area Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Save</button>
        </form>
    );
}

export default AreaForm;
