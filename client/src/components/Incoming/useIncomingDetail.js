import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";

export function useIncomingDetail(id, navigate) {
  const [header, setHeader] = useState({
    id: null,
    created_by: null,
    warehouse: "",
    company: null,
    companyName: null,
    projectName: null,
    taxNumber: "",
    orderNumber: "",
    date: "",
    approvalStatus: ""
  });
  const [items, setItems] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/receive_materials/update_receive.php?id=${id}`)
      .then(res => {
        const { status, data } = res.data;
        if (status === "success") {
          const { bill, items } = data;
          setHeader({
            id: bill.id,
            created_by: bill.created_by,
            warehouse: bill.stock_type,
            company: bill.company_id ?? null,
            companyName: bill.company_name ?? null,
            projectName: bill.project_name ?? null,
            taxNumber: bill.tax_invoice_number,
            orderNumber: bill.purchase_order_number,
            date: bill.created_at,
            approvalStatus: bill.approval_status
          });
          setItems(items.map(it => ({
            material_id: it.material_id,
            material_name: it.material_name || "",
            quantity: it.quantity,
            price_per_unit: it.price_per_unit
          })));
        } else {
          navigate(-1);
        }
      })
      .catch(() => navigate(-1))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/materials/get_materials.php`),
      axios.get(`${API_URL}/companies/get_companies.php`)
    ])
      .then(([mRes, cRes]) => {
        setMaterials(mRes.data.data || []);
        setCompanies(cRes.data.data || []);
      })
      .catch(console.error);
  }, []);

  const save = () => {
    const payload = {
      id: header.id,
      created_by: header.created_by,
      stock_type: header.warehouse,
      company_id: header.company,
      project_name: header.projectName,
      tax_invoice_number: header.taxNumber,
      purchase_order_number: header.orderNumber,
      created_at: header.date,
      approval_status: header.approvalStatus,
      items: items.map(it => ({
        material_id: it.material_id,
        material_name: it.material_name,
        quantity: it.quantity,
        price_per_unit: it.price_per_unit,
        total_price: (it.quantity * it.price_per_unit).toFixed(2)
      }))
    };
    return axios.put(`${API_URL}/receive_materials/update_receive.php`, payload);
  };

  return {
    header,
    setHeader,
    items,
    setItems,
    materials,
    companies,
    loading,
    save
  };
}
