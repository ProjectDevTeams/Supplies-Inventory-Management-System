import Swal from 'sweetalert2';

export function IncomingAddSweetAlert(form) {
  let isValid = true;

  if (!form.stock_type) isValid = false;
  if (form.stock_type === 'วัสดุในคลัง' && !form.company_id) isValid = false;
  if (form.stock_type === 'วัสดุนอกคลัง' && !form.project_name) isValid = false;
  if (!form.tax_invoice_number || !form.purchase_order_number) isValid = false;
  if (!form.created_at) isValid = false;

  if (!form.items || form.items.length === 0) {
    isValid = false;
  } else {
    form.items.forEach(it => {
      if (!it.material_id || !it.quantity || !it.price_per_unit) {
        isValid = false;
      }
    });
  }

  if (!isValid) {
    Swal.fire({
      icon: 'warning',
      title: 'ข้อมูลไม่ครบ',
      text: 'กรุณากรอกข้อมูลให้ครบ',
      confirmButtonText: 'ตกลง',
    });
    return false;
  }

  Swal.fire({
    icon: 'success',
    title: 'ตรวจสอบแล้ว',
    text: 'เพิ่มข้อมูลรับเข้าวัสดุเสร็จสิ้น',
    confirmButtonText: 'ตกลง',
  });

  return true;
}

export function IncomingDetailSweetAlertUpdate() {
  Swal.fire({
    icon: 'success',
    title: 'อัพเดตรับเข้าวัสดุสำเร็จ',
    position: 'center',
    showConfirmButton: false,
    timer: 1500
  });
}
