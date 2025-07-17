import pytesseract
from PIL import Image
import pandas as pd
import re

def extract_invoice_data(image_path):
    # Extrae texto usando OCR
    text = pytesseract.image_to_string(Image.open(image_path), lang='spa')
    # Ejemplo simple de extracción de datos (ajustar según formato de factura)
    data = {}
    data['RUC'] = re.search(r'RUC[:\s]*([0-9]+)', text)
    data['Fecha'] = re.search(r'Fecha[:\s]*([0-9/\-]+)', text)
    data['Total'] = re.search(r'Total[:\s$]*([0-9.,]+)', text)
    # Extraer valores encontrados
    for key in data:
        if data[key]:
            data[key] = data[key].group(1)
        else:
            data[key] = ''
    return data

def create_excel_from_data(data_list, excel_path):
    df = pd.DataFrame(data_list)
    df.to_excel(excel_path, index=False)
