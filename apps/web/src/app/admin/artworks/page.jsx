"use client";
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Button from "@/components/common/Button";
import { artworkService } from "@/services/api";

export default function AdminArtworksPage() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("create"); // or "edit"
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    year: "",
    medium: "",
    description: "",
    image: "",
    exhibitionId: "",
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

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const data = await artworkService.getAll();
      setArtworks(data);
      setError(null);
    } catch (err) {
      setError("Failed to load artworks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    setFormMode("create");
    setFormData({
      title: "",
      artist: "",
      year: "",
      medium: "",
      description: "",
      image: "",
      exhibitionId: "",
    });
    setSelectedId(null);
    setShowForm(true);
    setFormError(null);
    setFormSuccess(null);
  };

  const handleEdit = (artwork) => {
    setFormMode("edit");
    setFormData({ ...artwork });
    setSelectedId(artwork.id);
    setShowForm(true);
    setFormError(null);
    setFormSuccess(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this artwork?"))
      return;
    try {
      setLoading(true);
      await artworkService.delete(id);
      await fetchArtworks();
    } catch (err) {
      setError("Failed to delete artwork.");
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
        await artworkService.create(formData);
        setFormSuccess("Artwork created successfully.");
      } else {
        await artworkService.update(selectedId, formData);
        setFormSuccess("Artwork updated successfully.");
      }
      setShowForm(false);
      await fetchArtworks();
    } catch (err) {
      setFormError(err.message || "Failed to save artwork.");
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
        <h1 className="text-2xl font-bold mb-6">Admin: Manage Artworks</h1>
        {loading && <p>Loading artworks...</p>}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <div className="mb-4">
          <Button variant="primary" onClick={handleCreate}>
            Create New Artwork
          </Button>
        </div>
        {/* List artworks */}
        <div className="space-y-4 mb-8">
          {artworks.map((art) => (
            <div
              key={art.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{art.title}</div>
                <div className="text-sm text-gray-600">
                  {art.artist} ({art.year})
                </div>
                <div className="text-xs text-gray-500">
                  Medium: {art.medium}
                </div>
                <div className="text-xs text-gray-500">
                  Exhibition ID: {art.exhibitionId}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEdit(art)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(art.id)}
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
              {formMode === "create" ? "Create Artwork" : "Edit Artwork"}
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
              <label className="block text-sm font-medium mb-1">Artist</label>
              <input
                name="artist"
                value={formData.artist}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Year</label>
              <input
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Medium</label>
              <input
                name="medium"
                value={formData.medium}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
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
            <div>
              <label className="block text-sm font-medium mb-1">
                Exhibition ID
              </label>
              <input
                name="exhibitionId"
                value={formData.exhibitionId}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
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
