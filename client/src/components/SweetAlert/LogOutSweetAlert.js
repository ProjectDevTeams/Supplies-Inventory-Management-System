// File: src/components/SweetAlert/LogOutSweetAlert.js
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

/**
 * แสดง confirm dialog ก่อนออกจากระบบ
 * @returns {Promise<boolean>} คืนค่า true ถ้าผู้ใช้กด “ใช่, ออกจากระบบ”
 */
export function confirmLogout() {
  return MySwal.fire({
    title: 'คุณแน่ใจหรือไม่?',
    text: 'คุณจะออกจากระบบและกลับไปยังหน้าล็อกอิน',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ใช่, ออกจากระบบ',
    cancelButtonText: 'ยกเลิก',
    reverseButtons: true
  }).then((result) => result.isConfirmed);
}

/**
 * แสดงแจ้งเตือนเมื่อออกจากระบบสำเร็จ
 * @param {string} [message]
 */
export function showLogoutSuccess(message = 'ออกจากระบบเรียบร้อยแล้ว') {
  return MySwal.fire({
    title: 'สำเร็จ',
    text: message,
    icon: 'success',
    confirmButtonText: 'ตกลง'
  });
}
