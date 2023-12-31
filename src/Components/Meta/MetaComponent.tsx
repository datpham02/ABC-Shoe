import { FC } from 'react'
import Head from 'next/head'

interface MetaProps {
    title: string
    description: string
    image: string
    url: string
    adsense?: any
}

const Meta: FC<MetaProps> = ({ title, description, image, url }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name='title' content={title} />
            <meta name='description' content={description} />

            <meta property='og:type' content='website' />
            <meta property='og:url' content={url} />
            <meta property='og:title' content={title} />
            <meta property='og:description' content={description} />
            <meta property='og:image' content={image} />

            <meta property='twitter:card' content='summary_large_image' />
            <meta property='twitter:url' content={url} />
            <meta property='twitter:title' content={title} />
            <meta property='twitter:description' content={description} />
            <meta property='twitter:image' content={image} />
            <link rel='icon' href='/abc.png' />
        </Head>
    )
}

export default Meta
