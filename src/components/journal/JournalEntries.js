import React from 'react';
import { useSelector } from 'react-redux';

import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    const { notes } = useSelector(state => state.notes);
    
    return (
        <div className="journal__entries">
            
            {
                notes.map( note => (
                    <JournalEntry                    
                        key={ note.id }
                        // extraigo cada una de las propiedades que tiene la note
                        { ...note }
                        
                    />
                ))
            }

        </div>
    )
}
