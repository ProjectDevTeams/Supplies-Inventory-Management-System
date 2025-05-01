import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (data, fileName = "รายงานรับเข้าวัสดุ") => {
  if (!data || data.length === 0) {
    alert("ไม่มีข้อมูลให้ส่งออก");
    return;
  }

  const cleanedData = data.map(item => ({
    "บริษัท/ร้านค้า": item.company,
    "เลขที่ มอ.ที่จัดซื้อ": item.po,
    "วันที่ซื้อ": item.orderDate,
    "ยอดซื้อรวม": item.amount,
  }));

  const totalAmount = cleanedData.reduce((sum, item) => sum + item["ยอดซื้อรวม"], 0);
  cleanedData.push({
    "บริษัท/ร้านค้า": "",
    "เลขที่ มอ.ที่จัดซื้อ": "",
    "วันที่ซื้อ": "ยอดเงินรวม",
    "ยอดซื้อรวม": totalAmount,
  });

  const worksheet = XLSX.utils.json_to_sheet(cleanedData, { skipHeader: false });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "รับเข้าวัสดุ");

  const range = XLSX.utils.decode_range(worksheet["!ref"]);

  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
      worksheet[cellAddress].s = worksheet[cellAddress].s || {};
      worksheet[cellAddress].s.border = {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      };

      // หัวตาราง (row 0)
      if (R === 0) {
        worksheet[cellAddress].s.fill = { fgColor: { rgb: "000000" } };
        worksheet[cellAddress].s.font = { color: { rgb: "FFFFFF" }, bold: true };
      }
    }
  }

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true,
  });

  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `${fileName}.xlsx`);
};
