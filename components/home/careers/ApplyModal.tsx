"use client";

import { useState, ChangeEvent, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Stack,
  TextField,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";

type Props = {
  role: string;
  onClose: () => void;
};
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "40px",
    fontSize: 14,
    minHeight: 44,
  },

  "& .MuiOutlinedInput-input": {
    padding: "10px 16px",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "40px",
  },

  /* FIX label vertical position */
  "& .MuiInputLabel-root": {
    transform: "translate(14px, 12px) scale(1)",
  },

  "& .MuiInputLabel-shrink": {
    transform: "translate(14px, -9px) scale(0.75)",
  },
};

const selectSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "40px",
    fontSize: 14,
    minHeight: 44,
  },

  "& .MuiSelect-select": {
    padding: "10px 16px",
    display: "flex",
    alignItems: "center",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "40px",
  },
};

const INITIAL_DATA = {
  name: "",
  email: "",
  phone: "",
  role: "",
  dept: "",
  location: "",
  experience: "",
  message: "",
};

export default function ApplyModal({ role = "", onClose }: Props) {
  const open = Boolean(role);

  const [success, setSuccess] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [form, setForm] = useState(INITIAL_DATA);

  const update = (key: string, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowed.includes(file.type)) {
      setFileError("Only PDF, DOC or DOCX files allowed");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file.size > maxSize) {
      setFileError("File size must be under 5MB");
      return;
    }

    setFileError("");
    setResume(file);
  };

  const removeFile = () => setResume(null);

  const onCloseModal = () => {
    onClose();
    setTimeout(() => {
      setForm(INITIAL_DATA);
      removeFile();
      setFileError("");
      setSuccess(false);
    }, 100);
  };

const submit = async () => {
  if (!form.name || !form.email) {
    alert("Please fill required fields");
    return;
  }

  if (!resume) {
    alert("Please upload your resume");
    return;
  }

  try {
    const payload = new FormData();

    payload.append("resume", resume);
    payload.append("name", form.name);
    payload.append("email", form.email);
    payload.append("phone", form.phone || "");
    payload.append("role", form.role || "");
    payload.append("dept", form.dept || "");
    payload.append("location", form.location || "");
    payload.append("experience", form.experience || "");
    payload.append("message", form.message || "");

    const res = await fetch("/api/send-resume", {
      method: "POST",
      body: payload,
    });

    if (!res.ok) throw new Error();

    setSuccess(true);
  } catch {
    alert("Failed to send resume");
  }
};

  useEffect(() => {
    setForm((f) => ({ ...f, role }));
  }, [role]);

  return (
    <Dialog open={open} onClose={onCloseModal} maxWidth="xs" fullWidth>
      <DialogContent sx={{ position: "relative", p: 4 }}>
        <IconButton
          onClick={onCloseModal}
          sx={{ position: "absolute", right: 12, top: 12 }}
        >
          <i className="fa fa-times" />
        </IconButton>

        {success ? (
          <div>
            <h3>✅ Application Submitted!</h3>
            <p style={{ fontSize: "14px", fontWeight: 600, marginTop: "8px" }}>
              Thank you for your interest in Payfix Advisors. <br />
              Our team will review your application and reach out within 3
              business days.
            </p>
          </div>
        ) : (
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={800}>
              Submit General Application
            </Typography>

            <Typography variant="body2" color="text.secondary">
              We review every application personally. Expect a response within 3
              business days.
            </Typography>

            <Stack direction="row" spacing={2}>
              <TextField
                sx={fieldSx}
                label="Full Name"
                fullWidth
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />

              <TextField
                sx={fieldSx}
                label="Phone Number"
                fullWidth
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </Stack>

            <TextField
              sx={fieldSx}
              label="Email Address"
              fullWidth
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />

            {/* ROLE */}
            <TextField
              sx={fieldSx}
              label="Role Applying For"
              fullWidth
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
            />

            {/* DEPT + LOCATION */}
            <Stack direction="row" spacing={2}>
              <Select
                fullWidth
                value={form.dept}
                displayEmpty
                onChange={(e) => update("dept", e.target.value)}
                sx={selectSx}
              >
                <MenuItem value="">Department</MenuItem>
                <MenuItem value="payroll">Payroll</MenuItem>
                <MenuItem value="hr">HR</MenuItem>
                <MenuItem value="tax">Tax & Audit</MenuItem>
                <MenuItem value="sales">Business Dev</MenuItem>
                <MenuItem value="tech">Technology</MenuItem>
              </Select>

              <Select
                fullWidth
                value={form.location}
                displayEmpty
                onChange={(e) => update("location", e.target.value)}
                sx={selectSx}
              >
                <MenuItem value="">Location</MenuItem>
                <MenuItem value="Chennai">Chennai</MenuItem>
                <MenuItem value="Pondicherry">Pondicherry</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="Pan-India">Pan-India</MenuItem>
              </Select>
            </Stack>

            {/* EXPERIENCE */}
            <Select
              fullWidth
              value={form.experience}
              displayEmpty
              onChange={(e) => update("experience", e.target.value)}
              sx={selectSx}
            >
              <MenuItem value="">Years of Experience</MenuItem>
              <MenuItem value="0-1">0–1 Years (Fresher)</MenuItem>
              <MenuItem value="1-3">1–3 Years</MenuItem>
              <MenuItem value="3-5">3–5 Years</MenuItem>
              <MenuItem value="5-10">5–10 Years</MenuItem>
              <MenuItem value="10+">10+ Years</MenuItem>
            </Select>

            {/* MESSAGE */}
            <TextField
              // sx={fieldSx}
              label="Why are you interested in this role?"
              multiline
              rows={3}
              fullWidth
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
            />

            <Box
              component="label"
              sx={{
                border: "2px dashed #e2e8f0",
                borderRadius: 2,
                p: 3,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <i
                className="fa fa-upload"
                style={{ fontSize: "1.6rem", color: "var(--red)" }}
              />

              <Typography mt={1}>Upload Resume (PDF, DOC, DOCX)</Typography>

              <input
                hidden
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFile}
              />
            </Box>

            {resume && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #e2e8f0",
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                }}
              >
                <Typography fontSize={13}>
                  <i className="fa fa-file-text-o" style={{ marginRight: 6 }} />
                  {resume.name}
                </Typography>

                <IconButton size="small" onClick={removeFile}>
                  <i className="fa fa-times" />
                </IconButton>
              </Box>
            )}

            {fileError && (
              <Typography color="error" fontSize={12}>
                {fileError}
              </Typography>
            )}

            {/* SUBMIT */}
            <Button variant="contained" size="large" fullWidth onClick={submit}>
              Submit Application
            </Button>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}
