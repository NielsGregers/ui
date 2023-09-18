import { jest } from '@jest/globals';
import path from "path"
import fs from "fs"
import crypto from "crypto"
import { indexGroups, MailSegments } from "./";
import { group } from 'console';


function allShas(segments: MailSegments.Parsed) {
  var map = new Map()

  segments.results.onSheetLoaded.segments.forEach(segment => {
    segment.values.forEach(group => {
      if (!group.key) return
      var key = group.keyHash
      if (map.get(key)) {
        console.log("EXISTING KEY", key)
      } else {
        map.set(key, group)
      }
    })
  })

}

function countries(segments: MailSegments.Parsed) {
  var map = new Map()

  segments.results.onSheetLoaded.segments.forEach(segment => {
    if (segment.name !== "Countries") return
    segment.values.forEach(group => {
      if (!group.key) return
      debugger
      var key = group.keyHash
      
    })
  })

}


function load(): MailSegments.Parsed {
  var filePath = path.join(__dirname, "segments.json")
  var fileData = fs.readFileSync(filePath)
  var segments = JSON.parse(fileData.toString())
  return segments
}

it("Test SHA1", async () => {

  var segments: MailSegments.Parsed = load()
  expect(segments.sheets.length).toBe(1)
  allShas(segments)
});

// it("Test SHA1", async () => {

//   var segments: MailSegments.Parsed = load()
//   expect(segments.sheets.length).toBe(1)
//   countries(segments)
// });




