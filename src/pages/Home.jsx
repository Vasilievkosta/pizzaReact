import React, { useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';

function Home() {

    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: 'популярности', sortProperty: 'rating'
    });

    React.useEffect(() => {
        setLoading(true);
        fetch(`https://631b6309fae3df4dcffd7df6.mockapi.io/api/items?${categoryId > 0 ? `category=${categoryId}` : ''
            }&sortBy=${sortType.sortProperty}&order=desc`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType]);

    return (
        <div className="container">
            <div className="content__top">

                <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
                <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />

            </div>

            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? [...new Array(6)].map((_, index) => <Sceleton key={index} />)
                        : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
                }

            </div>
        </div>
    );
}

export default Home;
