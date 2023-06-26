import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

import Layout from "../../components/Layout";

const Login = () => {
  const navigate: any = useNavigate();
  const [cookie, setCookies] = useCookies();
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values: any) => {
    if (values.username !== "John Doe" && values.password !== "johndoe12345") {
      setCookies("token", uuidv4(), { path: "/" });
      setCookies("username", values.username, { path: "/" });
      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Successfully Login",
        confirmButtonText: "OK",
      }).then((success) => {
        if (success) {
          navigate("/home");
        }
      });
    } else {
      Swal.fire({
        title: "Failed",
        icon: "error",
        text: "Please fill your username/password",
        confirmButtonText: "OK",
      }).then((error) => {
        if (error) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded shadow-md w-1/3">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">Login</h2>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block font-bold mb-1 text-blue-900"
                >
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="w-full border border-gray-300 bg-white rounded px-3 py-2"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block font-bold mb-1 text-blue-900"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full border border-gray-300 bg-white rounded px-3 py-2"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
