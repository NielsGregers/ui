import { connect } from "./mongodb"

type ConfigProps = {
  key: string
  date: Date
  debugging: boolean
  database: string
  mongodb: string
  nextauth_url: string
  nextauth_secret: string
  github_id: string
  github_secret: string
  azure_ad_client_id: string
  azure_ad_client_secret: string
  azure_ad_tenant_id: string
  spauth_clientsecret: string
  spauth_clientid: string
  spauth_siteurl: string
  spauth_tenantname: string
  spauth_tenantid: string
  vizito_auth: string
}

const defaultConfig: ConfigProps = {
  key: "",
  date: new Date(),
  debugging: false,
  database: "christianiabpos",
  mongodb:
    "mongodb://databaseAdmin:tcmsJ4hGXqjiPeNwfbH@localhost:27017/?directConnection=true&authMechanism=DEFAULT&tls=false",
  nextauth_url: "http://localhost:4321",
  nextauth_secret: "1fdas325esdv",
  github_id: "Iv1.831c3577bb626e67",
  github_secret: "68b2b3d7eba96a30def12179307a557118ad5df1",
  azure_ad_client_id: "902987fd-0ebd-4963-a92b-f200990bb176",
  azure_ad_client_secret: "x7B8Q~hkBRvVk3kaewNZhCfkdhXwiw2cRq8wbaWS",
  azure_ad_tenant_id: "79dc228f-c8f2-4016-8bf0-b990b6c72e98",
  spauth_clientsecret: "EqB2yuykFi7THQ4KICwi5SJHuCzR[-[@",
  spauth_clientid: "0ab48e1a-3543-44c3-916c-e64dd7b2835c",
  spauth_siteurl: "https://christianiabpos.sharepoint.com/sites/cava3",
  spauth_tenantname: "christianiabpos",
  spauth_tenantid: "79dc228f-c8f2-4016-8bf0-b990b6c72e98",
  vizito_auth: "Basic bmdqb2hAbmV0cy5ldTpFbWxuMzA2MCE=",
}

export class Config {
  static _instance: Config
  private _config: ConfigProps = defaultConfig

  constructor(config: ConfigProps) {
    this._config = config
  }

  static async getInstance(key: string) {
    if (!Config._instance) {
      const client = await connect()

      const _config = await client
        .db("magicbox")
        .collection<ConfigProps>("config")
        .findOne({ key })
      client.close()
      Config._instance = new Config(_config ?? defaultConfig)
    }
    return Config._instance
  }

  static async saveInstance(key: string) {
    const client = await connect()
    const instance: ConfigProps = { ...defaultConfig, key }
    await client
      .db("magicbox")
      .collection<ConfigProps>("config")
      .insertOne(instance)

    client.close()
  }

  public get debugging(): boolean {
    return this._config.debugging
  }

  public get database(): string {
    return this._config.database
  }

  public get mongodb(): string {
    return this._config.mongodb
  }

  public get nextauth_url(): string {
    return this._config.nextauth_url
  }

  public get nextauth_secret(): string {
    return this._config.nextauth_secret
  }

  public get github_id(): string {
    return this._config.github_id
  }

  public get github_secret(): string {
    return this._config.github_secret
  }

  public get azure_ad_client_id(): string {
    return this._config.azure_ad_client_id
  }

  public get azure_ad_client_secret(): string {
    return this._config.azure_ad_client_secret
  }

  public get azure_ad_tenant_id(): string {
    return this._config.azure_ad_tenant_id
  }

  public get spauth_clientsecret(): string {
    return this._config.spauth_clientsecret
  }

  public get spauth_clientid(): string {
    return this._config.spauth_clientid
  }

  public get spauth_siteurl(): string {
    return this._config.spauth_siteurl
  }

  public get spauth_tenantname(): string {
    return this._config.spauth_tenantname
  }

  public get spauth_tenantid(): string {
    return this._config.spauth_tenantid
  }

  public get vizito_auth(): string {
    return this._config.vizito_auth
  }
}
