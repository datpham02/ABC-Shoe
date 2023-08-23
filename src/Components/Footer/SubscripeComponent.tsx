import React from 'react'
import SubscribeFormComponent from './SubscribeFormComponent'
import dynamic from 'next/dynamic'

const MailchimpSubscribe = dynamic(import('react-mailchimp-subscribe'), {
    ssr: false,
})
const SubscripeComponent = () => {
    return (
        <MailchimpSubscribe
            url={process.env.NEXT_PUBLIC_MAIL_CHIP_URL as string}
            render={({ subscribe, status, message }) => (
                <SubscribeFormComponent
                    status={status as string}
                    submit={subscribe}
                />
            )}
        />
    )
}

export default SubscripeComponent
