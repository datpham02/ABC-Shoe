import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { BiSearch } from 'react-icons/bi'
import { LoadingComponent } from '~/Components'
import StoreLayout from '~/layout/StoreLayout'
import { authOptions } from '../api/auth/[...nextauth]'
import axios from 'axios'
import { formatVietnameseDong } from '~/utils/func'
import { getServerSession } from 'next-auth'
import useDebounce from '~/utils/hook/useDebounce'

type Customer = {
    id: string
    name: string
    email: string
    emailVerified: any
    image: string
    role: string
    order: Order[]
}

type Order = {
    id: string
    status: string
    total: number
    createAt: string
    updateAt: string
    userId: string
    orderItem: OrderItem[]
}

type OrderItem = {
    product: Product
    quantity: number
}

type Product = {
    id: string
    name: string
    description: string
    price: number
    image: string[]
}

const Customer = () => {
    const [search, setSearch] = useState<string>('')
    const searchDebounce = useDebounce(search, 500)
    const { data: search_customer, mutate } = useMutation({
        mutationKey: ['search_customer'],
        mutationFn: async ({
            id,
            customer_name,
        }: {
            id?: string
            customer_name?: string
        }) => {
            if (id) {
                const { data } = await axios.get(
                    `/api/search/customer?id=${id}`,
                )

                return data.customers
            }
            if (customer_name) {
                const { data } = await axios.get(
                    `/api/search/customer?customer_name=${customer_name}`,
                )

                return data.customers
            }
        },
    })
    const { data, isLoading } = useQuery({
        queryKey: ['get_customer'],
        queryFn: async () => {
            const { data } = await axios.get('/api/get/customer?all=true')

            return data.customers
        },
    })

    useEffect(() => {
        if (searchDebounce) {
            if (search.startsWith('#')) {
                mutate({ id: searchDebounce.slice(1, -1).trim() })
            } else {
                mutate({ customer_name: searchDebounce })
            }
        }
    }, [searchDebounce])

    return (
        <StoreLayout>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <div className='h-screen flex flex-col space-y-2 py-[15px] px-[30px]'>
                    <span className='text-[20px] font-semibold'>
                        Khách hàng
                    </span>
                    <div className='relative flex flex-col space-y-4 sm:rounded-lg py-[20px]'>
                        <div className='flex items-center space-x-2'>
                            <div className='w-full relative flex flex-1 items-center'>
                                <input
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                    }}
                                    placeholder='Tìm kiếm theo tên khách hàng hoặc ID'
                                    className='w-full placeholder:text-[14px] outline-none border-solid border-[1px] rounded-md py-[8px] pl-[35px]'
                                />
                                <BiSearch className='absolute left-[8px] text-[20px]' />
                            </div>
                        </div>
                        <table className='w-full text-sm text-left text-gray-500 '>
                            <thead className='text-xs text-gray-700 bg-[#fff]'>
                                <tr>
                                    <th
                                        scope='col'
                                        className='px-6 py-4 border-solid border-[1px]'
                                    >
                                        <div className='flex items-center space-x-4'>
                                            {/* <input
                                            placeholder='checkbox'
                                            type='checkbox'
                                            className='focus:opacity-100 cursor-pointer w-[15px] h-[15px]'
                                        /> */}
                                            <span>Khách hàng</span>
                                        </div>
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-4 border-solid border-[1px]'
                                    >
                                        Tên khách hàng
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-4 border-solid border-[1px]'
                                    >
                                        Hình ảnh
                                    </th>

                                    <th
                                        scope='col'
                                        className='px-6 py-4 border-solid border-[1px]'
                                    >
                                        Số lượng sản phẩm đã mua
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-4 border-solid border-[1px]'
                                    >
                                        Số tiền tiêu thụ
                                    </th>
                                </tr>
                            </thead>

                            {search
                                ? search_customer
                                    ? search_customer?.map(
                                          (customer: Customer) => (
                                              <tbody key={customer.id}>
                                                  <tr className='bg-white border-b '>
                                                      <th
                                                          scope='row'
                                                          className='px-6 py-4 font-medium text-gray-900  whitespace-nowrap'
                                                      >
                                                          <div className='flex items-center space-x-4'>
                                                              {/* <input
                                                placeholder='checkbox'
                                                type='checkbox'
                                                className='focus:opacity-100 cursor-pointer w-[15px] h-[15px]'
                                            /> */}
                                                              <span>{`#${customer.id}`}</span>
                                                          </div>
                                                      </th>
                                                      <td className='px-6 py-4'>
                                                          <p>{customer.name}</p>
                                                      </td>
                                                      <td className='px-6 py-4'>
                                                          <div className='w-[100px] h-[100px]'>
                                                              <img
                                                                  className='object-cover'
                                                                  src={
                                                                      customer.image
                                                                  }
                                                              />
                                                          </div>
                                                      </td>

                                                      <td className='px-6 py-4'>
                                                          {customer.order.reduce(
                                                              (
                                                                  total_product,
                                                                  order,
                                                              ) => {
                                                                  return (
                                                                      total_product +
                                                                      order.orderItem.reduce(
                                                                          (
                                                                              total,
                                                                              ordeItem,
                                                                          ) => {
                                                                              return (
                                                                                  total +
                                                                                  ordeItem.quantity
                                                                              )
                                                                          },
                                                                          0,
                                                                      )
                                                                  )
                                                              },
                                                              0,
                                                          )}
                                                      </td>
                                                      <td className='px-6 py-4'>
                                                          {formatVietnameseDong(
                                                              customer.order.reduce(
                                                                  (
                                                                      total_product,
                                                                      order,
                                                                  ) => {
                                                                      return (
                                                                          total_product +
                                                                          order.orderItem.reduce(
                                                                              (
                                                                                  total,
                                                                                  ordeItem,
                                                                              ) => {
                                                                                  return (
                                                                                      total +
                                                                                      ordeItem.quantity *
                                                                                          ordeItem
                                                                                              .product
                                                                                              .price
                                                                                  )
                                                                              },
                                                                              0,
                                                                          )
                                                                      )
                                                                  },
                                                                  0,
                                                              ),
                                                          )}
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          ),
                                      )
                                    : data?.map((customer: Customer) => (
                                          <tbody key={customer.id}>
                                              <tr className='bg-white border-b '>
                                                  <th
                                                      scope='row'
                                                      className='px-6 py-4 font-medium text-gray-900  whitespace-nowrap'
                                                  >
                                                      <div className='flex items-center space-x-4'>
                                                          {/* <input
                                                placeholder='checkbox'
                                                type='checkbox'
                                                className='focus:opacity-100 cursor-pointer w-[15px] h-[15px]'
                                            /> */}
                                                          <span>{`#${customer.id}`}</span>
                                                      </div>
                                                  </th>
                                                  <td className='px-6 py-4'>
                                                      <p>{customer.name}</p>
                                                  </td>
                                                  <td className='px-6 py-4'>
                                                      <div className='w-[100px] h-[100px]'>
                                                          <img
                                                              className='object-cover'
                                                              src={
                                                                  customer.image
                                                              }
                                                          />
                                                      </div>
                                                  </td>

                                                  <td className='px-6 py-4'>
                                                      {customer.order.reduce(
                                                          (
                                                              total_product,
                                                              order,
                                                          ) => {
                                                              return (
                                                                  total_product +
                                                                  order.orderItem.reduce(
                                                                      (
                                                                          total,
                                                                          ordeItem,
                                                                      ) => {
                                                                          return (
                                                                              total +
                                                                              ordeItem.quantity
                                                                          )
                                                                      },
                                                                      0,
                                                                  )
                                                              )
                                                          },
                                                          0,
                                                      )}
                                                  </td>
                                                  <td className='px-6 py-4'>
                                                      {formatVietnameseDong(
                                                          customer.order.reduce(
                                                              (
                                                                  total_product,
                                                                  order,
                                                              ) => {
                                                                  return (
                                                                      total_product +
                                                                      order.orderItem.reduce(
                                                                          (
                                                                              total,
                                                                              ordeItem,
                                                                          ) => {
                                                                              return (
                                                                                  total +
                                                                                  ordeItem.quantity *
                                                                                      ordeItem
                                                                                          .product
                                                                                          .price
                                                                              )
                                                                          },
                                                                          0,
                                                                      )
                                                                  )
                                                              },
                                                              0,
                                                          ),
                                                      )}
                                                  </td>
                                              </tr>
                                          </tbody>
                                      ))
                                : data?.map((customer: Customer) => (
                                      <tbody key={customer.id}>
                                          <tr className='bg-white border-b '>
                                              <th
                                                  scope='row'
                                                  className='px-6 py-4 font-medium text-gray-900  whitespace-nowrap'
                                              >
                                                  <div className='flex items-center space-x-4'>
                                                      {/* <input
                                                placeholder='checkbox'
                                                type='checkbox'
                                                className='focus:opacity-100 cursor-pointer w-[15px] h-[15px]'
                                            /> */}
                                                      <span>{`#${customer.id}`}</span>
                                                  </div>
                                              </th>
                                              <td className='px-6 py-4'>
                                                  <p>{customer.name}</p>
                                              </td>
                                              <td className='px-6 py-4'>
                                                  <div className='w-[100px] h-[100px]'>
                                                      <img
                                                          className='object-cover'
                                                          src={customer.image}
                                                      />
                                                  </div>
                                              </td>

                                              <td className='px-6 py-4'>
                                                  {customer.order.reduce(
                                                      (
                                                          total_product,
                                                          order,
                                                      ) => {
                                                          return (
                                                              total_product +
                                                              order.orderItem.reduce(
                                                                  (
                                                                      total,
                                                                      ordeItem,
                                                                  ) => {
                                                                      return (
                                                                          total +
                                                                          ordeItem.quantity
                                                                      )
                                                                  },
                                                                  0,
                                                              )
                                                          )
                                                      },
                                                      0,
                                                  )}
                                              </td>
                                              <td className='px-6 py-4'>
                                                  {formatVietnameseDong(
                                                      customer.order.reduce(
                                                          (
                                                              total_product,
                                                              order,
                                                          ) => {
                                                              return (
                                                                  total_product +
                                                                  order.orderItem.reduce(
                                                                      (
                                                                          total,
                                                                          ordeItem,
                                                                      ) => {
                                                                          return (
                                                                              total +
                                                                              ordeItem.quantity *
                                                                                  ordeItem
                                                                                      .product
                                                                                      .price
                                                                          )
                                                                      },
                                                                      0,
                                                                  )
                                                              )
                                                          },
                                                          0,
                                                      ),
                                                  )}
                                              </td>
                                          </tr>
                                      </tbody>
                                  ))}
                        </table>
                    </div>
                </div>
            )}
        </StoreLayout>
    )
}

export default Customer
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
