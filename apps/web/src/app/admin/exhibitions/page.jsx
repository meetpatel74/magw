"use client";
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";
import { exhibitionService } from "@/services/api";

export default function AdminExhibitionsPage() {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("create"); // or "edit"
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    dateRange: "",
    startDate: "",
    endDate: "",
    image: "",
    isCurrent: false,
    isUpcoming: false,
    type: "contemporary",
  });
  const [selectedId, setSelectedId] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  // Restrict access to admin/staff
  useEffect(() => {
    const user =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (user) {
      const parsed = JSON.parse(user);
      if (!(parsed.role === "admin" || parsed.role === "staff")) {
        window.location.href = "/";
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  const fetchExhibitions = async () => {
    try {
      setLoading(true);
      const data = await exhibitionService.getAll();
      setExhibitions(data);
      setError(null);
    } catch (err) {
      setError("Failed to load exhibitions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreate = () => {
    setFormMode("create");
    setFormData({
      title: "",
      shortDescription: "",
      fullDescription: "",
      dateRange: "",
      startDate: "",
      endDate: "",
      image: "",
      isCurrent: false,
      isUpcoming: false,
      type: "contemporary",
    });
    setSelectedId(null);
    setShowForm(true);
    setFormError(null);
    setFormSuccess(null);
  };

  const handleEdit = (exhibition) => {
    setFormMode("edit");
    setFormData({ ...exhibition });
    setSelectedId(exhibition.id);
    setShowForm(true);
    setFormError(null);
    setFormSuccess(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this exhibition?"))
      return;
    try {
      setLoading(true);
      await exhibitionService.delete(id);
      await fetchExhibitions();
    } catch (err) {
      setError("Failed to delete exhibition.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    setFormSuccess(null);
    try {
      if (formMode === "create") {
        await exhibitionService.create(formData);
        setFormSuccess("Exhibition created successfully.");
      } else {
        await exhibitionService.update(selectedId, formData);
        setFormSuccess("Exhibition updated successfully.");
      }
      setShowForm(false);
      await fetchExhibitions();
    } catch (err) {
      setFormError(err.message || "Failed to save exhibition.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="flex gap-4 mb-6">
          <Button href="/admin/exhibitions" variant="outline">
            Manage Exhibitions
          </Button>
          <Button href="/admin/artworks" variant="outline">
            Manage Artworks
          </Button>
        </div>
        <h1 className="text-2xl font-bold mb-6">Admin: Manage Exhibitions</h1>
        {loading && <p>Loading exhibitions...</p>}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <div className="mb-4">
          <Button variant="primary" onClick={handleCreate}>
            Create New Exhibition
          </Button>
        </div>
        {/* List exhibitions */}
        <div className="space-y-4 mb-8">
          {exhibitions.map((ex) => (
            <div
              key={ex.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{ex.title}</div>
                <div className="text-sm text-gray-600">{ex.dateRange}</div>
                <div className="text-xs text-gray-500">Type: {ex.type}</div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEdit(ex)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(ex.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
        {/* Form for create/edit */}
        {showForm && (
          <form
            onSubmit={handleFormSubmit}
            className="bg-white border rounded-lg p-6 mb-8 space-y-4"
          >
            <h2 className="text-lg font-semibold mb-2">
              {formMode === "create" ? "Create Exhibition" : "Edit Exhibition"}
            </h2>
            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2">
                {formError}
              </div>
            )}
            {formSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-2">
                {formSuccess}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Short Description
              </label>
              <input
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Description
              </label>
              <textarea
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Date Range
                </label>
                <input
                  name="dateRange"
                  value={formData.dateRange}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <input
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Date
                </label>
                <input
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="contemporary">Contemporary</option>
                  <option value="classical">Classical</option>
                  <option value="digital">Digital</option>
                  <option value="photography">Photography</option>
                  <option value="sculpture">Sculpture</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <input
                  type="checkbox"
                  name="isCurrent"
                  checked={formData.isCurrent}
                  onChange={handleInputChange}
                />
                <label>Current</label>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <input
                  type="checkbox"
                  name="isUpcoming"
                  checked={formData.isUpcoming}
                  onChange={handleInputChange}
                />
                <label>Upcoming</label>
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" variant="primary" disabled={formLoading}>
                {formLoading ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </MainLayout>
  );
}
