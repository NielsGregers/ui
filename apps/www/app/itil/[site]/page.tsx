

export default function Page({ params }: { params: { site: string } }) {
    return (
        <div>
            <h1>Site - {params.site}</h1>
        </div>
    )
}