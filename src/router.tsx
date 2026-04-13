import {createBrowserRouter} from 'react-router-dom'
import Layout from './layout/Layout'
import Product, {loader as productsLoader} from './pages/Product'
import NewProduct, {action as newProductAction} from './pages/NewProduct'
import EditProduct, {loader as editProductLoader, action as editProductAction} from './pages/EditProduct'

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
            },
            {
                path: 'productos/:id/editar', //ROA pattern
                element: <EditProduct/>,
                loader: editProductLoader, 
                action: editProductAction
            }
        ]
    }
])