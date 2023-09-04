"use client"

import { useContext, useEffect, useState } from "react"
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { MinusIcon, PlusIcon, SearchIcon } from "lucide-react"
import { Form, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast, useToast } from "@/registry/default/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog"
import { CavaContext } from "@/app/cava/cavacontext"
import { getCavaOrders } from "@/app/cava/data"
import { MagicboxContext } from "@/app/magicbox-context"

import { Item, Order, OrderItem } from "../data/schemas"
import { ResetIcon } from "@radix-ui/react-icons"

export default function Cava() {
  const cava = useContext(CavaContext)

  const [order, setorder] = useState<Order>()
  const [quantity, setquantity] = useState(0)
  const [searchfor, setsearchfor] = useState("")
  const { toast } = useToast()

  const addToOrder = (item: Item, quantity: number) => {
    const newOrder: Order = {
      items: [],
      id: "",
      deliverTo: {
        id: "",
        name: "",
        email: "",
      },
      deliveryDateTime: new Date(),
      organizer: "",
    }
    const o = order ?? newOrder

    const i = o.items.findIndex((i) => {
      return i.id === item.id
    })
    if (i >= 0) {
      o.items[i].quantity = quantity
    } else {
      const newItem: OrderItem = {
        id: item.id,
        quantity: quantity,
        price: item.price,
        item,
        deliveryHour: 0,
        deliveryMinute: 0,
      }
      o.items.push(newItem)
    }
    setorder(o)
    toast({
      title: `${item.name} added to order`,
    })
  }
  const findExistingQuantity = (item: Item, valueIfNotFound: number) => {
    const i = order?.items.find((i) => {
      return i.id === item.id
    })
    return i?.quantity ?? valueIfNotFound
  }

  const basket = () => {
    if (!order || order?.items.length < 1) return null
    if (order?.items.length > 0) {
      const totalPrice = order.items.reduce(
        (a, b) => a + b.price * b.quantity,
        0
      )

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              {order.items.length} Show order {totalPrice}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Checkout</DialogTitle>
              <DialogDescription>Confirm</DialogDescription>
            </DialogHeader>

            {order.items.map((item, key) => {
              return (
                <div key={key} className="flex items-center">
                  <ItemCard
                    view="summary"
                    item={item.item}
                    defaultQuantity={item.quantity}
                    addToOrder={addToOrder} existingQuantity={item.quantity}                  />
                </div>
              )
            })}
            <DialogFooter>
              <div>{totalPrice}</div>
              <Button type="submit">Checkout</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    }
  }

  return (
    <div className="minh-screen container">
      <div className="sticky top-14 z-10 bg-white"  >
      <div className="flex justify-between">
        <div><div>Delivery to</div>
        <div>Meeting Room</div>
        </div>
        <div className="flex-grow" />
        <div>{basket()}</div>
      </div>
      {/* <pre>
        {JSON.stringify(order, null, 2)}
      </pre> */}
      <div className=" mt-4 flex ">
        {cava?.itemGroups
          .sort((a, b) => {
            return a.sortOrder - b.sortOrder
          })
          .map((itemgroup, key) => {
            return (
              <div key={key} className="mr-3 mt-3 cursor-pointer hover:text-[#2D32A9]" onClick={()=>{
                
                
                const t = document.getElementById(encodeURI(itemgroup.name));
                //debugger;
                window.scrollTo({left:0,top:(document.getElementById(encodeURI(itemgroup.name))?.offsetTop ?? 200)-200})}} >
                
                  {itemgroup.name}
                
              </div>
            )
          })}
        <div className="grow"></div>
        <div className="flex rounded-full bg-gray-300 p-3 focus:border-blue-500 ">
          <SearchIcon className="mr-2"/>
          <input
            type="text"
            defaultValue={searchfor}
            placeholder="Search in the pricelist"
            className="border-transparent bg-gray-300 focus:border-transparent focus:ring-0"
            onChange={(e) => {
              setsearchfor(e.currentTarget.value)
            }}
          ></input>
         
          {/* <div className="minw-[20px]">
          {searchfor !== "" && 
          <ResetIcon className="ml-2 cursor-pointer" onClick={()=>setsearchfor("")} />}</div> */}
        </div>
        <hr/>
      </div>
      </div>
      <div>
        {cava?.itemGroups
          .sort((a, b) => {
            return a.sortOrder - b.sortOrder
          })
          .map((itemgroup, key) => {
            return (
              <div key={key}>
                <h2 id={encodeURI(itemgroup.name)}
                  className={"my-3 text-2xl font-bold leading-none tracking-tight"}
                >
                  {itemgroup.name}
                </h2>
                <div className="flex flex-wrap items-center ">
                  {cava?.items
                    ?.filter((item) => {
                      return item.itemGroups?.find((itemgroup2) => {
                        return (
                          itemgroup2.id === itemgroup.id &&
                          (searchfor === "" ||
                            item.name
                              .toLowerCase()
                              .includes(searchfor.toLowerCase()))
                        )
                      })
                    })
                    .sort((a, b) => {
                      return a.name.localeCompare(b.name)
                    })
                    .map((item, key) => {
                      return (
                        <div className="m-2" key={key}>
                          <ItemCard
                            view="details"
                            item={item}
                            defaultQuantity={findExistingQuantity(item, 1)}
                            existingQuantity={findExistingQuantity(item, 0)}
                            addToOrder={addToOrder}
                          />
                        </div>
                      )
                    })}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

type ItemCardProps = {
  item: Item
  view: "summary" | "details"
  defaultQuantity: number
  existingQuantity: number
  addToOrder: (item: Item, quantity: number) => void
}

function ItemCard(props: ItemCardProps) {
  const { item, defaultQuantity, addToOrder, view, existingQuantity } = props
  const [quantity, setquantity] = useState(defaultQuantity)
  const [addDialogIsOpen, setaddDialogIsOpen] = useState(false)
  useEffect(() => {
    setquantity(defaultQuantity)
  }, [item])
  if (view === "summary") {
    return (
      <div className="flex">
        <div>{item.name}</div>
        <div className="grow"></div>
        <div>
          {quantity} {item.currency.name} {item.price * quantity}
        </div>
      </div>
    )
  }
  return (
    <Dialog open={addDialogIsOpen} onOpenChange={setaddDialogIsOpen}>
      <DialogTrigger asChild>
        <Card className="minw-[350px] flex w-[500px] cursor-pointer hover:scale-105 hover:transition-transform">
          <div className="flex grow">
            <div className="grow">
              <CardHeader>
                <CardTitle>
                  <div className="flex h-[150px] flex-col">
                    <div className=" mb-2 text-xl font-bold">{item.name}</div>
                    <div className="grow text-stone-400">{item.description}</div>

                    <div className=" mb-2 text-xl font-bold  text-[#2D32A9]">
                      {item.currency.name} {item.price}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
            </div>
          </div>
          <div className="pt-3">
            <CardContent className="">
              <div className="  text-clip rounded-md">
                <div className="relative h-[150px] w-[200px] overflow-y-clip ">
                  <img src={item.imageUrl} className="rounded-md" />
                  <div className="absolute  right-0 top-0  rounded-bl-2xl rounded-tr-md bg-cyan-200 p-2">
                    {existingQuantity > 0 && (
                      <div className="pl-2 pr-2 text-2xl font-bold">
                        {existingQuantity}
                      </div>
                    )}
                    {existingQuantity < 1 && <PlusIcon />}
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription>
            Select the quantity you want to order, then click add to order.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 ">
          <div className="">
            <Image
              src={item.imageUrl}
              width={500}
              height={500}
              alt="Tapas"
              className="rounded-md"
            />

            <div className="text-[#2D32A9]">
              {item.currency.name} {item.price}
            </div>

            <div>{item.description}</div>
          </div>
          <div className="flex">
            <MinusIcon
              className="cursor-pointer"
              onClick={() => {
                if (quantity > 0) setquantity(quantity - 1)
              }}
            />
            <div>{quantity} </div>
            <PlusIcon
              className="cursor-pointer"
              onClick={() => setquantity(quantity + 1)}
            />
            <div className="grow"> </div>
            <Button
              type="button"
              onClick={() => {
                addToOrder(item, quantity)
                setaddDialogIsOpen(false)
              }}
            >
              Add to order {item.currency.name} {item.price * quantity}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
