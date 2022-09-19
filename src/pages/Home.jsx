import React, { useState } from 'react';
import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Pagination from '../components/Pagination';

function Home() {
    const { searchValue } = React.useContext(SearchContext);

    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortType, setSortType] = useState({
        name: 'популярности', sortProperty: 'rating'
    });

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sort = `${sortType.sortProperty}&order=desc`;
    const search = searchValue ? `&search=${searchValue}` : '';



    React.useEffect(() => {
        setLoading(true);
        fetch(`https://631b6309fae3df4dcffd7df6.mockapi.io/api/items?page=${currentPage}&limit=4${category}&sortBy=${sort}${search}`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

    const sceletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">

                <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
                <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />

            </div>

            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? sceletons : pizzas}
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </div>
    );
}


export default Home;
