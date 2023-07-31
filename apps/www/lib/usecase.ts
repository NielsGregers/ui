import { TypeOf, ZodType } from "zod"

type Methods = "POST" | "GET" | "PUT" | "DELETE" | "PATCH"
export interface IResult<T> {
    data: T
    hasError: boolean
    error?: any
}


export async function  UseCase<I extends ZodType<any>,O extends ZodType<any>>(method:Methods, url: string, input: TypeOf<I>,inputSchema:I,outputSchema:O,) : Promise<IResult<TypeOf<O>>> {
  const parsedInput = inputSchema.safeParse(input)
  if(!parsedInput.success){
    return {
      data: undefined,
      hasError: true,
      error: parsedInput.error
    }
  }
  const response = await fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.

    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(input), // body data type must match "Content-Type" header
})

if (response.status !== 200) {
  return {
    data: undefined,
    hasError: true,
    error: response.statusText
  }
}

const output = await response.json()

  const parsedOutput = outputSchema.safeParse(output)
  if(!parsedOutput.success){
    return {
      data: undefined,
      hasError: true,
      error: parsedOutput.error
    }
  }
  return {
    data: parsedOutput.data,
    hasError: false,
    error: undefined
  }
}


