import axios from 'axios'
import { GetServerSideProps } from 'next'
type Product = {
    parentProductId: any
    id: string
    name: string
    image: string[]
    cost: number
    price: number
    quantity: number
    size: string
    slug: string
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
const Sitemap = () => {}

const xml_build_product = (baseUrl: string, products: Product[]) => {
    const items = products?.map((product: Product) => {
        try {
            return `<url>
        <loc>${baseUrl}/product/${product.slug}</loc>
        <news:news>
          <news:publication>
            <news:name>${(product.name || 'N/A')
                .trim()
                .replace(/&/, '&amp;')}</news:name>
            <news:language>VN</news:language>
          </news:publication>
          <news:publication_date>${new Date(
              product.createAt,
          ).toISOString()}</news:publication_date>
        </news:news>
      </url>`
        } catch (e) {
            console.log(e)
        }
    })

    return items
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const baseUrl =
        process.env.NODE_ENV == 'production'
            ? process.env.NEXT_PUBLIC_BASE_URL
            : 'http://localhost:3000'

    const { data: product_data } = await axios.get(
        `${baseUrl}/api/get/product?all=true`,
    )

    const products = product_data?.products

    const { data: category_data } = await axios.get(
        `${baseUrl}/api/get/category?all=true`,
    )

    const categorys = category_data?.categorys
    const url = [
        '',
        'login',
        'cart',
        'store/product',
        'store/product/add',
        'store/order/tat-ca',
        'store/order/da-thanh-toan',
        'store/order/chua-thanh-toan',
        'checkout',
        'category/all',
        ...categorys?.map(
            (category: { id: string; slug: string; name: string }) =>
                `/category/${category.slug}`,
        ),
    ]
        .map((path: string) => `<url><loc>${baseUrl}/${path} </loc></url>`)
        .join('')

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    ${url}
   
    ${xml_build_product(baseUrl as string, products).join('')}</urlset>`

    sitemap = sitemap.replace(
        /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm,
        '',
    )

    context.res.setHeader('Content-Type', 'text/xml')
    context.res.write(sitemap)
    context.res.end()

    return {
        props: {},
    }
}

export default Sitemap
