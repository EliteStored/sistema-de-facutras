from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
import shutil
import os
from ocr_utils import extract_invoice_data, create_excel_from_data

app = FastAPI()

UPLOAD_DIR = "uploads"
RESULT_DIR = "results"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(RESULT_DIR, exist_ok=True)

@app.post("/upload/")
async def upload_invoices(files: list[UploadFile] = File(...)):
    all_data = []
    filenames = []
    for file in files:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        data = extract_invoice_data(file_path)
        all_data.append(data)
        filenames.append(file.filename)
    excel_path = os.path.join(RESULT_DIR, "facturas_resultado.xlsx")
    create_excel_from_data(all_data, excel_path)
    return {"excel_file": excel_path, "processed_files": filenames}

@app.get("/download/{filename}")
def download_excel(filename: str):
    file_path = os.path.join(RESULT_DIR, filename)
    return FileResponse(file_path, media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename=filename)
