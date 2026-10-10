import React, { useRef, useState } from "react";
import { Formik, Form } from "formik";
import { Repeat } from "lucide-react";
import CalenderComponent from "../../Components/CalenderComponent";
import { formatDateForAPI } from "../../utils/dateUtils";
import { useLoader } from "../../Context/LoaderContext";
import { useAuth } from "../../Context/AuthContext";
import apiService from "../../../apiService";
import Table from "../../Components/Table/Table";
import { useNavigate } from "react-router-dom";
import {
  PageHeader,
  FormLayoutCard,
  CalendarInput,
  SubHeaderCard,
} from "../../Components/NewLayout";
import useAlert from "../../Components/CustomAlert/useAlert";

const AssetAhwal = () => {
  const { setLoading } = useLoader();
  const { user } = useAuth();
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const { showAlert, hideAlert, Alert } = useAlert();
  const userId = user?.userId;
  const ulbid = user?.data?.OrgId;

  const [tableData, setTableData] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState(new Date());
  const [selectedTo, setSelectedTo] = useState(new Date());

  const tableHeaders = [
    "महिना - वर्ष",
    "मंजूर",
    "प्रलंबित",
    "एकूण",
  ];

  const tableKeyMapping = {
    "महिना - वर्ष": "month_year",
    मंजूर: "approve",
    प्रलंबित: "pending",
    एकूण: "total",
  };

  const initialValues = {
    from: new Date(),
    to: new Date(),
  };

  const formatDateDisplay = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = d.toLocaleString("en", { month: "short" });
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (values) => {
    hideAlert();
    if (!userId || !ulbid) {
      showAlert("User ID or Ulb ID not found", "warning");
      return;
    }
    setSelectedFrom(values.from);
    setSelectedTo(values.to);

    try {
      setLoading(true);
      const payload = {
        Request1: `${import.meta.env.VITE_FLAG}$asset_monthly_summary$${userId}$${ulbid}~${formatDateForAPI(values.from)}~${formatDateForAPI(values.to)}`,
        Request2: "",
        Request3: "",
        Request4: "",
        Request5: "",
        Request6: "",
        Request7: "",
      };
      const res = await apiService.post("WTgeneric-call", payload);

      if (
        res?.data?.Success &&
        res?.data?.data?.jsondata &&
        Array.isArray(res.data.data.jsondata) &&
        res.data.data.jsondata.length > 0
      ) {
        hideAlert();
        const item = res.data.data.jsondata.map((item) => ({
          month_year:
            item.month && item.year
              ? `${item.month}-${item.year}`
              : item.month || item.year || "-",
          approve: item.approve ?? 0,
          pending: item.pending ?? 0,
          total: item.total ?? 0,
        }));
        setTableData(item);
        setTimeout(() => {
          tableRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      } else {
        setTableData([]);
        showAlert("No data found for the selected dates", "error");
      }
    } catch (error) {
      console.error("Error fetching asset ahwal data:", error);
      setTableData([]);
      showAlert(error.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/Asset");
  };

  return (
    <div className="min-h-screen bg-[#eef4ff] font-sans pb-6">
      <PageHeader
        title="Asset Summary"
        subtitle="Asset Management Department"
        onBack={handleGoBack}
      />
      <Alert />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, values, handleSubmit: formikSubmit }) => (
          <Form onSubmit={formikSubmit}>
            <FormLayoutCard
              onSubmit={formikSubmit}
              actionButtonText="पहा"
              actionButtonIcon={<Repeat className="w-5 h-5" />}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CalendarInput label="दिनांक पासून">
                  <CalenderComponent
                    name="from"
                    selectedDate={values.from}
                    autoSelectToday={false}
                    setSelectedDate={(date) => {
                      setFieldValue("from", date);
                    }}
                  />
                </CalendarInput>

                <CalendarInput label="दिनांक पर्यंत">
                  <CalenderComponent
                    name="to"
                    selectedDate={values.to}
                    autoSelectToday={false}
                    setSelectedDate={(date) => {
                      setFieldValue("to", date);
                    }}
                  />
                </CalendarInput>
              </div>
            </FormLayoutCard>
          </Form>
        )}
      </Formik>

      {tableData.length > 0 && (
        <section className="container mx-auto mt-4 mb-5 px-4" ref={tableRef}>
          <div className="rounded-3xl bg-white p-4 sm:p-6 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
            <Table
              data={tableData}
              headers={tableHeaders}
              keyMapping={tableKeyMapping}
              pagination={false}
              rowsPerPage={10}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default AssetAhwal;
