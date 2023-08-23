import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { AddProductComponent } from '~/Components'
import React from 'react'
import StoreLayout from '~/layout/StoreLayout'
import { authOptions } from '~/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

const add = () => {
    return (
        <StoreLayout>
            <AddProductComponent />
        </StoreLayout>
    )
}

export default add
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
