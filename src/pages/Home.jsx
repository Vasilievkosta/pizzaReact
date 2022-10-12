import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

function Home() {
    const dispatch = useDispatch();
    const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

    const { searchValue } = React.useContext(SearchContext);

    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    // const [currentPage, setCurrentPage] = useState(1);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    React.useEffect(() => {
        setLoading(true);

        const category = categoryId > 0 ? `&category=${categoryId}` : '';
        const sorting = `${sort.sortProperty}&order=desc`;
        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(`https://631b6309fae3df4dcffd7df6.mockapi.io/api/items?page=${currentPage}&limit=4${category}&sortBy=${sorting}${search}`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

    const sceletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">

                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />

            </div>

            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? sceletons : pizzas}
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
}


export default Home;
