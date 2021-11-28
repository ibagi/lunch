import Layout from "../components/Layout"
import { getProvider } from "../providers"
import { getIndexByCurrentDay } from "../utils/date"

export default function RestaurantPage({ data }) {
    return (
        <Layout data={data} />
    )
}

export async function getServerSideProps({ params }) {
    const provider = getProvider(params.restaurant)
    const { menu } =  await provider.getData()
    const actualIndex = getIndexByCurrentDay(menu)
    menu[actualIndex].actual = true

    return {
        props: {
            data: {
                name: provider.display,
                menu
            }
        }
    }
}