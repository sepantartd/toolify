# Open Tools Hub - Tool Developer Guide

Welcome to the developer documentation for **Open Tools Hub**. This guide explains how to build, test, and contribute new tools to the platform.

---

## 1. Architecture Overview

Every tool in Open Tools Hub is an isolated module located in `src/tools/<tool-id>/`. 

Each tool module consists of:
1. `manifest.json`: Metadata, privacy configuration, and permissions.
2. `<ToolName>.tsx`: React UI Component implementing `ToolProps`.
3. `index.ts`: Entrypoint exporting `ToolModule`.

Our core uses Vite's Auto-Discovery (`import.meta.glob('/src/tools/*/index.ts')`), which automatically detects and loads any new tool added to `src/tools/` without modifying core application code.

---

## 2. Quick Start: Creating a New Tool

### Step 1: Copy the Template
Copy the template folder at `src/tools/_template/` to `src/tools/<your-tool-id>/`:

```bash
cp -r src/tools/_template src/tools/my-awesome-tool
