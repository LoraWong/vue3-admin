import XLSX from 'xlsx'
/**
 * 获取表头（通用方式）
 * getHeaderRow 为 xlsx 解析表头数据的通用方法，直接使用即可
 */
export const getHeaderRow = (sheet) => {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r
  /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

/**
 *判断文件格式 是否为 excel文件
 */
export const isExcel = (file) => {
  // .xlsx|xls|csv 结尾
  return /\.(xlsx|xls|csv)$/.test(file.name)
}
