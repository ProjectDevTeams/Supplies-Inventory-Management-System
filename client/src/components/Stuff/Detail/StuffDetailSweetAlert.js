import Swal from 'sweetalert2';

export function StuffDetailSweetAlert() {
  Swal.fire({
    icon: 'success',
    title: 'บันทึกข้อมูลสำเร็จ',
    text: 'อัพเดตสถานะเสร็จสิ้น',
    position: 'center',
    showConfirmButton: false,
    timer: 1500
  });
}