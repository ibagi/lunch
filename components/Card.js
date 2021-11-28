export default function MenuCard({ title }) {
    return (
        <div className="mx-5 rounded shadow bg-white w-64 text-gray-800">
            <img className="h-28 w-full" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsinglestroke.io%2Fwp-content%2Fuploads%2F2015%2F10%2Fhigh-quality-food-stock-photos-thumbnail.jpg&f=1&nofb=1"/>
            <div className="p-5">
            {title}
                </div>
        </div>
    )
}