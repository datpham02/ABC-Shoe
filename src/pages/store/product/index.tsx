import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import StoreLayout from '~/layout/StoreLayout'
import { authOptions } from '~/pages/api/auth/[...nextauth]'
import { formatDate } from '~/utils/func'
import useDebounce from '~/utils/hook/useDebounce'

type Product = {
    parentProductId: any
    id: string
    name: string
    image: string[]
    cost: number
    price: number
    quantity: number
    size: string
    description: string
    createAt: string
    updateAt: string
    status: string
    productChild: ProductChild[]
    category: Category
}

type ProductChild = {
    id: string
    name: string
    image: string[]
    cost: number
    price: number
    description: string
    createAt: string
    updateAt: string
    status: string
    category: Category
    size: string
    quantity: number
}

type Category = {
    name: string
    id: string
}
const Product = () => {
    const [search, setSearch] = useState<string>('')
    const searchDebounce = useDebounce(search, 500)
    const { data: search_product, mutate } = useMutation({
        mutationKey: ['search_product'],
        mutationFn: async ({
            id,
            product_name,
        }: {
            id?: string
            product_name?: string
        }) => {
            if (id) {
                const { data } = await axios.get(`/api/search/product?id=${id}`)

                return data.products
            }
            if (product_name) {
                const { data } = await axios.get(
                    `/api/search/product?product_name=${product_name}`,
                )

                return data.products
            }
        },
    })
    const { data } = useQuery({
        queryKey: ['get_product'],
        queryFn: async () => {
            const { data } = await axios.get('/api/get/product?all=true')

            return data.products
        },
    })
    useEffect(() => {
        if (searchDebounce) {
            if (search.startsWith('#')) {
                mutate({ id: searchDebounce.slice(1, -1).trim() })
            } else {
                mutate({ product_name: searchDebounce })
            }
        }
    }, [searchDebounce])
    return (
        <StoreLayout>
            <div className='h-screen flex flex-col space-y-2 py-[15px] px-[30px]'>
                <span className='text-[20px] font-semibold'>Sản phẩm</span>
                <div className='relative flex flex-col space-y-4 sm:rounded-lg py-[20px]'>
                    <div className='flex items-center space-x-2'>
                        <div className='w-full relative flex flex-1 items-center'>
                            <input
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                }}
                                placeholder='Tìm kiếm theo tên sản phẩm hoặc ID'
                                className='w-full placeholder:text-[14px] outline-none border-solid border-[1px] rounded-md py-[8px] pl-[35px]'
                            />
                            <BiSearch className='absolute left-[8px] text-[20px]' />
                        </div>
                        <Link href='/store/product/add'>
                            <div className='cursor-pointer flex items-center space-x-2 px-[10px] py-[8px] border-solid border-[1px] rounded-md bg-[#fff]'>
                                Thêm sản phẩm
                            </div>
                        </Link>
                    </div>
                    <table className='w-full text-sm text-left text-gray-500 '>
                        <thead className='text-xs text-gray-700 bg-[#fff]'>
                            <tr>
                                <th
                                    scope='col'
                                    className='px-4 py-4 border-solid border-[1px]'
                                >
                                    <div className='flex items-center space-x-4'>
                                        <input
                                            placeholder='checkbox'
                                            type='checkbox'
                                            className='focus:opacity-100 cursor-pointer w-[15px] h-[15px]'
                                        />
                                        <span>Sản phẩm</span>
                                    </div>
                                </th>
                                <th
                                    scope='col'
                                    className='px-4 py-4 border-solid border-[1px]'
                                >
                                    Tên sản phẩm
                                </th>
                                <th
                                    scope='col'
                                    className='px-4 py-4 border-solid border-[1px]'
                                >
                                    Hình ảnh
                                </th>
                                <th
                                    scope='col'
                                    className='px-4 py-4 border-solid border-[1px]'
                                >
                                    Kích cỡ
                                </th>
                                <th
                                    scope='col'
                                    className='px-4 py-4 border-solid border-[1px]'
                                >
                                    Ngày tạo
                                </th>
                                <th
                                    scope='col'
                                    className='px-4 py-4 border-solid border-[1px]'
                                >
                                    Giá gốc
                                </th>
                                <th
                                    scope='col'
                                    className='px-4 py-4 border-solid border-[1px]'
                                >
                                    Giá bán
                                </th>
                                <th
                                    scope='col'
                                    className='px-4 py-4 border-solid border-[1px]'
                                >
                                    Số lượng
                                </th>
                                <th
                                    scope='col'
                                    className='px-4 py-4 border-solid border-[1px]'
                                >
                                    Tình trạng
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {search
                                ? search_product
                                    ? search_product?.map(
                                          (product: Product) => (
                                              <tr
                                                  key={product.id}
                                                  className='bg-white border-b '
                                              >
                                                  <th
                                                      scope='row'
                                                      className='p-4 font-medium text-gray-900  whitespace-nowrap'
                                                  >
                                                      <div className='flex items-center space-x-4'>
                                                          <input
                                                              placeholder='checkbox'
                                                              type='checkbox'
                                                              className='focus:opacity-100 cursor-pointer w-[15px] h-[15px]'
                                                          />
                                                          <span>{`#${product.id}`}</span>
                                                      </div>
                                                  </th>
                                                  <td className='p-2'>
                                                      <p className='max-w-[400px] line-clamp-2 hover:line-clamp-none'>
                                                          {product.name}
                                                      </p>
                                                  </td>
                                                  <td className='p-2'>
                                                      <div className='w-[100px] h-[100px]'>
                                                          <img
                                                              className='object-contain w-full h-full'
                                                              src={
                                                                  product
                                                                      .image[0]
                                                              }
                                                          />
                                                      </div>
                                                  </td>
                                                  <td className='p-2'>
                                                      {product.size}
                                                  </td>
                                                  <td className='p-2'>
                                                      {formatDate(
                                                          product.createAt,
                                                      )}
                                                  </td>
                                                  <td className='p-2'>
                                                      {product.price}
                                                  </td>
                                                  <td className='p-2'>
                                                      {product.cost}
                                                  </td>
                                                  <td className='p-2'>
                                                      {product.quantity}
                                                  </td>
                                                  <td className='p-2'>
                                                      {product.status}
                                                  </td>
                                              </tr>
                                          ),
                                      )
                                    : data?.map((product: Product) => (
                                          <tr
                                              key={product.id}
                                              className='bg-white border-b '
                                          >
                                              <th
                                                  scope='row'
                                                  className='p-4 font-medium text-gray-900  whitespace-nowrap'
                                              >
                                                  <div className='flex items-center space-x-4'>
                                                      <input
                                                          placeholder='checkbox'
                                                          type='checkbox'
                                                          className='focus:opacity-100 cursor-pointer w-[15px] h-[15px]'
                                                      />
                                                      <span>{`#${product.id}`}</span>
                                                  </div>
                                              </th>
                                              <td className='p-2'>
                                                  <p className='max-w-[400px] line-clamp-2 hover:line-clamp-none'>
                                                      {product.name}
                                                  </p>
                                              </td>
                                              <td className='p-2'>
                                                  <div className='w-[100px] h-[100px]'>
                                                      <img
                                                          className='object-contain w-full h-full'
                                                          src={product.image[0]}
                                                      />
                                                  </div>
                                              </td>
                                              <td className='p-2'>
                                                  {product.size}
                                              </td>
                                              <td className='p-2'>
                                                  {formatDate(product.createAt)}
                                              </td>
                                              <td className='p-2'>
                                                  {product.price}
                                              </td>
                                              <td className='p-2'>
                                                  {product.cost}
                                              </td>
                                              <td className='p-2'>
                                                  {product.quantity}
                                              </td>
                                              <td className='p-2'>
                                                  {product.status}
                                              </td>
                                          </tr>
                                      ))
                                : data?.map((product: Product) => (
                                      <tr
                                          key={product.id}
                                          className='bg-white border-b '
                                      >
                                          <th
                                              scope='row'
                                              className='p-4 font-medium text-gray-900  whitespace-nowrap'
                                          >
                                              <div className='flex items-center space-x-4'>
                                                  <input
                                                      placeholder='checkbox'
                                                      type='checkbox'
                                                      className='focus:opacity-100 cursor-pointer w-[15px] h-[15px]'
                                                  />
                                                  <span>{`#${product.id}`}</span>
                                              </div>
                                          </th>
                                          <td className='p-2'>
                                              <p className='max-w-[400px] line-clamp-2 hover:line-clamp-none'>
                                                  {product.name}
                                              </p>
                                          </td>
                                          <td className='p-2'>
                                              <div className='w-[100px] h-[100px]'>
                                                  <img
                                                      className='object-contain w-full h-full'
                                                      src={product.image[0]}
                                                  />
                                              </div>
                                          </td>
                                          <td className='p-2'>
                                              {product.size}
                                          </td>
                                          <td className='p-2'>
                                              {formatDate(product.createAt)}
                                          </td>
                                          <td className='p-2'>
                                              {product.price}
                                          </td>
                                          <td className='p-2'>
                                              {product.cost}
                                          </td>
                                          <td className='p-2'>
                                              {product.quantity}
                                          </td>
                                          <td className='p-2'>
                                              {product.status}
                                          </td>
                                      </tr>
                                  ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </StoreLayout>
    )
}

export default Product
export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions,
    )

    if (session?.user.role != 'admin') {
        return {
            redirect: {
                destination: '/',
                permanent: true,
            },
        }
    }
    return {
        props: {},
    }
}
