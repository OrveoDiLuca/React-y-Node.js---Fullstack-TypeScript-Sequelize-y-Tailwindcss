//Interactua con la api. 
import {DraftProductSchema, ProductsSchema} from '../types/index'
import axios from 'axios'
import { safeParse } from 'valibot'

type ProductServiceProps = {
    [k: string]: FormDataEntryValue
}

export async function addProduct(data: ProductServiceProps){
    const {name,price} = data
    try {
        const result = safeParse(DraftProductSchema, {
            name: name, 
            price: +price
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name, 
                price: result.output.price
            })
        }else{
            throw new Error('Invalid data')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts(){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const {data} = await axios.get(url)
        const result = safeParse(ProductsSchema, data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}