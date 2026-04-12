//Interactua con la api. 
import {DraftProductSchema} from '../types/index'
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
            const {data} = await axios.post(url, {
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