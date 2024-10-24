import { useEffect, useState } from "react";

export const useProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  const productList = async () => {
    const data = await fetch("https://fakestoreapi.com/products");
    const productData = await data.json();
    setProducts(productData);
    setFilteredProducts(productData);
  };

  useEffect(() => {
    productList();
  }, []);

  const totalProducts = filteredProducts.length;

  const handleFilter = (category) => {
    if (category === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => {
        return product.category === category;
      });
      setFilteredProducts(filtered);
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filtered = products.filter((product) => {
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredProducts(filtered);
  };

  return {
    products,
    filteredProducts,
    productsPerPage,
    currentPage,
    searchTerm,
    handleFilter,
    handleSearch,
    firstIndex,
    lastIndex,
    totalProducts,
    setCurrentPage,
  };
};
