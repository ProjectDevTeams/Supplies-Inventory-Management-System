// File: src/components/SweetAlert/LoginSweetAlert.js
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

/**
 * Generic SweetAlert2 wrapper
 * @param {Object} options  - options object for Swal.fire
 * @param {string} options.title
 * @param {string} [options.text]
 * @param {'success'|'error'|'warning'|'info'|'question'} [options.icon]
 * @param {string} [options.confirmButtonText]
 */
export function showLoginAlert({
  title,
  text = '',
  icon = 'info',
  confirmButtonText = 'ตกลง'
}) {
  return MySwal.fire({ title, text, icon, confirmButtonText });
}

/**
 * Success alert for login
 * @param {string} [message]
 */
export function showLoginSuccess(message = 'เข้าสู่ระบบสำเร็จ') {
  return showLoginAlert({
    title: 'สำเร็จ',
    text: message,
    icon: 'success',
    confirmButtonText: 'ไปต่อ'
  });
}

/**
 * Error alert for login
 * @param {string} [message]
 */
export function showLoginError(message = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง') {
  return showLoginAlert({
    title: 'เกิดข้อผิดพลาด',
    text: message,
    icon: 'error',
    confirmButtonText: 'ลองอีกครั้ง'
  });
}
