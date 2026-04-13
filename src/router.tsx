import {createBrowserRouter} from 'react-router-dom'
import Layout from './layout/Layout'
import Product, {action as updateAvailableAction, loader as productsLoader} from './pages/Product'
import NewProduct, {action as newProductAction} from './pages/NewProduct'
import EditProduct, {loader as editProductLoader, action as editProductAction} from './pages/EditProduct'
import { action  as deleteProductAction} from './components/ProductDetails'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Product/>,
                loader: productsLoader,
                action: updateAvailableAction
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
            },
            {
                path: 'productos/:id/eliminar', 
                action: deleteProductAction
            }
        ]
    }
])