"use server"

import * as fs from "fs"
import * as path from "path"

import { TreeNode, displayNameFromFilename, isHiddenFromFilename } from "."

function nodesFromDirectory(dirName: string): TreeNode[] {
  const dir = fs.readdirSync(dirName, { withFileTypes: true })

  const leafs = dir.map((file) => {
    const filePath = path.join(dirName, file.name)
    const title = file.name

    const children = file.isDirectory() ? nodesFromDirectory(filePath) : []
    //const properties any[] = [] //file.isFile() ? getProperties(filePath) : undefined
    return {
      filename: title,

      isHidden: isHiddenFromFilename(title),
      displayName: displayNameFromFilename(title),
      isDirectory: file.isDirectory(),
      children,
      path: filePath,
    } as TreeNode
  })
  return leafs
}

export async function nodes(dirName: string) {
  
  return nodesFromDirectory(dirName)
}
