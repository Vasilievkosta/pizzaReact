import React, { useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';

function Home() {

    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);

    React.useEffect(() => {
        fetch('https://626d16545267c14d5677d9c2.mockapi.io/items')
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr.slice(0, 10));
                setLoading(false);
            });
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container">
            <div className="content__top">

                <Categories />
                <Sort />

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
