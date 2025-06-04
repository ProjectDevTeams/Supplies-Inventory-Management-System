// UserMoreSweetAlert.js
import Swal from "sweetalert2";

export const showWarningIncomplete = () => {
  return Swal.fire({
    icon: "warning",
    title: "กรอกข้อมูลไม่ครบ",
    text: "กรุณาเลือกหรือเพิ่มชื่อวัสดุ และแนบรูปภาพก่อนบันทึกรายการ",
    backdrop: false,
  });
};

export const showErrorNoUser = () => {
  return Swal.fire({
    icon: "error",
    title: "ไม่พบข้อมูลผู้ใช้",
    text: "กรุณาเข้าสู่ระบบใหม่",
    backdrop: false,
  });
};

export const showSaveSuccess = () => {
  return Swal.fire({
    icon: "success",
    title: "บันทึกสำเร็จ",
    text: "รายการถูกบันทึกเรียบร้อยแล้ว!",
    backdrop: false,
  });
};

export const showSaveError = (message = "บันทึกไม่สำเร็จ") => {
  return Swal.fire({
    icon: "error",
    title: "ผิดพลาด",
    text: message,
    backdrop: false,
  });
};

export const showGenericError = () => {
  return Swal.fire({
    icon: "error",
    title: "เกิดข้อผิดพลาด",
    text: "ไม่สามารถบันทึกข้อมูลได้",
    backdrop: false,
  });
};
