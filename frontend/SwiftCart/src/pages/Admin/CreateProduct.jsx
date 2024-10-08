import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import "./CreateProduct.css"; // Import custom CSS file
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container create-product-container">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card create-product-card">
              <div className="card-body">
                <h1 className="card-title text-center mb-4">Create Product</h1>
                <form onSubmit={handleCreate} className="form-container">
                  <div className="form-group mb-3">
                    <Select
                      bordered={false}
                      placeholder="Select a category"
                      size="large"
                      showSearch
                      className="form-select"
                      onChange={(value) => setCategory(value)}
                    >
                      {categories?.map((c) => (
                        <Option key={c._id} value={c._id}>
                          {c.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div className="form-group mb-3">
                    <label className="btn btn-outline-secondary col-12">
                      {photo ? photo.name : "Upload Photo"}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                  </div>
                  {photo && (
                    <div className="text-center mb-3">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height="200px"
                        className="img img-responsive rounded"
                      />
                    </div>
                  )}
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      value={name}
                      placeholder="Product Name"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <textarea
                      value={description}
                      placeholder="Product Description"
                      className="form-control"
                      onChange={(e) => setDescription(e.target.value)}
                      rows="4"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="number"
                      value={price}
                      placeholder="Price"
                      className="form-control"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="number"
                      value={quantity}
                      placeholder="Quantity"
                      className="form-control"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <Select
                      bordered={false}
                      placeholder="Select Shipping"
                      size="large"
                      showSearch
                      className="form-select"
                      onChange={(value) => setShipping(value)}
                    >
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-animated"
                    >
                      CREATE PRODUCT
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
