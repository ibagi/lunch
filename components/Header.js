export default function Header({ title }) {
    return (
        <section className="flex flex-row justify-between bg-white shadow-sm p-5">
            <h1 className="font-bold text-xl">
                Lunch
            </h1>
            <div className="font-bold text-xl text-green-500">
                {title}
            </div>
        </section>
    )
}