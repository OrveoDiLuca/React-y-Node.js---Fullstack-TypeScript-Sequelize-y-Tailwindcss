import {createBrowserRouter} from 'react-router-dom'
import Layout from './layout/Layout'
import Product, {loader as productsLoader} from './pages/Product'
import NewProduct, {action as newProductAction} from './pages/NewProduct'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Product/>,
                loader: productsLoader
            },
            {
                path: 'productos/nuevos',
                element: <NewProduct/>,
                action: newProductAction
            }
        ]
    }
])