import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const TodoForm = ({
  setShowModal,
  initialData = {},
  handleSave,
  setEditingTodo,
}) => {
  const formik = useFormik({
    initialValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      description: Yup.string()
        .max(200, "Must be 200 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      await handleSave(values);
    },
  });

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-xl relative flex flex-col w-full bg-slate-100 outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">
              {initialData?.id ? "Edit Todo" : "Create a Todo"}
            </h3>
          </div>
          <div className="relative p-6 flex-auto text-start">
            <form onSubmit={formik.handleSubmit} className="w-80 sm:w-[500px]">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formik.touched.title &&
                    formik.errors.title &&
                    "border-red-500"
                  }`}
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.title}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    formik.touched.description &&
                    formik.errors.description &&
                    "border-red-500"
                  }`}
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-xs italic">
                    {formik.errors.description}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-end py-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 transition-all focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingTodo(null);
                  }}
                >
                  Close
                </button>
                <button
                  className="text-white bg-blue-500 hover:bg-blue-600 transition-all focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
