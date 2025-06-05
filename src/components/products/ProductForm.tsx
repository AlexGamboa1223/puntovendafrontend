import { useState, useEffect, useRef, type FormEvent } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import type { Product } from "@/types/Product";

interface Props {
  onSubmit: (data: Omit<Product, "_id">) => void;
  initialData?: Product;
}

const categorias = [
  "Electrónica",
  "Ropa",
  "Tenis",
  "Alimentos",
  "Hogar",
  "Juguetes",
  "Accesorios",
];

export default function ProductForm({ onSubmit, initialData }: Props) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [price, setPrice] = useState(initialData ? String(initialData.price) : "");
  const [stock, setStock] = useState(initialData ? String(initialData.stock) : "");
  const [category, setCategory] = useState(initialData?.category || categorias[0]);
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null); // 👉 Referencia para el input de archivo

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setPrice(initialData.price.toString());
      setStock(initialData.stock.toString());
      setCategory(initialData.category);
      setImageUrl(initialData.imageUrl);
    }
  }, [initialData]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setCategory(categorias[0]);
    setImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // ✅ Limpiar input de archivo
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "PuntoVentaPW");

    setUploading(true);
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/diub59akl/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
        toast.success("Imagen subida correctamente");
      } else {
        throw new Error("No se obtuvo URL segura");
      }
    } catch {
      toast.error("Error al subir imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !price || !stock || !category || !imageUrl) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    setSubmitting(true);

    const product: Omit<Product, "_id"> = {
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category,
      imageUrl,
    };

    try {
      await onSubmit(product);
      toast.success(initialData ? "Producto actualizado" : "Producto agregado");

      if (!initialData) {
        resetForm(); // ✅ Limpiar campos si es nuevo producto
      }
    } catch {
      toast.error("Ocurrió un error al guardar el producto");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-6 shadow-md rounded-xl"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
        className="border p-2 rounded focus:outline-blue-500 placeholder:text-gray-400 text-gray-700"
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        className="border p-2 rounded focus:outline-blue-500 placeholder:text-gray-400 text-gray-700"
      />

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Precio"
        className="border p-2 rounded focus:outline-blue-500 placeholder:text-gray-400 text-gray-700"
        required
      />

      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="Stock"
        className="border p-2 rounded focus:outline-blue-500 placeholder:text-gray-400 text-gray-700"
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded focus:outline-blue-500 text-gray-700"
        required
      >
        <option disabled value="">Selecciona una categoría</option>
        {categorias.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="p-1"
        ref={fileInputRef} // 👈 Referencia aquí
      />

      {uploading && <p className="text-sm text-gray-500">Subiendo imagen...</p>}

      {!uploading && imageUrl && (
        <img src={imageUrl} alt="preview" className="w-32 h-32 object-cover rounded border" />
      )}

      <Button
        type="submit"
        className="bg-blue-600 text-white font-bold px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        disabled={submitting}
      >
        {submitting
          ? initialData
            ? "Actualizando..."
            : "Agregando..."
          : "Guardar"}
      </Button>
    </form>
  );
}
