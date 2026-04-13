//Interactua con la api. 
import {DraftProductSchema, ProductsSchema, type Product, ProductSchema} from '../types/index'
import axios from 'axios'
import { safeParse, number, parse, string, transform, pipe } from 'valibot'
import { toBoolean } from '../utils'

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

export async function getProductById(id : Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios.get(url)
        const result = safeParse(ProductSchema, data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data: ProductServiceProps, id: Product['id']){
    try {
        const NumberSchema = pipe(string(), transform(Number), number())
        const availableValue = data.available?.toString() ?? 'false'
        const result = safeParse(ProductSchema,{
            id, 
            name: data.name, 
            price: parse(NumberSchema, data.price), 
            available: toBoolean(availableValue)
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url,result.output)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id: Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
        
    } catch (error) {
        console.log(error)
    }
}