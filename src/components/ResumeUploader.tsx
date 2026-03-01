import { useState } from "react";
import { Upload, Loader2, CheckCircle, XCircle } from "lucide-react";

export default function ResumeUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus("idle");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setStatus("idle");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${apiUrl}/api/resume/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setMessage(
          "Resume successfully uploaded to MongoDB! Download button now works.",
        );
        setFile(null);
      } else {
        throw new Error(data.message || "Failed to upload file");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setStatus("error");
      setMessage((error as Error).message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 flex justify-center items-center min-h-screen">
      <div className="glass-dark border border-white/10 p-8 rounded-2xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Upload Resume</h2>
        <p className="text-gray-400 text-sm mb-8">
          Select your PDF to save it directly into the MongoDB GridFS Database.
        </p>

        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-emerald-500/30 border-dashed rounded-xl cursor-pointer bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors mb-6">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-3 text-emerald-400" />
            <p className="mb-2 text-sm text-gray-300">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">PDF ONLY</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </label>

        {file && (
          <div className="text-sm text-emerald-300 bg-emerald-900/40 p-3 rounded-lg border border-emerald-500/20 mb-6 flex justify-between items-center">
            <span className="truncate max-w-[200px]">{file.name}</span>
            <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} /> Uploading...
            </>
          ) : (
            "Upload to Database"
          )}
        </button>

        {status === "success" && (
          <div className="mt-6 flex items-start gap-3 text-left p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
            <CheckCircle className="shrink-0 mt-0.5" size={18} />
            <p>{message}</p>
          </div>
        )}

        {status === "error" && (
          <div className="mt-6 flex items-start gap-3 text-left p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            <XCircle className="shrink-0 mt-0.5" size={18} />
            <p>{message}</p>
          </div>
        )}
      </div>
    </section>
  );
}
