import Swal from 'sweetalert2';

export function ComponentIncompleteAlert() {
  Swal.fire({
    icon: 'warning',
    title: 'ข้อมูลไม่ครบ',
    text: 'กรุณากรอกข้อมูลให้ครบก่อนส่ง',
    position: 'center',
    confirmButtonText: 'ตกลง'
  });
}

export function ComponentAddSuccessAlert() {
  Swal.fire({
    icon: 'success',
    title: 'เพิ่มข้อมูลสำเร็จ',
    position: 'center',
    showConfirmButton: false,
    timer: 1500
  });
}

export function ComponentConfirmDeleteAlert() {
  return Swal.fire({
    icon: 'warning',
    title: 'ยืนยันการลบ',
    text: 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?',
    showCancelButton: true,
    confirmButtonText: 'ลบ',
    cancelButtonText: 'ยกเลิก',
    reverseButtons: true
  });
}

export function ComponentDeleteSuccessAlert() {
  Swal.fire({
    icon: 'success',
    title: 'ลบข้อมูลสำเร็จ',
    position: 'center',
    showConfirmButton: false,
    timer: 1500
  });
}

export function ComponentUpdateSuccessAlert() {
  Swal.fire({
    icon: 'success',
    title: 'อัพเดตข้อมูลสำเร็จ',
    position: 'center',
    showConfirmButton: false,
    timer: 1500
  });
}

