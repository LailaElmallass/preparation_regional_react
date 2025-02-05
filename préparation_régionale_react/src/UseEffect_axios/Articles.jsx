import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Articles() {
    const [articles, setArticles] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [filteredTitle, setFilteredTitle] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const storedItems = localStorage.getItem('articles');
        if (storedItems && storedItems !== "undefined") {
            try {
                const parsedItems = JSON.parse(storedItems);
                setArticles(parsedItems);
                setFilteredItems(parsedItems);
            } catch (err) {
                console.error("Error parsing JSON from localStorage:", err);
            }
        } else {
            axios.get('https://jsonplaceholder.typicode.com/posts')
                .then(response => {
                    const data = response.data;
                    setArticles(data);
                    setFilteredItems(data);
                    localStorage.setItem('articles', JSON.stringify(data));
                })
                .catch(err => console.log(err));
        }
    }, []);

    useEffect(() => {
        setFilteredItems(articles.filter(item => item.title.toLowerCase().includes(filteredTitle.toLowerCase())));
        setPage(1);  // Reset to the first page whenever the filter changes
    }, [filteredTitle, articles]);

    // Calculate total pages
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    // Handle pagination logic
    const currentItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className='container border border-dark text-center'>
            <h1 className='text-center'>Mes articles</h1>

            {/* search */}
            <div className='mx-5 p-3 d-flex justify-content-center'>
                <input 
                    type="search" 
                    className='w-100 p-2 border border-redius-20 '
                    placeholder='Filter by title' 
                    value={filteredTitle}
                    onChange={(e) => setFilteredTitle(e.target.value)}
                />
            </div>

            {/* articles */}
            <div className='row gap-2 m-3 p-3'>
                {currentItems.map(article => (
                    <div key={article.id} className='card col-5 m-3 p-3 text-center'>
                        <h3 className='card-title'>{article.title}</h3>
                        <p className='card-text'>{article.body.slice(0, 20)}...</p> {/* Add ellipsis */}
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className='pagination d-flex justify-content-around m-3'>
                <button
                    className='btn btn-secondary'
                    onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))} // Prevent going below page 1
                    disabled={page === 1}
                >
                    Précédent
                </button>
                {page} / {totalPages}
                <button
                    className='btn btn-secondary'
                    onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages))} // Prevent going above total pages
                    disabled={page === totalPages}
                >
                    Suivant
                </button>
            </div>
        </div>
    );
}

export default Articles;
