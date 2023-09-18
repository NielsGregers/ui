import Excel from "exceljs";
import { parseSheet,parseInfocast } from 'helpers/excel/parser';
import { getPipelineDefinition, PipelineDefinition } from 'domain/pipeline';
import { https, Result } from 'helpers';

export function processInfocast(workbook: Excel.Workbook): Promise<Result<any>> {
  return new Promise(async (resolve, reject) => {

    var sheets = [];
    workbook.worksheets.forEach(ws => sheets.push(ws.name));

    if (sheets.length !== 1) {

      resolve({ hasError: true, errorMessage: "Only one Sheet supported pr file" });

      return;
    }

    var ws: Excel.Worksheet = workbook.worksheets[0];
    var row: Excel.Row = ws.getRow(1);
    var columns = [];

    
    var onSheetLoaded = await parseInfocast(ws);
    row.eachCell(cell => columns.push(cell.value));
    resolve({ hasError: false, data: { sheets, columns, results: { onSheetLoaded } } });

  });

}

export function processExcel(workbook: Excel.Workbook): Promise<Result<any>> {
  return new Promise(async (resolve, reject) => {

    var sheets = [];
    workbook.worksheets.forEach(ws => sheets.push(ws.name));

    if (sheets.length !== 1) {

      resolve({ hasError: true, errorMessage: "Only one Sheet supported pr file" });

      return;
    }

    var ws: Excel.Worksheet = workbook.worksheets[0];
    var row: Excel.Row = ws.getRow(1);
    var columns = [];

     //await getPipelineDefinition("1");

    var requestCode  = await https<string>(null,"GET","https://nexiintra365.blob.core.windows.net/transformers/nets-mail-groups.js?sp=r&st=2022-08-22T09:37:48Z&se=2099-08-22T17:37:48Z&spr=https&sv=2021-06-08&sr=b&sig=ptTWYJ29FEHLAvR97bnUtdv%2BD4OOKAE5ux%2B4K7iNL9U%3D")
    var pipeline : PipelineDefinition = {
      id: "",
      title: "",
      onLoaded: requestCode.data ,
      prefix: "",
      slug: ""
    }
    if (requestCode.hasError) {
      resolve({ hasError: true, errorMessage: "Pipeline not found" });

      return;
    }
    var onSheetLoaded = await parseSheet(ws, pipeline);
    row.eachCell(cell => columns.push(cell.value));
    resolve({ hasError: false, data: { sheets, columns, results: { onSheetLoaded } } });

  });

}
