

import { z } from "zod";
import { insert } from "@/lib/mongodb"

import { redirect } from "next/navigation";
import { randomUUID } from "crypto";


export default async function Upload() {

  async function submit(form: any) {
    'use server'
    const User = z.object({
      sessionId: z.string(),
      username: z.string(),
    });

    const fields = [...form]
    const item: any = {}
    fields.map((pair: any) => {

      item[pair[0]] = pair[1]
    })

    item.sessionId = randomUUID().toString()
    var user = User.parse(item);

    await insert("karlo", "user", user)
    redirect("/booking/getstarted/" + user.sessionId)

  }
  return (

    <form action={submit}>
      <input type="text" name="username" />
      <input type="submit" name="Send" />
    </form>

  );
}