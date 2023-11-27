import { da, th } from "date-fns/locale"

export const v = 1
type onTagAdded = (tag: string, data: string) => void
export interface ISubscriptionType {
  id: number
  tags: string[]
  onTagAdded: onTagAdded
}

export class ShippingMan {
  private _subscriptions: Map<number, ISubscriptionType> = new Map()
  private _nextId: number = 0
  constructor() {}
  public subscribe(tags: string[], onTagAdded: onTagAdded): number {
    const id = this._nextId++
    const subscription: ISubscriptionType = {
      id,
      tags,
      onTagAdded,
    }
    this._subscriptions.set(id, subscription)

    return id
  }
  public unsubscribe(id: number) {
    if (!this._subscriptions.has(id)) return
    this._subscriptions.delete(id)
  }

  public announce(tag: string, data: string) {
    this._subscriptions.forEach((subscription) => {
      if (subscription.tags.includes(tag)) {
        subscription.onTagAdded(tag, data)
      }
    })
  }
}

export function tagsToNames(tags: string[]): string[] {
  const names = tags.map((tag) => {
    const s = tag.split(" ")
    return s[0]
  })

  return names
}
