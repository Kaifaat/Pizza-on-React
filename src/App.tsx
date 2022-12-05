import React, {Suspense} from "react";
import "./scss/app.scss";
import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import NotFound from "./pages/NotFound";
import {Routes, Route} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

const Cart = React.lazy(() => import( /* webpackChunkName: "Cart" */ './pages/Cart'));
// const FullPizza = React.lazy(() => import('./pages/FullPizza'));
const NotFound = React.lazy(() => import( /* webpackChunkName: "NotFound" */ './pages/NotFound'));

// export const SearchContext = React.createContext("");  /пропсы через контекст

function App() {
    // const [searchValue, setSearchValue] = React.useState("");
    // const count = useSelector((state) => state.counter.value);
    // const dispatch = useDispatch();

    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route path="" element={<Home/>}/>
                <Route path="/cart" element={
                    <Suspense fallback={<div>Загрузка корзины...</div>}>
                        <Cart/>
                    </Suspense>
                }
                />
                <Route path="*" element={
                    <Suspense fallback={<div>Загрузка...</div>}>
                    <NotFound/>
                    </Suspense>
                        }
                        />
            </Route>
        </Routes>
    );
}

export default App;
