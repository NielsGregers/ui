export function PageContextHeader(props: {title:string}){
    const {title} = props
    return <div className="m-3 ml-0 rounded-xl bg-slate-800 text-gray-50">
		<div className="ml-3 p-4 text-3xl">{title} </div>

</div>
}