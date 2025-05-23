import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { IncomingAddSweetAlert } from "./IncomingSweetAlert";

export function useIncomingAdd(navigate) {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || null;

  const [materials, setMaterials] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    created_by: userId,
    stock_type: "",
    company_id: "",
    company_name: "",
    project_name: "",
    tax_invoice_number: "",
    purchase_order_number: "",
    created_at: "",
    items: [{ material_id: "", material_name: "", quantity: "", price_per_unit: "" }],
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ error: "", success: "" });

  useEffect(() => {
    (async () => {
      try {
        const [mRes, cRes] = await Promise.all([
          axios.get(`${API_URL}/materials/get_materials.php`),
          axios.get(`${API_URL}/companies/get_companies.php`),
        ]);
        setMaterials(mRes.data.data || []);
        setCompanies(cRes.data.data || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const setIn = (path, val) =>
    setForm(f => {
      const o = { ...f };
      const keys = path.split(".");
      const last = keys.pop();
      let cur = o;
      keys.forEach(k => (cur = cur[k]));
      cur[last] = val;
      return o;
    });

  const addItem = () =>
    setForm(f => ({
      ...f,
      items: [...f.items, { material_id: "", material_name: "", quantity: "", price_per_unit: "" }],
    }));

  const removeItem = i =>
    setForm(f =>
      f.items.length > 1
        ? { ...f, items: f.items.filter((_, idx) => idx !== i) }
        : f
    );

  const getMaterialOptions = () =>
    form.stock_type
      ? materials.filter(m => m.location === form.stock_type).map(m => ({ value: m.id, label: m.name }))
      : [];

  const companyOptions = companies.map(c => ({ value: c.id, label: c.name }));
  const stockOptions = [
    { value: "วัสดุในคลัง", label: "วัสดุในคลัง" },
    { value: "วัสดุนอกคลัง", label: "วัสดุนอกคลัง" },
  ];

  const submit = async () => {
    if (!IncomingAddSweetAlert(form)) return;

    setMsg({ error: "", success: "" });
    setLoading(true);
    try {
      const itemsPayload = form.items.map(({ material_id, quantity, price_per_unit }) => ({
        material_id: +material_id,
        quantity: +quantity,
        price_per_unit: +price_per_unit,
        total_price: +quantity * +price_per_unit,
      }));
      const payload = {
        created_by: userId,
        stock_type: form.stock_type,
        company_id: form.company_id === "" ? "" : +form.company_id,
        project_name: form.project_name || null,
        tax_invoice_number: form.tax_invoice_number,
        purchase_order_number: form.purchase_order_number,
        created_at: form.created_at,
        items: itemsPayload,
      };
      const { data } = await axios.post(
        `${API_URL}/receive_materials/add_receive.php`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      if (data.status === "success") navigate("/incoming/");
      else throw new Error(data.message || "Unknown error");
    } catch (e) {
      setMsg({ error: e.message || "เกิดข้อผิดพลาด", success: "" });
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setIn,
    addItem,
    removeItem,
    getMaterialOptions,
    companyOptions,
    stockOptions,
    submit,
    loading,
    msg,
  };
}
