

export default function Page({ params }: { params: { site: string,releaseid:string } }) {
    return (
        <div>
            <h1>Release: {params.releaseid} in site {params.site}</h1>
        </div>
    )
}