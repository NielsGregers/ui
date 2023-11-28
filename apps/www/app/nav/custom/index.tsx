import { customComponentKey } from "..";
import {default as cava} from "./cava"

export default function getCustomization(journey:string,slug:string)
{

    const key = customComponentKey(slug) ?? ""
    
    switch (journey) {
        case "cava":
            return cava(key)
            break;
    
        default:
            return null
            break;
    }
}
//   