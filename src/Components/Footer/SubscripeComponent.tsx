import React from 'react'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import SubscribeFormComponent from '../Form/SubscribeFormComponent'

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
