import Header from './Header'
import Content from './Content'
import Footer from './Footer'

export default function Layout({ data }) {
    const menu = data.menu.find(m => m.actual)

    return (
        <main className="h-full flex flex-col">
            <Header title={data.name} />
            <Content menu={menu} />
            <Footer data={data.menu} />
        </main>        
    )
}