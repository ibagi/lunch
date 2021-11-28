import Card from './Card'

export default function MenuContent({ menu }) {
    return (
        <section className="flex-grow p-2 bg-gray-200">
            <div className="p-5 flex flex-row justify-center">
                <h2 className="text-gray-600 font-bold text-3xl">
                    {menu.header}
                </h2>
            </div>
            <div className="flex flex-row justify-center">
                {menu.items.map(item => <Card key={item} title={item} />)}
            </div>
        </section>
    )
}