
import {JSX} from 'react';


function SearchInput({
                    searchTerm,
                    changeSearchTerm
}: {
    searchTerm: string;
    changeSearchTerm: (term: string) => void;
}): JSX.Element {
    return (
        <div className="search-wrapper">
            <input type="text"
                   placeholder="Search by Customers' Name or email..."
                   value={searchTerm}
                   className="search-input"
                   onChange={(e) => changeSearchTerm(e.target.value)}
            />
            {searchTerm !== '' && (
                <button className="clear-search" onClick={() => changeSearchTerm('')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.5 1.5a.5.5 0 0 1 .708 0L8 7.793l5.793-6.293a.5.5 0 1 1 .707.707L8.707 8l5.293 5.293a.5.5 0 0 1-.707.707L8 8.707l-5.293 5.293a.5.5 0 0 1-.707-.707L7.293 8 .5 2.707a.5.5 0 0 1 0-.707z"/>
                    </svg>
                </button>
            )}
        </div>
    );
}

export default SearchInput;
