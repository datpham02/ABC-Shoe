import React from 'react'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import {
    AddProductComponent,
    ClassifyComponent,
    EditorComponent,
} from '~/Components'
import StoreLayout from '~/layout/StoreLayout'

const Add = () => {
    const methods = useForm()

    const onSubmit = (data: any) => console.log(data)

    return (
        <StoreLayout>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <AddProductComponent />
                </form>
            </FormProvider>
        </StoreLayout>
    )
}

export default Add
