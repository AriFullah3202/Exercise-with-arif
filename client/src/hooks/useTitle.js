import React, { useEffect } from 'react'

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - Exercise-with-Arif`;
    }, [title])
}

export default useTitle
