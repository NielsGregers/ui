export {default as Port} from "./PortDefault"
export {default as Container} from "./ContainerDefault"

export function getLevels(slug:string[]){
    function valueFromSlug(pos:number,defaultValue?:string) {
        if (!slug) return defaultValue ?? "";
        return slug.length >= (pos+1) ? decodeURIComponent( slug[pos]) : defaultValue ?? "";
    }
    const port = valueFromSlug(1) === "port" ?  valueFromSlug(2) : ""
    const container=   (port && valueFromSlug(3) === "container") ? valueFromSlug(4) : ""
    return {
        journey : valueFromSlug(0),
        
        port ,
        container

    }

   
}