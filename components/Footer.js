export default function Footer({ data }) {
    return (
        <footer className="bg-white p-3 flex flex-row justify-around border-t-2 border-green-500">
            {data.map(m => (
                <div key={m.header}>
                    <div className="font-bold text-center" key={m.header}>{m.header}</div>
                    <ul className="my-2 text-center">
                        {m.items.map(i => (
                            <li className="text-sm text-gray-600" key={i}>{i}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </footer>
    )
}