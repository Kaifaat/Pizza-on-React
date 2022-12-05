import React from 'react';
import qs from 'qs';
// import {SearchContext} from '../App'
import {useSelector} from "react-redux";

import {useNavigate} from 'react-router-dom';
import { sortList } from '../components/Sort'

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/index";
import Pagination from "../components/Pagination";

// import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components';


import {useAppDispatch} from "../Redux/store";
import {selectPizzaData} from "../Redux/pizza/selectors";
import {selectFilter} from "../Redux/filter/selectors";
import {setCategoryId, setCurrentPage, setFilters} from "../Redux/filter/slice";
import {fetchPizzas} from "../Redux/pizza/asyncActions";
import {SearchPizzaParams} from "../Redux/pizza/types";

export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);
    const {items, status} = useSelector(selectPizzaData);

    // const {searchValue} = React.useContext(SearchContext);
    // const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    // const [categoryId, setCategoryId] = React.useState(0);
    // const [currentPage, setCurrentPage] = React.useState(1);


    const onChangeCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id));
    }, []);


    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const getPizzas = async () => {
        setIsLoading(true);

        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        // await axios.get(`https://6322ee4e362b0d4e7dd6b76b.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        // )
        //     .then((res) => {
        //         setItems(res.data);
        //         setIsLoading(false);
        //     }).catch((error) => {
        //     setIsLoading(false);
        //     console.log(error, 'Axios error');
        //     })

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage),
            })
        );

        window.scrollTo(0, 0);
    }

    // Если был первый рендер, то запрашиваем пиццы
    React.useEffect(() => {
        getPizzas();


    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    // Если был уже ранее рендер, то тогда определяем нужно ли эти параметры доб в URL
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            });
            navigate(`?${queryString}`);
        }

        // if (!window.location.search) {
        //     dispatch(fetchPizzas({} as SearchPizzaParams));
        // }

        isMounted.current = true;
    }, [categoryId, sort.sortProperty, searchValue])

    // Если был первый рендер, то проверяем URL параметры и сохраняем в redux
    React.useEffect(() => {
        if (window.location.search) {
            const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;
            const sort = sortList.find((obj: any) => obj.sortProperty === params.sortBy);

            dispatch(
                setFilters({
                    searchValue: params.search,
                        categoryId: Number(params.category),
                        currentPage: Number(params.currentPage),
                        sort: sort || sortList[0]
                    }
                )
            )
            isSearch.current = true;
        }
    }, []);


    //  const pizzas =
    //         .filter(obj => {
    //     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //         return true;
    //     }
    //     return false
    // }) можно пофиксить поиск, когда выбрана категория без элементов, которые мы передаем в поиск, измени
    const pizzas = items.map((obj: any) =>
        <PizzaBlock
            key={obj.id}
            // title={obj.title}
            // price={obj.price}
            // image={obj.imageUrl}
            // sizes={obj.sizes}
            // types={obj.types}
            {...obj}
            // если все свойства в объекте названы так же как и пропсы, можно использовать спред оператор
        />);

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort value={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ? (
                    <div className="content__error-info">
                        <h2>Произошла ошибка</h2>
                        <p>
                            К сожалению не удалось получить пиццы. Попробуйте повторить попытку позже
                        </p>
                    </div>
                ) : (
                    <div className="content__items">
                        {status === 'loading' ? skeletons : pizzas}

                    </div>)
            }

            <Pagination
                currentPage={currentPage} onChangePage={onChangePage}
            />
        </div>
    )
}
export default Home;