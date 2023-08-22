import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import StoreLayout from '~/layout/StoreLayout'
import { formatDate, formatVietnameseDong } from '~/utils/func'
import useDebounce from '~/utils/hook/useDebounce'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import Link from 'next/link'

type Order = {
    id: string
    customer: Customer
    createAt: string
    status: string
    total: number
    orderItem: OrderItem[]
}

type Customer = {
    name: string
    email: string
    image: string
}

type OrderItem = {
    product: Product
    quantity: number
}

type Product = {
    name: string
    image: string[]
    price: number
    size: string
}

const Order = ({ type }: { type: string }) => {
    const [search, setSearch] = useState<string>('')
    const searchDebounce = useDebounce(search, 500)
    const { data: search_order, mutate } = useMutation({
        mutationKey: ['search_order'],
        mutationFn: async ({
            id,
            customer_name,
        }: {
            id?: string
            customer_name?: string
        }) => {
            if (id) {
                const { data } = await axios.get(`/api/search/order?id=${id}`)

                return data.orders
            }
            if (customer_name) {
                const { data } = await axios.get(
                    `/api/search/order?customer_name=${customer_name}`,
                )

                return data.orders
            }
        },
    })
    const { data: orders, mutate: getData } = useMutation({
        mutationKey: ['order_statistics'],
        mutationFn: async () => {
            const { data } = await axios.get(`/api/get/order?type=${type}`)

            return data.orders
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
    useEffect(() => {
        if (type) {
            getData()
        }
    }, [type])
    return (
        <StoreLayout>
            <div className='h-screen flex flex-col space-y-2 py-[15px] px-[30px]'>
                <span className='text-[20px] font-semibold'>Đơn hàng</span>
                <div className='flex flex-col'>
                    <div className='bg-[#fff] flex items-center space-x-2 py-[10px] px-[20px] border-b-[1px] rounded-sm'>
                        {type == 'tat-ca' ? (
                            <span className='cursor-pointer px-[10px] py-[5px] font-medium border-b-[2px] border-b-[blue]'>
                                Tất cả
                            </span>
                        ) : (
                            <Link href='/store/order/tat-ca'>
                                <span className='cursor-pointer px-[10px] py-[5px]'>
                                    Tất cả
                                </span>
                            </Link>
                        )}
                        {type == 'da-thanh-toan' ? (
                            <span className='cursor-pointer px-[10px] py-[5px] font-medium border-b-[2px] border-b-[blue]'>
                                Đã thanh toán
                            </span>
                        ) : (
                            <Link href={'/store/order/da-thanh-toan'}>
                                <span className='cursor-pointer px-[10px] py-[5px]'>
                                    Đã thanh toán
                                </span>
                            </Link>
                        )}
                        {type == 'chua-thanh-toan' ? (
                            <span className='cursor-pointer px-[10px] py-[5px] font-medium border-b-[2px] border-b-[blue]'>
                                Chưa thanh toán
                            </span>
                        ) : (
                            <Link href={'/store/order/chua-thanh-toan'}>
                                <span className='cursor-pointer px-[10px] py-[5px]'>
                                    Chưa thanh toán
                                </span>
                            </Link>
                        )}
                    </div>
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
                                            Đơn hàng
                                        </div>
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-4 border-solid border-[1px]'
                                    >
                                        Ngày đặt
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-4 border-solid border-[1px]'
                                    >
                                        Khách hàng
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-4 border-solid border-[1px]'
                                    >
                                        Thành tiền
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-4 border-solid border-[1px]'
                                    >
                                        Tình trạng thanh toán
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-3 border-solid border-[1px]'
                                    >
                                        Số lượng sản phẩm
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {search
                                    ? search_order
                                        ? search_order?.map((order: Order) => (
                                              <tr
                                                  key={order.id}
                                                  className='bg-white border-b '
                                              >
                                                  <th
                                                      scope='row'
                                                      className='px-6 py-4 font-medium text-gray-900  whitespace-nowrap'
                                                  >
                                                      <div className='flex items-center space-x-4'>
                                                          {`#${order.id}`}
                                                      </div>
                                                  </th>
                                                  <td className='px-6 py-4'>
                                                      {formatDate(
                                                          order.createAt,
                                                      )}
                                                  </td>
                                                  <td className='px-6 py-4'>
                                                      {order.customer.name}
                                                  </td>
                                                  <td className='px-6 py-4'>
                                                      {formatVietnameseDong(
                                                          order.total,
                                                      )}
                                                  </td>
                                                  <td className='px-6 py-4'>
                                                      <div className='flex justify-start w-full'>
                                                          {order.status ==
                                                          'Đã thanh toán' ? (
                                                              <span className='bg-[#0be881] text-center text-white px-2.5 py-1 rounded'>
                                                                  {order.status}
                                                              </span>
                                                          ) : (
                                                              <span className='bg-[red] text-center text-white px-2.5 py-1 rounded'>
                                                                  {order.status}
                                                              </span>
                                                          )}
                                                      </div>
                                                  </td>
                                                  <td className='px-6 py-4'>
                                                      {order.orderItem.reduce(
                                                          (
                                                              sum_quantity,
                                                              product,
                                                          ) => {
                                                              return (
                                                                  sum_quantity +
                                                                  product.quantity
                                                              )
                                                          },
                                                          0,
                                                      )}
                                                  </td>
                                              </tr>
                                          ))
                                        : orders?.map((order: Order) => (
                                              <tr
                                                  key={order.id}
                                                  className='bg-white border-b '
                                              >
                                                  <th
                                                      scope='row'
                                                      className='px-6 py-4 font-medium text-gray-900  whitespace-nowrap'
                                                  >
                                                      <div className='flex items-center space-x-4'>
                                                          {`#${order.id}`}
                                                      </div>
                                                  </th>
                                                  <td className='px-6 py-4'>
                                                      {formatDate(
                                                          order.createAt,
                                                      )}
                                                  </td>
                                                  <td className='px-6 py-4'>
                                                      {order.customer.name}
                                                  </td>
                                                  <td className='px-6 py-4'>
                                                      {formatVietnameseDong(
                                                          order.total,
                                                      )}
                                                  </td>
                                                  <td className='px-6 py-4'>
                                                      <div className='flex justify-start w-full'>
                                                          {order.status ==
                                                          'Đã thanh toán' ? (
                                                              <span className='bg-[#0be881] text-center text-white px-2.5 py-1 rounded'>
                                                                  {order.status}
                                                              </span>
                                                          ) : (
                                                              <span className='bg-[red] text-center text-white px-2.5 py-1 rounded'>
                                                                  {order.status}
                                                              </span>
                                                          )}
                                                      </div>
                                                  </td>
                                                  <td className='px-6 py-4'>
                                                      {order.orderItem.reduce(
                                                          (
                                                              sum_quantity,
                                                              product,
                                                          ) => {
                                                              return (
                                                                  sum_quantity +
                                                                  product.quantity
                                                              )
                                                          },
                                                          0,
                                                      )}
                                                  </td>
                                              </tr>
                                          ))
                                    : orders?.map((order: Order) => (
                                          <tr
                                              key={order.id}
                                              className='bg-white border-b '
                                          >
                                              <th
                                                  scope='row'
                                                  className='px-6 py-4 font-medium text-gray-900  whitespace-nowrap'
                                              >
                                                  <div className='flex items-center space-x-4'>
                                                      {`#${order.id}`}
                                                  </div>
                                              </th>
                                              <td className='px-6 py-4'>
                                                  {formatDate(order.createAt)}
                                              </td>
                                              <td className='px-6 py-4'>
                                                  {order.customer.name}
                                              </td>
                                              <td className='px-6 py-4'>
                                                  {formatVietnameseDong(
                                                      order.total,
                                                  )}
                                              </td>
                                              <td className='px-6 py-4'>
                                                  <div className='flex justify-start w-full'>
                                                      {order.status ==
                                                      'Đã thanh toán' ? (
                                                          <span className='bg-[#0be881] text-center text-white px-2.5 py-1 rounded'>
                                                              {order.status}
                                                          </span>
                                                      ) : (
                                                          <span className='bg-[red] text-center text-white px-2.5 py-1 rounded'>
                                                              {order.status}
                                                          </span>
                                                      )}
                                                  </div>
                                              </td>
                                              <td className='px-6 py-4'>
                                                  {order.orderItem.reduce(
                                                      (
                                                          sum_quantity,
                                                          product,
                                                      ) => {
                                                          return (
                                                              sum_quantity +
                                                              product.quantity
                                                          )
                                                      },
                                                      0,
                                                  )}
                                              </td>
                                          </tr>
                                      ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </StoreLayout>
    )
}

export default Order

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async (
    context: GetStaticPropsContext,
) => {
    if (context?.params?.type) {
        return {
            props: {
                type: context?.params?.type as string,
            },
        }
    }

    return {
        notFound: true,
    }
}
