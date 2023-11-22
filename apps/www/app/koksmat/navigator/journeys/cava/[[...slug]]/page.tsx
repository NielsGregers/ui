"use client"


export default function Page(props: {
  params: { slug: string[] }
}) {
  const { slug} = props.params


  return (
    <pre className="font-serif text-2xl">
     {JSON.stringify(props.params,undefined,2)}
    </pre>
  )
}
