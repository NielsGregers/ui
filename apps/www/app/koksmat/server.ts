"use server"

import { Result } from "@/lib/httphelper"
import { spawn } from "child_process"
import { cwd } from "process"

const createRoot = (timeout: number): Promise<Result<string>> => {
  return new Promise((resolve, reject) => {
    let stdoutput = ""
    let stderror = ""
    const result : Result<string> = {
      hasError: false,
      errorMessage: "",
      data: "",
    }
    const timer = setTimeout(() => {
      reject("Timeout")
    }, timeout * 1000)
    const koksmat = spawn("az", [])

    koksmat.stdout.on("data", (data) => {
      stdoutput += data
      console.log(`koksmat stdout: ${data}`)
    })

    koksmat.stderr.on("data", (data) => {
      stderror += data  
      console.log(`koksmat stderr: ${data}`)
    })

    koksmat.on("error", (error) => {
      stderror += error.message
      console.error(`koksmat error: ${error.message}`)
      clearTimeout(timer)
      result.hasError = true  
      result.data = error.message + "\nOutput so far:\n" + stdoutput + "\Errors so far:\n" + stderror
      resolve(result)
    })

    koksmat.on("close", (code) => {
      clearTimeout(timer)
      console.log(`koksmat child process exited with code ${code}`)
      result.data = stdoutput
      resolve(result)
    })
  })
}

export async function test() {
  const t = await createRoot(2)
  return t.data
}
