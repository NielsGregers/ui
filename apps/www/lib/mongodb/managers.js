
import { aggregate } from "."
export default async function index() {
    var docs = await aggregate("sap",[
        {
            '$match': {
                'employeeType': 'X'
            }
        }, {
            '$unset': [
                '_id'
            ]
        }  ,
        {
            '$sort': {
                'NetsDepartmentNumber': 1
            }}
    ]

    )

    return docs
}

